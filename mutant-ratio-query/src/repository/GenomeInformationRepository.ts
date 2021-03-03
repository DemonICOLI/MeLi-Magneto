export interface GenomeInformationRepository {
	getMutantGenomeCount(): Promise<number>;
	getHumanGenomeCount(): Promise<number>;
}
