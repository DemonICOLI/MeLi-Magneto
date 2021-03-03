import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { GenomeInformationDynamoDBRepository } from "../../../../src/repository/aws/dynamo-db/GenomeInformationDynamoDBRepository";

describe("GenomeInformationRepositoryDynamoDBRepository Test Suite", () => {
	describe("Success Cases", () => {
		it("An Error saving the info should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "put", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new GenomeInformationDynamoDBRepository();
			const result = repository.saveGenomeResult("A", 1);
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});
