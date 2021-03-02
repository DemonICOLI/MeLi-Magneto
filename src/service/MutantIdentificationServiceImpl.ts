import { IMutantIdentificationService } from "./IMutantIdentificationService";
import { Genome } from "../model/mutant-gene/Genome";
import { MutantGeneFinder } from "../core/mutant-gene/finder/MutantGeneFinder";
import { Utils } from "../utils/Utils";
import { MutantIdentificationPresenter } from "../presenter/MutantIdentificationPresenter";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";

@injectable()
export class MutantIdentificationServiceImpl implements IMutantIdentificationService {
	constructor(
		@inject(TYPES.MutantGeneHorizontalFinder) private horizontalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantGeneVerticalFinder) private verticalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantGeneLeftDiagonalFinder) private leftDiagonalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantGeneRightDiagonalFinder) private rightDiagonalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantIdentificationPresenter) private presenter: MutantIdentificationPresenter
	) {}

	async checkMutant(subjectGenome: Genome): Promise<any> {
		if (!Utils.isSquareGenome(subjectGenome)) {
			return this.presenter.generateInvalidInputResponse();
		}
		try {
			await Promise.any([
				this.horizontalGeneSequenceFinder.containsMutantSequence(subjectGenome),
				this.verticalGeneSequenceFinder.containsMutantSequence(subjectGenome),
				this.leftDiagonalGeneSequenceFinder.containsMutantSequence(subjectGenome),
				this.rightDiagonalGeneSequenceFinder.containsMutantSequence(subjectGenome),
			]);
			return this.presenter.generateIsMutantResponse();
		} catch (error) {
			return this.presenter.generateIsNotMutantResponse();
		}
	}
}
