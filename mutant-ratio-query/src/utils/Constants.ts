export const HTTP_CODES = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
};

export const TYPES = {
	MutantRatioQueryPresenter: Symbol.for("MutantRatioQueryPresenter"),
	GenomeInformationRepository: Symbol.for("GenomeInformationRepository"),
	MutantRatioService: Symbol.for("MutantRatioService"),
	MutantRatioQueryController: Symbol.for("MutantRatioQueryController"),
};

export const CONSTANTS = {
	REPOSITORY_TABLE_NAME: "meli-mutant-information",
	GENOME_COUNT_PARTITION_KEY: "GENOME_COUNT",
	GENOME_HUMAN_TYPE: "HUMAN_GENOME",
	GENOME_MUTANT_TYPE: "MUTANT_GENOME",
};
