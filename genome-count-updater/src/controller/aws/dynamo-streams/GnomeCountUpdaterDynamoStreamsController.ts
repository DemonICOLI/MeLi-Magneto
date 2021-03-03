import { GnomeCountUpdaterController } from "../../GnomeCountUpdaterController";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IGenomeCountUpdaterService } from "../../../service/IGenomeCountUpdaterService";
import { CONSTANTS, TYPES } from "../../../utils/Constants";
import { DynamoDBStreamEvent } from "aws-lambda";

@injectable()
export class GnomeCountUpdaterDynamoStreamsController implements GnomeCountUpdaterController {
	constructor(@inject(TYPES.GenomeCountUpdaterService) private service: IGenomeCountUpdaterService) {}

	async handleEvent(event: DynamoDBStreamEvent): Promise<void> {
		let records = event.Records;

		let genomeInsertRecords = records
			.filter(({ dynamodb, eventName }) => {
				return (
					eventName === "INSERT" &&
					// @ts-ignore
					dynamodb.Keys.INFORMATION_TYPE.S === CONSTANTS.GENOME_INFORMATION_PARTITION_KEY
				);
			})
			.map((record) => {
				return new Promise(async (resolve) => {
					// @ts-ignore
					resolve(await this.service.updateGenomeCount(record.dynamodb.Keys.INFORMATION_TYPE.S));
				});
			})
			.map((promise) => promise.catch((e) => console.error(e)));
		console.log(genomeInsertRecords);
		await Promise.all(genomeInsertRecords);
	}
}
