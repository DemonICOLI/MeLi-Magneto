import {Utils} from "../../../utils/Utils";
import {Genome} from "../../../model/mutant-gene/Genome";
import {GeneSequence} from "../../../model/mutant-gene/GeneSequence";

export abstract class MutantGeneFinder {
    public async containsMutantSequence(subjectGenome: Genome): Promise<boolean> {
        const geneSequences = this.extractGeneSequences(subjectGenome),
            sequencesValidationResult: boolean[] = await Promise.all(geneSequences.map((geneSequence) => {
                return new Promise<boolean>(resolve => resolve(Utils.isMutantMarkerPresent(geneSequence)))
            }));
        const containsMutantSequence = sequencesValidationResult.reduce((hasMutantSequenceBeenDetected, isSequenceMutant) => {
            return hasMutantSequenceBeenDetected || isSequenceMutant;
        }, false);
        return containsMutantSequence;
    }

    abstract extractGeneSequences(genome: Genome): GeneSequence[];
}
