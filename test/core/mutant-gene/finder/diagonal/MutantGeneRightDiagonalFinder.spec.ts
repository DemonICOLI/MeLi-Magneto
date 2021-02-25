import {Genome} from "../../../../../src/model/mutant-gene/Genome";
import {MutantGeneFinder} from "../../../../../src/core/mutant-gene/finder/MutantGeneFinder";
import {GeneSequence} from "../../../../../src/model/mutant-gene/GeneSequence";
import {MutantGeneRightDiagonalFinder} from "../../../../../src/core/mutant-gene/finder/diagonal/MutantGeneRightDiagonalFinder";

describe("MutantGeneRightDiagonalFinder Test Suite", () => {

    describe("Success Cases", () => {

        it("extractGeneSequences should Return the Right diagonal Genes of a Genome", () => {
            const genome: Genome = [
                    ["A", "A", "A", "A", "A"],
                    ["C", "C", "C", "C", "C"],
                    ["G", "G", "G", "G", "G"],
                    ["T", "T", "T", "T", "T"],
                    ["A", "C", "G", "T", "A"]
                ],
                mutantGeneFinder: MutantGeneFinder = new MutantGeneRightDiagonalFinder();
            const geneSequences: GeneSequence[] = mutantGeneFinder.extractGeneSequences(genome);
            expect(geneSequences).toEqual([["T", "G", "C","A"], ["A", "T", "G","C","A"], ["C", "T", "G","C"]]);
        })

        it("containsMutantSequence should Return true if a mutant sequence is found in a right diagonal", async () => {
            const genome: Genome = [
                    ["A", "C", "G", "T", "T"],
                    ["A", "A", "C", "T", "T"],
                    ["T", "A", "T", "C", "G"],
                    ["G", "T", "A", "A", "C"],
                    ["A", "A", "C", "G", "T"]
                ],
                mutantGeneFinder: MutantGeneFinder = new MutantGeneRightDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            await expectAsync(containsMutantSequence).toBeResolvedTo(true);
        })

        it("containsMutantSequence should Return true if a mutant sequence is not found in a right diagonal", async () => {
            const genome: Genome = [
                    ["A", "C", "G", "T"],
                    ["C", "G", "A", "A"],
                    ["G", "T", "A", "C"],
                    ["T", "A", "C", "G"]
                ],
                mutantGeneFinder: MutantGeneFinder = new MutantGeneRightDiagonalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            await expectAsync(containsMutantSequence).toBeResolvedTo(false);
        })

    });
});