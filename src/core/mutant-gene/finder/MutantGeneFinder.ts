import { Utils } from "../../../utils/Utils";
import { Genome } from "../../../model/mutant-gene/Genome";
import { GeneSequence } from "../../../model/mutant-gene/GeneSequence";

export abstract class MutantGeneFinder {
	public async containsMutantSequence(subjectGenome: Genome): Promise<boolean> {
		const geneSequences = this.extractGeneSequences(subjectGenome);
		let sequencesValidationResult: boolean;
		try {
			sequencesValidationResult = await Promise.any(
				geneSequences.map((geneSequence) => {
					return new Promise<boolean>((resolve, reject) => {
						Utils.isMutantMarkerPresent(geneSequence) ? resolve(true) : reject(false);
					});
				})
			);
		} catch (error) {
			sequencesValidationResult = false;
		}
		return sequencesValidationResult;
	}

	abstract extractGeneSequences(genome: Genome): GeneSequence[];
}
