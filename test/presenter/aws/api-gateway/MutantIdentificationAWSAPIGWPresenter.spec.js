"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MutantIdentificationAWSAPIGWPresenter_1 = require("../../../../src/presenter/aws/api-gateway/MutantIdentificationAWSAPIGWPresenter");
describe("MutantIdentificationAWSAPIGWPresenter test suite", () => {
    const presenter = new MutantIdentificationAWSAPIGWPresenter_1.MutantIdentificationAWSAPIGWPresenter();
    describe("Success Cases", () => {
        it("generateInvalidInputResponse should return an object with status code 400", () => {
            const invalidInputResponse = presenter.generateInvalidInputResponse();
            expect(invalidInputResponse.statusCode).toBe(400);
        });
        it("generateIsMutantResponse should return an object with status code 200", () => {
            const invalidInputResponse = presenter.generateIsMutantResponse();
            expect(invalidInputResponse.statusCode).toBe(200);
        });
        it("generateIsNotMutantResponse should return an object with status code 403", () => {
            const invalidInputResponse = presenter.generateIsNotMutantResponse();
            expect(invalidInputResponse.statusCode).toBe(403);
        });
    });
});
