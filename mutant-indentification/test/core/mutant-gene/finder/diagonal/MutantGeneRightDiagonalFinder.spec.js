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
const MutantGeneRightDiagonalFinder_1 = require("../../../../../src/core/mutant-gene/finder/diagonal/MutantGeneRightDiagonalFinder");
describe("MutantGeneRightDiagonalFinder Test Suite", () => {
    describe("Success Cases", () => {
        it("extractGeneSequences should Return the Right diagonal Genes of a Genome", () => {
            const genome = [
                ["A", "A", "A", "A", "A"],
                ["C", "C", "C", "C", "C"],
                ["G", "G", "G", "G", "G"],
                ["T", "T", "T", "T", "T"],
                ["A", "C", "G", "T", "A"]
            ], mutantGeneFinder = new MutantGeneRightDiagonalFinder_1.MutantGeneRightDiagonalFinder();
            const geneSequences = mutantGeneFinder.extractGeneSequences(genome);
            expect(geneSequences).toEqual([["T", "G", "C", "A"], ["A", "T", "G", "C", "A"], ["C", "T", "G", "C"]]);
        });
        it("containsMutantSequence should Return true if a mutant sequence is found in a right diagonal", () => __awaiter(void 0, void 0, void 0, function* () {
            const genome = [
                ["A", "C", "G", "T", "T"],
                ["A", "A", "C", "T", "T"],
                ["T", "A", "T", "C", "G"],
                ["G", "T", "A", "A", "C"],
                ["A", "A", "C", "G", "T"]
            ], mutantGeneFinder = new MutantGeneRightDiagonalFinder_1.MutantGeneRightDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            yield expectAsync(containsMutantSequence).toBeResolvedTo(true);
        }));
        it("containsMutantSequence should Return true if a mutant sequence is not found in a right diagonal", () => __awaiter(void 0, void 0, void 0, function* () {
            const genome = [
                ["A", "C", "G", "T"],
                ["C", "G", "A", "A"],
                ["G", "T", "A", "C"],
                ["T", "A", "C", "G"]
            ], mutantGeneFinder = new MutantGeneRightDiagonalFinder_1.MutantGeneRightDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            yield expectAsync(containsMutantSequence).toBeResolvedTo(false);
        }));
    });
});
