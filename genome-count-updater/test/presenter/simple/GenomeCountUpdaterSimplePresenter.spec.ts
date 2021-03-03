import { GenomeCountUpdaterSimplePresenter } from "../../../src/presenter/simple/GenomeCountUpdaterSimplePresenter";

describe("GenomeCountUpdaterSimplePresenter test suite", () => {
	const presenter = new GenomeCountUpdaterSimplePresenter();
	describe("Success Cases", () => {
		it("generateOkResponse should return an object with status code 200", () => {
			const MUTANT_GNOMES = 1;
			const HUMAN_GNOMES = 2;
			const RATIO = 3;
			// @ts-ignore
			const { statusCode } = presenter.generateOkResponse();
			expect(statusCode).toBe(200);
		});
	});
});
