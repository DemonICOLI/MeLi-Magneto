import {IMutantIdentificationService} from "./IMutantIdentificationService";
import {Genome} from "../model/mutant-gene/Genome";
import {MutantGeneFinder} from "../core/mutant-gene/finder/MutantGeneFinder";
import {Utils} from "../utils/Utils";
import {MutantIdentificationPresenter} from "../presenter/MutantIdentificationPresenter";

export class MutantIdentificationServiceImpl implements IMutantIdentificationService {

    constructor(
        private horizontalGeneSequenceFinder: MutantGeneFinder,
        private verticalGeneSequenceFinder: MutantGeneFinder,
        private leftDiagonalGeneSequenceFinder: MutantGeneFinder,
        private rightDiagonalGeneSequenceFinder: MutantGeneFinder,
        private presenter: MutantIdentificationPresenter
    ) {
    }

    async checkMutant(subjectGenome: Genome): Promise<any> {
        if(!Utils.isSquareGenome(subjectGenome)){
           return this.presenter.generateInvalidInputResponse();
        }
        const genomeValidationResult: boolean[] = await Promise.all([
            this.horizontalGeneSequenceFinder.containsMutantSequence(subjectGenome),
            this.verticalGeneSequenceFinder.containsMutantSequence(subjectGenome),
            this.leftDiagonalGeneSequenceFinder.containsMutantSequence(subjectGenome),
            this.rightDiagonalGeneSequenceFinder.containsMutantSequence(subjectGenome),
        ]);
        const isMutant = genomeValidationResult.reduce((hasMutantSequenceBeenDetected, isMutantSequencePresent) => {
            return hasMutantSequenceBeenDetected || isMutantSequencePresent;
        }, false);
        if(!isMutant) {
            return this.presenter.generateIsNotMutantResponse();
        }
        return this.presenter.generateIsMutantResponse();
    }

}