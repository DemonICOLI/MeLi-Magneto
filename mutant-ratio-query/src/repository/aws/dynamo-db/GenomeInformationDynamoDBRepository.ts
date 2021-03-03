import { GenomeInformationRepository } from "../../GenomeInformationRepository";
import { DynamoDB } from "aws-sdk";
import { CONSTANTS } from "../../../utils/Constants";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class GenomeInformationDynamoDBRepository implements GenomeInformationRepository {
	private documentClient = new DynamoDB.DocumentClient();

	public async getHumanGenomeCount(): Promise<number> {
		return await this.getGenomeCount(CONSTANTS.GENOME_HUMAN_TYPE);
	}

	public async getMutantGenomeCount(): Promise<number> {
		return await this.getGenomeCount(CONSTANTS.GENOME_MUTANT_TYPE);
	}

	public async getGenomeCount(genomeType: string): Promise<number> {
		const params = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			KeyConditionExpression: "INFORMATION_TYPE = :informationType and IDENTIFIER = :genomeType",
			ExpressionAttributeValues: {
				":informationType": CONSTANTS.GENOME_COUNT_PARTITION_KEY,
				":genomeType": genomeType,
			},
			ProjectionExpression: "#c",
			ExpressionAttributeNames: {
				"#c": "COUNT",
			},
		};
		try {
			let { Items } = await this.documentClient.query(params).promise();
			return Promise.resolve(Items ? (Items[0] ? Items[0].COUNT : 0) : 0);
		} catch (error) {
			console.error("Error Consultando Dynamo para %s: %o", genomeType, error);
			throw new Error("Error Consultando Dynamo");
		}
	}
}
