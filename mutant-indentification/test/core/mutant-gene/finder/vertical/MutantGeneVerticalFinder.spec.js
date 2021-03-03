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
const MutantGeneVerticalFinder_1 = require("../../../../../src/core/mutant-gene/finder/vertical/MutantGeneVerticalFinder");
describe("MutantGeneVerticalFinder Test Suite", () => {
    describe("Success Cases", () => {
        it("extractGeneSequences should Return the Vertical Genes of a Genome", () => {
            const genome = [
                ["A", "A", "A"],
                ["C", "C", "C"],
                ["G", "G", "G"]
            ], mutantGeneFinder = new MutantGeneVerticalFinder_1.MutantGeneVerticalFinder();
            const geneSequences = mutantGeneFinder.extractGeneSequences(genome);
            expect(geneSequences).toEqual([["A", "C", "G"], ["A", "C", "G"], ["A", "C", "G"]]);
        });
        it("containsMutantSequence should Return true if a mutant sequence is found", () => __awaiter(void 0, void 0, void 0, function* () {
            const genome = [
                ["A", "A", "A", "C"],
                ["C", "C", "A", "G"],
                ["G", "G", "A", "A"],
                ["T", "T", "A", "T"]
            ], mutantGeneFinder = new MutantGeneVerticalFinder_1.MutantGeneVerticalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            yield expectAsync(containsMutantSequence).toBeResolvedTo(true);
        }));
        it("containsMutantSequence should Return false if a mutant sequence is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const genome = [
                ["A", "C", "G", "T"],
                ["C", "G", "T", "A"],
                ["G", "T", "A", "C"],
                ["T", "A", "C", "G"]
            ], mutantGeneFinder = new MutantGeneVerticalFinder_1.MutantGeneVerticalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            yield expectAsync(containsMutantSequence).toBeResolvedTo(false);
        }));
    });
});