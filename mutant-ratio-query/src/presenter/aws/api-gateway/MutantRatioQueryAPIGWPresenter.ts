import { injectable } from "inversify";
import "reflect-metadata";
import { MutantRatioQueryPresenter } from "../../MutantRatioQueryPresenter";
import { HTTP_CODES } from "../../../utils/Constants";
import { APIGatewayProxyResult } from "aws-lambda";

@injectable()
export class MutantRatioQueryAPIGWPresenter implements MutantRatioQueryPresenter {
	public generateOkResponse(mutantGenomes: number, humanGnomes: number, ratio: number): APIGatewayProxyResult {
		const body = JSON.stringify({
			count_mutant_dna: mutantGenomes,
			count_human_dna: humanGnomes,
			ratio: ratio,
		});
		return this.generateResponse(HTTP_CODES.OK, body);
	}

	private generateResponse(statusCode: number, body = ""): APIGatewayProxyResult {
		return {
			statusCode: statusCode,
			body: body,
		};
	}

	public generateInternalServerErrorResponse(): any {
		return this.generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR);
	}
}
