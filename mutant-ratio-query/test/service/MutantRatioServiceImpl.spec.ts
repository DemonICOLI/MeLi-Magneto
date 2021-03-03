import { Mock } from "ts-mocks";
import { GenomeInformationRepository } from "../../src/repository/GenomeInformationRepository";
import { MutantRatioQueryPresenter } from "../../src/presenter/MutantRatioQueryPresenter";
import { MutantRatioServiceImpl } from "../../src/service/MutantRatioServiceImpl";

describe("MutantRatioServiceImpl Test Suite", () => {
	describe("Success Test Cases", () => {
		it("getMutantCountAndRatio should call generateInternalServerErrorResponse if an error occurs", async () => {
			const presenterMock = {
				generateInternalServerErrorResponse: () => undefined,
			};
			spyOn(presenterMock, "generateInternalServerErrorResponse");
			const presenter = new Mock<MutantRatioQueryPresenter>(presenterMock).Object;
			const repository = new Mock<GenomeInformationRepository>({
				getHumanGenomeCount: async () => {
					throw "ERROR MOCK";
				},
				getMutantGenomeCount: async () => 0,
			}).Object;
			const service = new MutantRatioServiceImpl(repository, presenter);
			await service.getMutantCountAndRatio();
			expect(presenter.generateInternalServerErrorResponse).toHaveBeenCalled();
		});

		it("getMutantCountAndRatio should call generateOkResponse if no error occurs", async () => {
			const presenterMock = {
				generateOkResponse: () => undefined,
			};
			spyOn(presenterMock, "generateOkResponse");
			const presenter = new Mock<MutantRatioQueryPresenter>(presenterMock).Object;
			const repository = new Mock<GenomeInformationRepository>({
				getHumanGenomeCount: async () => 0,
				getMutantGenomeCount: async () => 0,
			}).Object;
			const service = new MutantRatioServiceImpl(repository, presenter);
			await service.getMutantCountAndRatio();
			expect(presenter.generateOkResponse).toHaveBeenCalledWith(0, 0, NaN);
		});

		it("getMutantCountAndRatio should call getHumanGenomeCount", async () => {
			const repositoryMock = {
				getHumanGenomeCount: async () => 0,
				getMutantGenomeCount: async () => 0,
			};
			spyOn(repositoryMock, "getHumanGenomeCount");
			const presenter = new Mock<MutantRatioQueryPresenter>({
				generateOkResponse: () => undefined,
			}).Object;
			const repository = new Mock<GenomeInformationRepository>(repositoryMock).Object;
			const service = new MutantRatioServiceImpl(repository, presenter);
			await service.getMutantCountAndRatio();
			expect(repositoryMock.getHumanGenomeCount).toHaveBeenCalled();
		});

		it("getMutantCountAndRatio should call getMutantGenomeCount", async () => {
			const repositoryMock = {
				getHumanGenomeCount: async () => 0,
				getMutantGenomeCount: async () => 0,
			};
			spyOn(repositoryMock, "getMutantGenomeCount");
			const presenter = new Mock<MutantRatioQueryPresenter>({
				generateOkResponse: () => undefined,
			}).Object;
			const repository = new Mock<GenomeInformationRepository>(repositoryMock).Object;
			const service = new MutantRatioServiceImpl(repository, presenter);
			await service.getMutantCountAndRatio();
			expect(repositoryMock.getMutantGenomeCount).toHaveBeenCalled();
		});
	});
});
