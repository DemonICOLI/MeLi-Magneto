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
		@inject(TYPES.GenomeInformationRepository) private presenter: GenomeCountUpdaterPresenter
	) {}

	async updateGenomeCount(genomeType: string): Promise<object> {
		switch (genomeType) {
			case CONSTANTS.GENOME_HUMAN_TYPE:
				await this.repository.incrementHumanGenomeCount();
				break;
			case CONSTANTS.GENOME_MUTANT_TYPE:
				await this.repository.incrementMutantGenomeCount();
				break;
			default:
				throw new Error("Tipo Desconocido");
		}
		return this.presenter.generateOkResponse();
	}
}
