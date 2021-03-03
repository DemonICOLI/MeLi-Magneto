import { Mock } from "ts-mocks";
import { IGenomeCountUpdaterService } from "../../../../src/service/IGenomeCountUpdaterService";
import { GnomeCountUpdaterDynamoStreamsController } from "../../../../src/controller/aws/dynamo-streams/GnomeCountUpdaterDynamoStreamsController";
import { DynamoDBStreamEvent } from "aws-lambda";
import { CONSTANTS } from "../../../../src/utils/Constants";

describe("GnomeCountUpdaterDynamoStreamsController Test Suite", () => {
	describe("Success Test Cases", () => {
		it("handleEvent should call updateGenomeCount in the service", async () => {
			const serviceMock = {
				updateGenomeCount: async () => {
					return {};
				},
			};
			spyOn(serviceMock, "updateGenomeCount");
			let service = new Mock<IGenomeCountUpdaterService>(serviceMock).Object,
				controller = new GnomeCountUpdaterDynamoStreamsController(service),
				mockEvent: DynamoDBStreamEvent = {
					Records: [
						{
							eventName: "INSERT",
							dynamodb: { Keys: { INFORMATION_TYPE: { S: CONSTANTS.GENOME_INFORMATION_PARTITION_KEY } } },
						},
						{
							eventName: "MODIFY",
							dynamodb: { Keys: { INFORMATION_TYPE: { S: CONSTANTS.GENOME_INFORMATION_PARTITION_KEY } } },
						},
						{
							eventName: "INSERT",
							dynamodb: { Keys: { INFORMATION_TYPE: { S: CONSTANTS.GENOME_COUNT_PARTITION_KEY } } },
						},
						{
							eventName: "INSERT",
							dynamodb: { Keys: { INFORMATION_TYPE: { S: CONSTANTS.GENOME_INFORMATION_PARTITION_KEY } } },
						},
					],
				};
			await controller.handleEvent(mockEvent);
			expect(serviceMock.updateGenomeCount).toHaveBeenCalledTimes(2);
		});

		it("handleEvent should resolve even if an error happens in the service", async () => {
			const serviceMock = {
				updateGenomeCount: async () => {
					throw new Error("Mock ERROR");
				},
			};
			spyOn(serviceMock, "updateGenomeCount");
			let service = new Mock<IGenomeCountUpdaterService>(serviceMock).Object,
				controller = new GnomeCountUpdaterDynamoStreamsController(service),
				mockEvent: DynamoDBStreamEvent = {
					Records: [
						{
							eventName: "INSERT",
							dynamodb: { Keys: { INFORMATION_TYPE: { S: CONSTANTS.GENOME_INFORMATION_PARTITION_KEY } } },
						},
					],
				};

			await expectAsync(controller.handleEvent(mockEvent)).toBeResolved();
		});
	});
});
