import { APIGatewayProxyEvent } from "aws-lambda";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../utils/Constants";
import "reflect-metadata";
import { MutantRatioQueryController } from "../../MutantRatioQueryController";
import { IMutantRatioService } from "../../../service/IMutantRatioService";

@injectable()
export class MutantRatioQueryAPIGWController implements MutantRatioQueryController {
	constructor(@inject(TYPES.MutantRatioService) private service: IMutantRatioService) {}

	async handleEvent(event: APIGatewayProxyEvent): Promise<any> {
		return await this.service.getMutantCountAndRatio();
	}
}
