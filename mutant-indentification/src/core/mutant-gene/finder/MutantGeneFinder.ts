import { Utils } from "../../../utils/Utils";
import { Genome } from "../../../model/mutant-gene/Genome";
import { GeneSequence } from "../../../model/mutant-gene/GeneSequence";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export abstract class MutantGeneFinder {
	public async findNumberOfMutantSequence(subjectGenome: Genome): Promise<number> {
		const geneSequences = this.extractGeneSequences(subjectGenome),
			sequencesValidationResult: number[] = await Promise.all(
				geneSequences.map((geneSequence) => {
					return new Promise<number>((resolve) => {
						Utils.isMutantMarkerPresent(geneSequence) ? resolve(1) : resolve(0);
					});
				})
			);
		const numberOfMutantSequences = sequencesValidationResult.reduce(
			(detectedMutantSequences, isSequenceMutant) => {
				return detectedMutantSequences + isSequenceMutant;
			},
			0
		);
		return numberOfMutantSequences;
	}

	abstract extractGeneSequences(genome: Genome): GeneSequence[];
}
