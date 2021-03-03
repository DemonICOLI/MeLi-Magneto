import { GenomeInformationRepository } from "../../GenomeInformationRepository";
import { DynamoDB } from "aws-sdk";
import { CONSTANTS } from "../../../utils/Constants";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class GenomeInformationDynamoDBRepository implements GenomeInformationRepository {
	private documentClient = new DynamoDB.DocumentClient();

	async incrementMutantGenomeCount(): Promise<void> {
		return await this.incrementGenomeCount(CONSTANTS.GENOME_MUTANT_TYPE);
	}
	async incrementHumanGenomeCount(): Promise<void> {
		return await this.incrementGenomeCount(CONSTANTS.GENOME_HUMAN_TYPE);
	}

	public async incrementGenomeCount(genomeType: string): Promise<void> {
		const params = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			Key: {
				INFORMATION_TYPE: CONSTANTS.GENOME_COUNT_PARTITION_KEY,
				IDENTIFIER: genomeType,
			},
			UpdateExpression: "ADD #C :increment",
			ExpressionAttributeNames: {
				"#C": "COUNT",
			},
			ExpressionAttributeValues: {
				":increment": 1,
			},
		};
		try {
			await this.documentClient.update(params).promise();
		} catch (error) {
			console.error("Error Consultando Dynamo para %s: %o", genomeType, error);
			throw new Error("Error Consultando Dynamo");
		}
	}
}
