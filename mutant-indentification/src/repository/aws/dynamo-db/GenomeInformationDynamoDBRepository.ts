import { GenomeInformationRepository } from "../../GenomeInformationRepository";
import { DynamoDB } from "aws-sdk";
import { CONSTANTS } from "../../../utils/Constants";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import PutItemInput = DocumentClient.PutItemInput;
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class GenomeInformationDynamoDBRepository implements GenomeInformationRepository {
	private documentClient = new DynamoDB.DocumentClient();
	async saveGenomeResult(genomeIdentifier: string, numberOfMutantSequences: number): Promise<void> {
		const parameters: PutItemInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			Item: {
				INFORMATION_TYPE: CONSTANTS.GENOME_INFORMATION_PARTITION_KEY,
				GENOME_IDENTIFIER: genomeIdentifier,
				NUMBER_OF_MUTANT_SEQUENCES: numberOfMutantSequences,
			},
		};
		try {
			await this.documentClient.put(parameters).promise();
		} catch (error) {
			console.log("Error Guardando en DynamoDB: %o", error);
			throw new Error("Error Guardando en DynamoDB");
		}
	}
}
