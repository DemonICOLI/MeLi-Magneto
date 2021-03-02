"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../../src/utils/Utils");
const ts_mocks_1 = require("ts-mocks");
const MutantIdentificationServiceImpl_1 = require("../../src/service/MutantIdentificationServiceImpl");
describe("MutantIdentificationServiceImpl Test Suite", () => {
    describe("Success Test Cases", () => {
        it("checkMutant should call generateInvalidInputResponse if Gnome is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(false);
            const presenterMock = {
                generateInvalidInputResponse: () => undefined
            };
            spyOn(presenterMock, "generateInvalidInputResponse");
            const presenter = new ts_mocks_1.Mock(presenterMock).Object, finder = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            }).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(finder, finder, finder, finder, presenter);
            yield service.checkMutant([[]]);
            expect(presenter.generateInvalidInputResponse).toHaveBeenCalled();
        }));
        it("checkMutant should call containsMutantSequence on verticalFinder", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(true);
            const verticalMock = {
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            };
            spyOn(verticalMock, "containsMutantSequence");
            const presenter = new ts_mocks_1.Mock({
                generateIsNotMutantResponse: () => undefined
            }).Object, finderGenericMock = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            }).Object, verticalFinder = new ts_mocks_1.Mock(verticalMock).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(finderGenericMock, verticalFinder, finderGenericMock, finderGenericMock, presenter);
            yield service.checkMutant([[]]);
            expect(verticalMock.containsMutantSequence).toHaveBeenCalled();
        }));
        it("checkMutant should call containsMutantSequence on leftDiagonalFinder", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(true);
            const leftDiagonalMock = {
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            };
            spyOn(leftDiagonalMock, "containsMutantSequence");
            const presenter = new ts_mocks_1.Mock({
                generateIsNotMutantResponse: () => undefined
            }).Object, finderGenericMock = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            }).Object, leftDiagonalFinder = new ts_mocks_1.Mock(leftDiagonalMock).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(finderGenericMock, finderGenericMock, leftDiagonalFinder, finderGenericMock, presenter);
            yield service.checkMutant([[]]);
            expect(leftDiagonalMock.containsMutantSequence).toHaveBeenCalled();
        }));
        it("checkMutant should call containsMutantSequence on rightDiagonalFinder", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(true);
            const rightDiagonalMock = {
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            };
            spyOn(rightDiagonalMock, "containsMutantSequence");
            const presenter = new ts_mocks_1.Mock({
                generateIsNotMutantResponse: () => undefined
            }).Object, finderGenericMock = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            }).Object, rightDiagonalFinder = new ts_mocks_1.Mock(rightDiagonalMock).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(finderGenericMock, finderGenericMock, finderGenericMock, rightDiagonalFinder, presenter);
            yield service.checkMutant([[]]);
            expect(rightDiagonalMock.containsMutantSequence).toHaveBeenCalled();
        }));
        it("checkMutant should call containsMutantSequence on horizontalFinder", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(true);
            const horizontalMock = {
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            };
            spyOn(horizontalMock, "containsMutantSequence");
            const presenter = new ts_mocks_1.Mock({
                generateIsNotMutantResponse: () => undefined
            }).Object, finderGenericMock = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            }).Object, horizontalFinder = new ts_mocks_1.Mock(horizontalMock).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(horizontalFinder, finderGenericMock, finderGenericMock, finderGenericMock, presenter);
            yield service.checkMutant([[]]);
            expect(horizontalMock.containsMutantSequence).toHaveBeenCalled();
        }));
        it("checkMutant should call generateIsNotMutantResponse in presenter if not a mutant", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(true);
            const presenterMock = {
                generateIsNotMutantResponse: () => undefined
            };
            spyOn(presenterMock, "generateIsNotMutantResponse");
            const presenter = new ts_mocks_1.Mock(presenterMock).Object, finderGenericMock = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return false; })
            }).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(finderGenericMock, finderGenericMock, finderGenericMock, finderGenericMock, presenter);
            yield service.checkMutant([[]]);
            expect(presenterMock.generateIsNotMutantResponse).toHaveBeenCalled();
        }));
        it("checkMutant should call generateIsMutantResponse in presenter if is a mutant", () => __awaiter(void 0, void 0, void 0, function* () {
            spyOn(Utils_1.Utils, "isSquareGenome").and.returnValue(true);
            const presenterMock = {
                generateIsMutantResponse: () => undefined
            };
            spyOn(presenterMock, "generateIsMutantResponse");
            const presenter = new ts_mocks_1.Mock(presenterMock).Object, finderGenericMock = new ts_mocks_1.Mock({
                containsMutantSequence: () => __awaiter(void 0, void 0, void 0, function* () { return true; })
            }).Object;
            const service = new MutantIdentificationServiceImpl_1.MutantIdentificationServiceImpl(finderGenericMock, finderGenericMock, finderGenericMock, finderGenericMock, presenter);
            yield service.checkMutant([[]]);
            expect(presenterMock.generateIsMutantResponse).toHaveBeenCalled();
        }));
    });
});
