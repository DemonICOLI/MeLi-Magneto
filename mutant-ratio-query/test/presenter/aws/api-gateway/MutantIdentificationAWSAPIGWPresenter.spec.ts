import { MutantRatioQueryAPIGWPresenter } from "../../../../src/presenter/aws/api-gateway/MutantRatioQueryAPIGWPresenter";

describe("MutantRatioQueryAPIGWPresenter test suite", () => {
	const presenter = new MutantRatioQueryAPIGWPresenter();
	describe("Success Cases", () => {
		it("generateOkResponse should return an object with status code 200", () => {
			const MUTANT_GNOMES = 1;
			const HUMAN_GNOMES = 2;
			const RATIO = 3;
			const okResponse = presenter.generateOkResponse(MUTANT_GNOMES, HUMAN_GNOMES, RATIO);
			expect(okResponse.statusCode).toBe(200);
		});
		it("generateOkResponse should return an object with a property named count_mutant_dna in stringified body", () => {
			const MUTANT_GNOMES = 1;
			const HUMAN_GNOMES = 2;
			const RATIO = 3;
			const okResponse = JSON.parse(presenter.generateOkResponse(MUTANT_GNOMES, HUMAN_GNOMES, RATIO).body);
			expect(okResponse).toEqual(jasmine.objectContaining({ count_mutant_dna: MUTANT_GNOMES }));
		});
		it("generateOkResponse should return an object with a property named count_human_dna in stringified body", () => {
			const MUTANT_GNOMES = 1;
			const HUMAN_GNOMES = 2;
			const RATIO = 3;
			const okResponse = JSON.parse(presenter.generateOkResponse(MUTANT_GNOMES, HUMAN_GNOMES, RATIO).body);
			expect(okResponse).toEqual(jasmine.objectContaining({ count_human_dna: HUMAN_GNOMES }));
		});
		it("generateOkResponse should return an object with a property named ratio in stringified body", () => {
			const MUTANT_GNOMES = 1;
			const HUMAN_GNOMES = 2;
			const RATIO = 3;
			const okResponse = JSON.parse(presenter.generateOkResponse(MUTANT_GNOMES, HUMAN_GNOMES, RATIO).body);
			expect(okResponse).toEqual(jasmine.objectContaining({ ratio: RATIO }));
		});
		it("generateInternalServerErrorResponse should return an object with status code 500", () => {
			const invalidInputResponse = presenter.generateInternalServerErrorResponse();
			expect(invalidInputResponse.statusCode).toBe(500);
		});
	});
});
