import { GenomeCountUpdaterPresenter } from "../GenomeCountUpdaterPresenter";
import { HTTP_CODES } from "../../utils/Constants";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class GenomeCountUpdaterSimplePresenter implements GenomeCountUpdaterPresenter {
	generateOkResponse(): object {
		return {
			statusCode: HTTP_CODES.OK,
		};
	}
}
