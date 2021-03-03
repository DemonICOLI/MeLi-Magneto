import { MutantIdentificationAWSAPIGWPresenter } from "../../../../src/presenter/aws/api-gateway/MutantIdentificationAWSAPIGWPresenter";

describe("MutantIdentificationAWSAPIGWPresenter test suite", () => {
	const presenter = new MutantIdentificationAWSAPIGWPresenter();
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
		it("generateInternalServerErrorResponse should return an object with status code 500", () => {
			const invalidInputResponse = presenter.generateInternalServerErrorResponse();
			expect(invalidInputResponse.statusCode).toBe(500);
		});
	});
});
