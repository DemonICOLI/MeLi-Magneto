import { IMutantRatioService } from "./IMutantRatioService";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../utils/Constants";
import { GenomeInformationRepository } from "../repository/GenomeInformationRepository";
import { MutantRatioQueryPresenter } from "../presenter/MutantRatioQueryPresenter";

@injectable()
export class MutantRatioServiceImpl implements IMutantRatioService {
	constructor(
		@inject(TYPES.GenomeInformationRepository) private repository: GenomeInformationRepository,
		@inject(TYPES.MutantRatioQueryPresenter) private presenter: MutantRatioQueryPresenter
	) {}

	async getMutantCountAndRatio(): Promise<object> {
		try {
			const [humansCount, mutantsCount] = await Promise.all([
				this.repository.getHumanGenomeCount(),
				this.repository.getMutantGenomeCount(),
			]);
			const ratio = mutantsCount / humansCount;
			return this.presenter.generateOkResponse(mutantsCount, humansCount, ratio);
		} catch (error) {
			console.log("Ocurrio un Error: %o", error);
			return this.presenter.generateInternalServerErrorResponse();
		}
	}
}
