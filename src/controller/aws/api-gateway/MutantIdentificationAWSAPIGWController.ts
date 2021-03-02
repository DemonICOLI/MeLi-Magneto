import { MutantIdentificationController } from "../../MutantIdentificationController";
import { APIGatewayProxyEvent } from "aws-lambda";
import { IMutantIdentificationService } from "../../../service/IMutantIdentificationService";
import { Genome } from "../../../model/mutant-gene/Genome";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../utils/Constants";

@injectable()
export class MutantIdentificationAWSAPIGWController implements MutantIdentificationController {
	constructor(@inject(TYPES.MutantIdentificationService) private service: IMutantIdentificationService) {}

	async handleEvent(event: APIGatewayProxyEvent): Promise<any> {
		const genome: Genome = [],
			dna = JSON.parse(<string>event.body).dna;
		for (const dnaSequence of dna) {
			genome.push(Array.from(dnaSequence));
		}
		return this.service.checkMutant(genome);
	}
}
