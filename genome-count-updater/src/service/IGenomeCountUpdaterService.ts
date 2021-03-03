export interface IGenomeCountUpdaterService {
	updateGenomeCount(genomeType: string): Promise<object>;
}
