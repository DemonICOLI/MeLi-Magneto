export interface GenomeInformationRepository {
	saveGenomeResult(genomeIdentifier: string, numberOfMutantSequences: number): Promise<void>;
}
