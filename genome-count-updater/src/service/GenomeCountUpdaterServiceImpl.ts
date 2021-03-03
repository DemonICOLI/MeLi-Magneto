import { IGenomeCountUpdaterService } from "./IGenomeCountUpdaterService";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { CONSTANTS, TYPES } from "../utils/Constants";
import { GenomeInformationRepository } from "../repository/GenomeInformationRepository";
import { GenomeCountUpdaterPresenter } from "../presenter/GenomeCountUpdaterPresenter";

@injectable()
export class GenomeCountUpdaterServiceImpl implements IGenomeCountUpdaterService{

	constructor(
		@inject(TYPES.GenomeInformationRepository) private repository: GenomeInformationRepository,
		@inject(TYPES.GenomeCountUpdaterPresenter) private presenter: GenomeCountUpdaterPresenter
	) {}

	async updateGenomeCount(genomeType: number): Promise<object> {
		if(genomeType < 0 ){
			throw new Error("Tipo Desconocido");
		} else if (genomeType >= 0 && genomeType < CONSTANTS.MINIMUM_SEQUENCES_TO_BE_MUTANT) {
			await this.repository.incrementHumanGenomeCount();
		} else {
			await this.repository.incrementMutantGenomeCount();
		}
		return this.presenter.generateOkResponse();
	}
}
