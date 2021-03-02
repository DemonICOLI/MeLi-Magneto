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
const MutantGeneLeftDiagonalFinder_1 = require("../../../../../src/core/mutant-gene/finder/diagonal/MutantGeneLeftDiagonalFinder");
describe("MutantGeneLeftDiagonalFinder Test Suite", () => {
    describe("Success Cases", () => {
        it("extractGeneSequences should Return the Left diagonal Genes of a Genome", () => {
            const genome = [
                ["A", "A", "A", "A", "A"],
                ["C", "C", "C", "C", "C"],
                ["G", "G", "G", "G", "G"],
                ["T", "T", "T", "T", "T"],
                ["A", "C", "G", "T", "A"]
            ], mutantGeneFinder = new MutantGeneLeftDiagonalFinder_1.MutantGeneLeftDiagonalFinder();
            const geneSequences = mutantGeneFinder.extractGeneSequences(genome);
            expect(geneSequences).toEqual([["T", "T", "G", "C"], ["A", "T", "G", "C", "A"], ["T", "G", "C", "A"]]);
        });
        it("containsMutantSequence should Return true if a mutant sequence is found in a left diagonal", () => __awaiter(void 0, void 0, void 0, function* () {
            const genome = [
                ["A", "C", "G", "T", "A"],
                ["A", "A", "C", "G", "T"],
                ["T", "A", "A", "C", "G"],
                ["G", "T", "A", "A", "C"],
                ["A", "A", "C", "G", "T"]
            ], mutantGeneFinder = new MutantGeneLeftDiagonalFinder_1.MutantGeneLeftDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            yield expectAsync(containsMutantSequence).toBeResolvedTo(true);
        }));
        it("containsMutantSequence should Return true if a mutant sequence is not found in a left diagonal", () => __awaiter(void 0, void 0, void 0, function* () {
            const genome = [
                ["A", "C", "G", "T"],
                ["C", "G", "T", "A"],
                ["G", "T", "A", "C"],
                ["T", "A", "C", "G"]
            ], mutantGeneFinder = new MutantGeneLeftDiagonalFinder_1.MutantGeneLeftDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            yield expectAsync(containsMutantSequence).toBeResolvedTo(false);
        }));
    });
});
