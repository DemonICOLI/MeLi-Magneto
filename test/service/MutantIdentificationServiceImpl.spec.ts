import { Utils } from "../../src/utils/Utils";
import { Mock } from "ts-mocks";
import { MutantIdentificationPresenter } from "../../src/presenter/MutantIdentificationPresenter";
import { MutantGeneFinder } from "../../src/core/mutant-gene/finder/MutantGeneFinder";
import { MutantIdentificationServiceImpl } from "../../src/service/MutantIdentificationServiceImpl";
import { GenomeInformationRepository } from "../../src/repository/GenomeInformationRepository";

describe("MutantIdentificationServiceImpl Test Suite", () => {
	describe("Success Test Cases", () => {
		it("checkMutant should call generateInvalidInputResponse if Gnome is invalid", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(false);
			const presenterMock = {
				generateInvalidInputResponse: () => undefined,
			};
			spyOn(presenterMock, "generateInvalidInputResponse");
			const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
				finder = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 0,
				}).Object;
			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;
			const service = new MutantIdentificationServiceImpl(finder, finder, finder, finder, presenter, repository);
			await service.checkMutant([[]]);
			expect(presenter.generateInvalidInputResponse).toHaveBeenCalled();
		});

		it("checkMutant should call containsMutantSequence on verticalFinder", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const verticalMock = {
				findNumberOfMutantSequence: async () => 0,
			};
			spyOn(verticalMock, "findNumberOfMutantSequence");
			const presenter = new Mock<MutantIdentificationPresenter>({
					generateIsNotMutantResponse: () => undefined,
				}).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 0,
				}).Object,
				verticalFinder = new Mock<MutantGeneFinder>(verticalMock).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				verticalFinder,
				finderGenericMock,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(verticalMock.findNumberOfMutantSequence).toHaveBeenCalled();
		});

		it("checkMutant should call containsMutantSequence on leftDiagonalFinder", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const leftDiagonalMock = {
				findNumberOfMutantSequence: async () => 0,
			};
			spyOn(leftDiagonalMock, "findNumberOfMutantSequence");
			const presenter = new Mock<MutantIdentificationPresenter>({
					generateIsNotMutantResponse: () => undefined,
				}).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 0,
				}).Object,
				leftDiagonalFinder = new Mock<MutantGeneFinder>(leftDiagonalMock).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				finderGenericMock,
				leftDiagonalFinder,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(leftDiagonalMock.findNumberOfMutantSequence).toHaveBeenCalled();
		});

		it("checkMutant should call containsMutantSequence on rightDiagonalFinder", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const rightDiagonalMock = {
				findNumberOfMutantSequence: async () => 0,
			};
			spyOn(rightDiagonalMock, "findNumberOfMutantSequence");
			const presenter = new Mock<MutantIdentificationPresenter>({
					generateIsNotMutantResponse: () => undefined,
				}).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 0,
				}).Object,
				rightDiagonalFinder = new Mock<MutantGeneFinder>(rightDiagonalMock).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				rightDiagonalFinder,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(rightDiagonalMock.findNumberOfMutantSequence).toHaveBeenCalled();
		});

		it("checkMutant should call containsMutantSequence on horizontalFinder", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const horizontalMock = {
				findNumberOfMutantSequence: async () => 0,
			};
			spyOn(horizontalMock, "findNumberOfMutantSequence");
			const presenter = new Mock<MutantIdentificationPresenter>({
					generateIsNotMutantResponse: () => undefined,
				}).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 0,
				}).Object,
				horizontalFinder = new Mock<MutantGeneFinder>(horizontalMock).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				horizontalFinder,
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(horizontalMock.findNumberOfMutantSequence).toHaveBeenCalled();
		});

		it("checkMutant should call generateIsNotMutantResponse in presenter if not a mutant", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const presenterMock = {
				generateIsNotMutantResponse: () => undefined,
			};
			spyOn(presenterMock, "generateIsNotMutantResponse");
			const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 0,
				}).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(presenterMock.generateIsNotMutantResponse).toHaveBeenCalled();
		});

		it("checkMutant should call generateIsMutantResponse in presenter if is a mutant", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const presenterMock = {
				generateIsMutantResponse: () => undefined,
			};
			spyOn(presenterMock, "generateIsMutantResponse");
			const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 1,
				}).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => undefined,
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(presenterMock.generateIsMutantResponse).toHaveBeenCalled();
		});

		it("checkMutant should call generateInternalServerErrorResponse in presenter if an error saving occurs", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const repositoryMock = {
				saveGenomeResult: async () => undefined,
			};
			spyOn(repositoryMock, "saveGenomeResult");
			const presenter = new Mock<MutantIdentificationPresenter>({
					generateIsMutantResponse: () => undefined,
				}).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 1,
				}).Object;

			const repository = new Mock<GenomeInformationRepository>(repositoryMock).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(repositoryMock.saveGenomeResult).toHaveBeenCalled();
		});

		it("checkMutant should call saveGenomeResult in repository", async () => {
			spyOn(Utils, "isSquareGenome").and.returnValue(true);
			const presenterMock = {
				generateInternalServerErrorResponse: () => undefined,
			};
			spyOn(presenterMock, "generateInternalServerErrorResponse");
			const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
				finderGenericMock = new Mock<MutantGeneFinder>({
					findNumberOfMutantSequence: async () => 1,
				}).Object;

			const repository = new Mock<GenomeInformationRepository>({
				saveGenomeResult: async () => {
					throw new Error("MOCK ERROR");
				},
			}).Object;

			const service = new MutantIdentificationServiceImpl(
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				finderGenericMock,
				presenter,
				repository
			);
			await service.checkMutant([[]]);
			expect(presenterMock.generateInternalServerErrorResponse).toHaveBeenCalled();
		});
	});
});
