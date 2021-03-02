import { MutantIdentificationPresenter } from "../presenter/MutantIdentificationPresenter";
import { MutantIdentificationController } from "../controller/MutantIdentificationController";

export const CONSTANTS = {
	NUMBER_OF_CONSECUTIVE_GENES_TO_BE_MUTANT: 4,
	GENES: "ACGT",
};

export const HTTP_CODES = {
	OK: 200,
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	INTERNAL_SERVER_ERROR: 500,
};

export const TYPES = {
	MutantGeneHorizontalFinder: Symbol.for("MutantGeneHorizontalFinder"),
	MutantGeneVerticalFinder: Symbol.for("MutantGeneVerticalFinder"),
	MutantGeneLeftDiagonalFinder: Symbol.for("MutantGeneLeftDiagonalFinder"),
	MutantGeneRightDiagonalFinder: Symbol.for("MutantGeneRightDiagonalFinder"),
	MutantIdentificationPresenter: Symbol.for("MutantIdentificationPresenter"),
	MutantIdentificationController: Symbol.for("MutantIdentificationController"),
	MutantIdentificationService: Symbol.for("MutantIdentificationService"),
};
