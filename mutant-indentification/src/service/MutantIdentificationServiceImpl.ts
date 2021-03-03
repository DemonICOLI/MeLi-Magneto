import { IMutantIdentificationService } from "./IMutantIdentificationService";
import { Genome } from "../model/mutant-gene/Genome";
import { MutantGeneFinder } from "../core/mutant-gene/finder/MutantGeneFinder";
import { Utils } from "../utils/Utils";
import { MutantIdentificationPresenter } from "../presenter/MutantIdentificationPresenter";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";
import { GenomeInformationRepository } from "../repository/GenomeInformationRepository";

@injectable()
export class MutantIdentificationServiceImpl implements IMutantIdentificationService {
	constructor(
		@inject(TYPES.MutantGeneHorizontalFinder) private horizontalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantGeneVerticalFinder) private verticalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantGeneLeftDiagonalFinder) private leftDiagonalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantGeneRightDiagonalFinder) private rightDiagonalGeneSequenceFinder: MutantGeneFinder,
		@inject(TYPES.MutantIdentificationPresenter) private presenter: MutantIdentificationPresenter,
		@inject(TYPES.GenomeInformationRepository) private repository: GenomeInformationRepository
	) {}

	async checkMutant(subjectGenome: Genome): Promise<any> {
		if (!Utils.isSquareGenome(subjectGenome)) {
			return this.presenter.generateInvalidInputResponse();
		}

		let numberOfMutantSequences: number[] = await Promise.all([
			this.horizontalGeneSequenceFinder.findNumberOfMutantSequence(subjectGenome),
			this.verticalGeneSequenceFinder.findNumberOfMutantSequence(subjectGenome),
			this.leftDiagonalGeneSequenceFinder.findNumberOfMutantSequence(subjectGenome),
			this.rightDiagonalGeneSequenceFinder.findNumberOfMutantSequence(subjectGenome),
		]);
		const totalNumberOfMutantSequences = numberOfMutantSequences.reduce(
			(detectedMutantSequences, numberOfMutantSequences) => {
				return detectedMutantSequences + numberOfMutantSequences;
			},
			0
		);
		try {
			await this.repository.saveGenomeResult(
				Utils.generateGenomeIdentifier(subjectGenome),
				totalNumberOfMutantSequences
			);
		} catch (error) {
			console.error("Ocurrio un Error: %o", error);
			return this.presenter.generateInternalServerErrorResponse();
		}
		if (totalNumberOfMutantSequences > 1) {
			return this.presenter.generateIsMutantResponse();
		}
		return this.presenter.generateIsNotMutantResponse();
	}
}
