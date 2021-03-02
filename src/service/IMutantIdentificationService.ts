import { Genome } from "../model/mutant-gene/Genome";

export interface IMutantIdentificationService {
	checkMutant(subjectGenome: Genome): Promise<any>;
}
