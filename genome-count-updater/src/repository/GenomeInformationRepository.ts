export interface GenomeInformationRepository {
	incrementMutantGenomeCount(): Promise<void>;
	incrementHumanGenomeCount(): Promise<void>;
}
