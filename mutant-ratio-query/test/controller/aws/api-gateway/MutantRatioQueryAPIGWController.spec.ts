import { Mock } from "ts-mocks";
import { APIGatewayProxyEvent } from "aws-lambda";
import { IMutantRatioService } from "../../../../src/service/IMutantRatioService";
import { MutantRatioQueryAPIGWController } from "../../../../src/controller/aws/api-gateway/MutantRatioQueryAPIGWController";

describe("MutantIdentificationAWSAPIGWController Test Suite", () => {
	describe("Success Test Cases", () => {
		it("handleEvent should call getMutantCountAndRatio in the service", async () => {
			const serviceMock = {
				getMutantCountAndRatio: async () => {
					return {};
				},
			};
			spyOn(serviceMock, "getMutantCountAndRatio");
			let service = new Mock<IMutantRatioService>(serviceMock).Object,
				controller = new MutantRatioQueryAPIGWController(service),
				mockEvent: APIGatewayProxyEvent = {
					multiValueQueryStringParameters: {},
					requestContext: {
						accountId: "",
						apiId: "",
						authorizer: {},
						protocol: "",
						httpMethod: "",
						identity: {
							accessKey: "",
							accountId: "",
							apiKey: "",
							apiKeyId: "",
							caller: "",
							cognitoAuthenticationProvider: "",
							cognitoAuthenticationType: "",
							cognitoIdentityId: "",
							cognitoIdentityPoolId: "",
							principalOrgId: "",
							sourceIp: "",
							user: "",
							userAgent: "",
							userArn: "",
						},
						path: "",
						stage: "",
						requestId: "",
						requestTime: "",
						requestTimeEpoch: 0,
						resourceId: "",
						resourcePath: "",
					},
					resource: "",
					stageVariables: {},
					body: '{"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}',
					headers: {},
					httpMethod: "",
					isBase64Encoded: false,
					path: "",
					pathParameters: {},
					multiValueHeaders: {},
					queryStringParameters: {},
				};
			await controller.handleEvent(mockEvent);
			expect(serviceMock.getMutantCountAndRatio).toHaveBeenCalled();
		});
	});
});
