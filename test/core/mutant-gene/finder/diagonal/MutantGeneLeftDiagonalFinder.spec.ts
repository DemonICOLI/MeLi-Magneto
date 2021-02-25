import {Genome} from "../../../../../src/model/mutant-gene/Genome";
import {MutantGeneFinder} from "../../../../../src/core/mutant-gene/finder/MutantGeneFinder";
import {GeneSequence} from "../../../../../src/model/mutant-gene/GeneSequence";
import {MutantGeneLeftDiagonalFinder} from "../../../../../src/core/mutant-gene/finder/diagonal/MutantGeneLeftDiagonalFinder";

describe("MutantGeneLeftDiagonalFinder Test Suite", () => {

    describe("Success Cases", () => {

        it("extractGeneSequences should Return the Left diagonal Genes of a Genome", () => {
            const genome: Genome = [
                    ["A", "A", "A", "A", "A"],
                    ["C", "C", "C", "C", "C"],
                    ["G", "G", "G", "G", "G"],
                    ["T", "T", "T", "T", "T"],
                    ["A", "C", "G", "T", "A"]
                ],
                mutantGeneFinder: MutantGeneFinder = new MutantGeneLeftDiagonalFinder();
            const geneSequences: GeneSequence[] = mutantGeneFinder.extractGeneSequences(genome);
            expect(geneSequences).toEqual([["T", "T", "G","C"], ["A", "T", "G","C","A"], ["T", "G", "C","A"]]);
        })

        it("containsMutantSequence should Return true if a mutant sequence is found in a left diagonal", async () => {
            const genome: Genome = [
                    ["A", "C", "G", "T", "A"],
                    ["A", "A", "C", "G", "T"],
                    ["T", "A", "A", "C", "G"],
                    ["G", "T", "A", "A", "C"],
                    ["A", "A", "C", "G", "T"]
                ],
                mutantGeneFinder: MutantGeneFinder = new MutantGeneLeftDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            await expectAsync(containsMutantSequence).toBeResolvedTo(true);
        })

        it("containsMutantSequence should Return true if a mutant sequence is not found in a left diagonal", async () => {
            const genome: Genome = [
                    ["A", "C", "G", "T"],
                    ["C", "G", "T", "A"],
                    ["G", "T", "A", "C"],
                    ["T", "A", "C", "G"]
                ],
                mutantGeneFinder: MutantGeneFinder = new MutantGeneLeftDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            await expectAsync(containsMutantSequence).toBeResolvedTo(false);
        })

    });
});