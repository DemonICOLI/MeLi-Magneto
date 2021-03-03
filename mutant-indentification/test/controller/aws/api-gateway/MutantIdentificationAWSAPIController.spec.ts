import {Mock} from "ts-mocks";
import {IMutantIdentificationService} from "../../../../src/service/IMutantIdentificationService";
import {MutantIdentificationAWSAPIGWController} from "../../../../src/controller/aws/api-gateway/MutantIdentificationAWSAPIGWController";
import {APIGatewayEventIdentity, APIGatewayProxyEvent} from "aws-lambda";
import {Genome} from "../../../../src/model/mutant-gene/Genome";

describe("MutantIdentificationAWSAPIGWController Test Suite", () => {

    describe("Success Test Cases", () => {

        it("handleEvent should call checkMutant in the service", async () => {
            const serviceMock = {
                checkMutant: async () => undefined
            }
            spyOn(serviceMock, "checkMutant");
            let service = new Mock<IMutantIdentificationService>(serviceMock).Object,
                controller = new MutantIdentificationAWSAPIGWController(service),
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
                            userArn: ""
                        },
                        path: "",
                        stage: "",
                        requestId: "",
                        requestTime: "",
                        requestTimeEpoch: 0,
                        resourceId: "",
                        resourcePath: ""
                    },
                    resource: "",
                    stageVariables: {},
                    body: "{\"dna\":[\"ATGCGA\",\"CAGTGC\",\"TTATGT\",\"AGAAGG\",\"CCCCTA\",\"TCACTG\"]}",
                    headers: {},
                    httpMethod: "",
                    isBase64Encoded: false,
                    path: "",
                    pathParameters: {},
                    multiValueHeaders: {},
                    queryStringParameters: {}

                };
            await controller.handleEvent(mockEvent)
            expect(serviceMock.checkMutant).toHaveBeenCalled();
        });

        it("handleEvent should parse dna int gnome", async () => {
            const serviceMock = {
                checkMutant: async (gnome: Genome) => undefined
            }
            spyOn(serviceMock, "checkMutant");
            let service = new Mock<IMutantIdentificationService>(serviceMock).Object,
                controller = new MutantIdentificationAWSAPIGWController(service),
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
                            userArn: ""
                        },
                        path: "",
                        stage: "",
                        requestId: "",
                        requestTime: "",
                        requestTimeEpoch: 0,
                        resourceId: "",
                        resourcePath: ""
                    },
                    resource: "",
                    stageVariables: {},
                    body: "{\"dna\":[\"ATGCGA\",\"CAGTGC\",\"TTATGT\",\"AGAAGG\",\"CCCCTA\",\"TCACTG\"]}",
                    headers: {},
                    httpMethod: "",
                    isBase64Encoded: false,
                    path: "",
                    pathParameters: {},
                    multiValueHeaders: {},
                    queryStringParameters: {}

                };
            await controller.handleEvent(mockEvent)
            let parsedDNA = [
                ["A","T","G","C","G","A"],
                ["C","A","G","T","G","C"],
                ["T","T","A","T","G","T"],
                ["A","G","A","A","G","G"],
                ["C","C","C","C","T","A"],
                ["T","C","A","C","T","G"]
            ];
            expect(serviceMock.checkMutant).toHaveBeenCalledWith(parsedDNA);
        });

    });
});
