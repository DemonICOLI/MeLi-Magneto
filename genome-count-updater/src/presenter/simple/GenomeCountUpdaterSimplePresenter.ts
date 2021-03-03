import { GenomeCountUpdaterPresenter } from "../GenomeCountUpdaterPresenter";
import { HTTP_CODES } from "../../utils/Constants";

export class GenomeCountUpdaterSimplePresenter implements GenomeCountUpdaterPresenter {
	generateOkResponse(): object {
		return {
			statusCode: HTTP_CODES.OK,
		};
	}
}
