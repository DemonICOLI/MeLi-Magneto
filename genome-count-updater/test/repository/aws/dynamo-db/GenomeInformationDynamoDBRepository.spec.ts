import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { GenomeInformationDynamoDBRepository } from "../../../../src/repository/aws/dynamo-db/GenomeInformationDynamoDBRepository";
import { CONSTANTS } from "../../../../src/utils/Constants";

describe("GenomeInformationDynamoDBRepository Test Suite", () => {
	describe("Success Cases", () => {
		it("An Error updating the info should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "update", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new GenomeInformationDynamoDBRepository();
			const result = repository.incrementGenomeCount("A");
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("A success get should resolve", async () => {
			AWSMock.setSDKInstance(AWS);
			let genomeCount = 1;
			AWSMock.mock("DynamoDB.DocumentClient", "update", (parameters: object, callback: Function) => {
				callback(null);
			});
			const repository = new GenomeInformationDynamoDBRepository();
			const result = repository.incrementGenomeCount("A");
			await expectAsync(result).toBeResolved();
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("incrementHumanGenomeCount should call incrementGenomeCount", async () => {
			const repository = new GenomeInformationDynamoDBRepository();
			spyOn(repository, "incrementGenomeCount").and.returnValue(
				new Promise<void>((resolve) => resolve(undefined))
			);
			const result = await repository.incrementHumanGenomeCount();
			expect(repository.incrementGenomeCount).toHaveBeenCalledWith(CONSTANTS.GENOME_HUMAN_TYPE);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("incrementMutantGenomeCount should call incrementGenomeCount", async () => {
			const repository = new GenomeInformationDynamoDBRepository();
			spyOn(repository, "incrementGenomeCount").and.returnValue(
				new Promise<void>((resolve) => resolve(undefined))
			);
			const result = await repository.incrementMutantGenomeCount();
			expect(repository.incrementGenomeCount).toHaveBeenCalledWith(CONSTANTS.GENOME_MUTANT_TYPE);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});
