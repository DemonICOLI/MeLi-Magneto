export interface IGenomeCountUpdaterService {
	updateGenomeCount(genomeType: number): Promise<object>;
}
