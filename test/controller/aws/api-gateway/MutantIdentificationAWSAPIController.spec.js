"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mocks_1 = require("ts-mocks");
const MutantIdentificationAWSAPIGWController_1 = require("../../../../src/controller/aws/api-gateway/MutantIdentificationAWSAPIGWController");
describe("MutantIdentificationAWSAPIGWController Test Suite", () => {
    describe("Success Test Cases", () => {
        it("handleEvent should call checkMutant in the service", () => __awaiter(void 0, void 0, void 0, function* () {
            const serviceMock = {
                checkMutant: () => __awaiter(void 0, void 0, void 0, function* () { return undefined; })
            };
            spyOn(serviceMock, "checkMutant");
            let service = new ts_mocks_1.Mock(serviceMock).Object, controller = new MutantIdentificationAWSAPIGWController_1.MutantIdentificationAWSAPIGWController(service), mockEvent = {
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
            yield controller.handleEvent(mockEvent);
            expect(serviceMock.checkMutant).toHaveBeenCalled();
        }));
        it("handleEvent should parse dna int gnome", () => __awaiter(void 0, void 0, void 0, function* () {
            const serviceMock = {
                checkMutant: (gnome) => __awaiter(void 0, void 0, void 0, function* () { return undefined; })
            };
            spyOn(serviceMock, "checkMutant");
            let service = new ts_mocks_1.Mock(serviceMock).Object, controller = new MutantIdentificationAWSAPIGWController_1.MutantIdentificationAWSAPIGWController(service), mockEvent = {
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
            yield controller.handleEvent(mockEvent);
            let parsedDNA = [
                ["A", "T", "G", "C", "G", "A"],
                ["C", "A", "G", "T", "G", "C"],
                ["T", "T", "A", "T", "G", "T"],
                ["A", "G", "A", "A", "G", "G"],
                ["C", "C", "C", "C", "T", "A"],
                ["T", "C", "A", "C", "T", "G"]
            ];
            expect(serviceMock.checkMutant).toHaveBeenCalledWith(parsedDNA);
        }));
    });
});
