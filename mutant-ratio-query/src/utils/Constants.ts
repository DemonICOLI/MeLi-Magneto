export const HTTP_CODES = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
};

export const TYPES = {
	MutantRatioQueryPresenter: Symbol.for("MutantRatioQueryPresenter"),
};

export const CONSTANTS = {
	REPOSITORY_TABLE_NAME: "meli-mutant-information",
	GENOME_COUNT_PARTITION_KEY: "GENOME_COUNT",
	GENOME_HUMAN_TYPE: "HUMAN_GENOME",
	GEMONE_MUTANT_TYPE: "MUTANT_GENOME",
	REPOSITORY_GENOME_COUNT_INDEX: "INFORMATION_TYPE-GENOME_TYPE-index",
};
