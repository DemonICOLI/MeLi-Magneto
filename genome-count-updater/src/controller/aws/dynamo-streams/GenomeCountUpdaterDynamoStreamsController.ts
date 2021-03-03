import { GenomeCountUpdaterController } from "../../GenomeCountUpdaterController";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IGenomeCountUpdaterService } from "../../../service/IGenomeCountUpdaterService";
import { CONSTANTS, TYPES } from "../../../utils/Constants";
import { DynamoDBStreamEvent } from "aws-lambda";

@injectable()
export class GenomeCountUpdaterDynamoStreamsController implements GenomeCountUpdaterController {
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
					resolve(
						await this.service.updateGenomeCount(
							// @ts-ignore
							parseInt(record.dynamodb.NewImage.NUMBER_OF_MUTANT_SEQUENCES.N)
						)
					);
				});
			})
			.map((promise) => promise.catch((e) => console.error(e)));
		console.log(genomeInsertRecords);
		await Promise.all(genomeInsertRecords);
	}
}
