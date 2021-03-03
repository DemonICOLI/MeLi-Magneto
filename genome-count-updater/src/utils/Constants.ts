export const HTTP_CODES = {
	OK: 200,
};

export const CONSTANTS = {
	REPOSITORY_TABLE_NAME: "meli-mutant-information",
	GENOME_COUNT_PARTITION_KEY: "GENOME_COUNT",
	GENOME_HUMAN_TYPE: "HUMAN_GENOME",
	GENOME_MUTANT_TYPE: "MUTANT_GENOME",
	GENOME_INFORMATION_PARTITION_KEY: "GENOME_INFORMATION",
};

export const TYPES = {
	GenomeCountUpdaterPresenter: Symbol.for("GenomeCountUpdaterPresenter"),
	GenomeInformationRepository: Symbol.for("GenomeInformationRepository"),
	GenomeCountUpdaterService: Symbol.for("GenomeCountUpdaterService"),
	GenomeCountUpdaterController: Symbol.for("GenomeCountUpdaterController"),
};
