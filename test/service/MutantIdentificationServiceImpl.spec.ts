import {Utils} from "../../src/utils/Utils";
import {Mock} from "ts-mocks";
import {MutantIdentificationPresenter} from "../../src/presenter/MutantIdentificationPresenter";
import {MutantGeneFinder} from "../../src/core/mutant-gene/finder/MutantGeneFinder";
import {MutantIdentificationServiceImpl} from "../../src/service/MutantIdentificationServiceImpl";

describe("MutantIdentificationServiceImpl Test Suite", () => {

    describe("Success Test Cases", () => {

        it("checkMutant should call generateInvalidInputResponse if Gnome is invalid", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(false);
            const presenterMock = {
                generateInvalidInputResponse: () => undefined
            };
            spyOn(presenterMock, "generateInvalidInputResponse")
            const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
                finder = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => false
                }).Object

            const service = new MutantIdentificationServiceImpl(finder,finder,finder,finder,presenter);
            await service.checkMutant([[]]);
            expect(presenter.generateInvalidInputResponse).toHaveBeenCalled()
        });

        it("checkMutant should call containsMutantSequence on verticalFinder", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(true);
            const verticalMock = {
                containsMutantSequence: async () => false
            };
            spyOn(verticalMock, "containsMutantSequence");
            const presenter = new Mock<MutantIdentificationPresenter>({
                    generateIsNotMutantResponse: () => undefined
                }).Object,
                finderGenericMock = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => false
                }).Object,
                verticalFinder = new Mock<MutantGeneFinder>(verticalMock).Object;

            const service = new MutantIdentificationServiceImpl(finderGenericMock, verticalFinder,finderGenericMock,finderGenericMock,presenter);
            await service.checkMutant([[]]);
            expect(verticalMock.containsMutantSequence).toHaveBeenCalled()
        });

        it("checkMutant should call containsMutantSequence on leftDiagonalFinder", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(true);
            const leftDiagonalMock = {
                containsMutantSequence: async () => false
            };
            spyOn(leftDiagonalMock, "containsMutantSequence");
            const presenter = new Mock<MutantIdentificationPresenter>({
                    generateIsNotMutantResponse: () => undefined
                }).Object,
                finderGenericMock = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => false
                }).Object,
                leftDiagonalFinder = new Mock<MutantGeneFinder>(leftDiagonalMock).Object;

            const service = new MutantIdentificationServiceImpl(finderGenericMock,finderGenericMock,leftDiagonalFinder,finderGenericMock,presenter);
            await service.checkMutant([[]]);
            expect(leftDiagonalMock.containsMutantSequence).toHaveBeenCalled()
        });

        it("checkMutant should call containsMutantSequence on rightDiagonalFinder", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(true);
            const rightDiagonalMock = {
                containsMutantSequence: async () => false
            };
            spyOn(rightDiagonalMock, "containsMutantSequence");
            const presenter = new Mock<MutantIdentificationPresenter>({
                    generateIsNotMutantResponse: () => undefined
                }).Object,
                finderGenericMock = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => false
                }).Object,
                rightDiagonalFinder = new Mock<MutantGeneFinder>(rightDiagonalMock).Object;

            const service = new MutantIdentificationServiceImpl(finderGenericMock,finderGenericMock,finderGenericMock,rightDiagonalFinder,presenter);
            await service.checkMutant([[]]);
            expect(rightDiagonalMock.containsMutantSequence).toHaveBeenCalled()
        });

        it("checkMutant should call containsMutantSequence on horizontalFinder", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(true);
            const horizontalMock = {
                containsMutantSequence: async () => false
            };
            spyOn(horizontalMock, "containsMutantSequence");
            const presenter = new Mock<MutantIdentificationPresenter>({
                    generateIsNotMutantResponse: () => undefined
                }).Object,
                finderGenericMock = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => false
                }).Object,
                horizontalFinder = new Mock<MutantGeneFinder>(horizontalMock).Object;

            const service = new MutantIdentificationServiceImpl(horizontalFinder,finderGenericMock,finderGenericMock,finderGenericMock,presenter);
            await service.checkMutant([[]]);
            expect(horizontalMock.containsMutantSequence).toHaveBeenCalled()
        });

        it("checkMutant should call generateIsNotMutantResponse in presenter if not a mutant", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(true);
            const presenterMock = {
                generateIsNotMutantResponse: () => undefined
            };
            spyOn(presenterMock, "generateIsNotMutantResponse");
            const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
                finderGenericMock = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => false
                }).Object;

            const service = new MutantIdentificationServiceImpl(finderGenericMock,finderGenericMock,finderGenericMock,finderGenericMock,presenter);
            await service.checkMutant([[]]);
            expect(presenterMock.generateIsNotMutantResponse).toHaveBeenCalled()
        });

        it("checkMutant should call generateIsMutantResponse in presenter if is a mutant", async () => {
            spyOn(Utils, "isSquareGenome").and.returnValue(true);
            const presenterMock = {
                generateIsMutantResponse: () => undefined
            };
            spyOn(presenterMock, "generateIsMutantResponse");
            const presenter = new Mock<MutantIdentificationPresenter>(presenterMock).Object,
                finderGenericMock = new Mock<MutantGeneFinder>({
                    containsMutantSequence: async () => true
                }).Object;

            const service = new MutantIdentificationServiceImpl(finderGenericMock,finderGenericMock,finderGenericMock,finderGenericMock,presenter);
            await service.checkMutant([[]]);
            expect(presenterMock.generateIsMutantResponse).toHaveBeenCalled()
        });

    });
});