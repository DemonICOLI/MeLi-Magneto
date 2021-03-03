import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { GenomeInformationDynamoDBRepository } from "../../../../src/repository/aws/dynamo-db/GenomeInformationDynamoDBRepository";
import { CONSTANTS } from "../../../../src/utils/Constants";

describe("GenomeInformationDynamoDBRepository Test Suite", () => {
	describe("Success Cases", () => {
		it("An Error getting the info should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new GenomeInformationDynamoDBRepository();
			const result = repository.getGenomeCount("A");
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("A success get should resolve", async () => {
			AWSMock.setSDKInstance(AWS);
			let genomeCount = 1;
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, { Items: [{ COUNT: genomeCount }] });
			});
			const repository = new GenomeInformationDynamoDBRepository();
			const result = repository.getGenomeCount("A");
			await expectAsync(result).toBeResolvedTo(1);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("A success get should resolve if no items", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, {});
			});
			const repository = new GenomeInformationDynamoDBRepository();
			const result = repository.getGenomeCount("A");
			await expectAsync(result).toBeResolvedTo(0);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("getHumanGenomeCount should call getGenomeCount", async () => {
			const repository = new GenomeInformationDynamoDBRepository();
			spyOn(repository, "getGenomeCount").and.returnValue(
				new Promise<number>((resolve) => resolve(0))
			);
			const result = await repository.getHumanGenomeCount();
			expect(repository.getGenomeCount).toHaveBeenCalledWith(CONSTANTS.GENOME_HUMAN_TYPE);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("getMutantGenomeCount should call getGenomeCount", async () => {
			const repository = new GenomeInformationDynamoDBRepository();
			spyOn(repository, "getGenomeCount").and.returnValue(
				new Promise<number>((resolve) => resolve(0))
			);
			const result = await repository.getMutantGenomeCount();
			expect(repository.getGenomeCount).toHaveBeenCalledWith(CONSTANTS.GENOME_MUTANT_TYPE);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});
