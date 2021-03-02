import { MutantIdentificationPresenter } from "../../MutantIdentificationPresenter";
import { APIGatewayProxyResult } from "aws-lambda";
import { HTTP_CODES } from "../../../utils/Constants";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MutantIdentificationAWSAPIGWPresenter implements MutantIdentificationPresenter {
	public generateInvalidInputResponse(): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.BAD_REQUEST);
	}

	public generateIsMutantResponse(): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.OK);
	}

	public generateIsNotMutantResponse(): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.FORBIDDEN);
	}

	private generateResponse(statusCode: number): APIGatewayProxyResult {
		return {
			statusCode: statusCode,
			body: "",
		};
	}
}
