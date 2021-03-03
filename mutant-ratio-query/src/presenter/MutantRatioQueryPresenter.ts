export interface MutantRatioQueryPresenter {
	generateOkResponse(mutantGenomes: number, humanGnomes: number, ratio: number): any;
	generateInternalServerErrorResponse(): any;
}
