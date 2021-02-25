import {Genome} from "../../../../../src/model/mutant-gene/Genome";
import {MutantGeneFinder} from "../../../../../src/core/mutant-gene/finder/MutantGeneFinder";
import {MutantGeneHorizontalFinder} from "../../../../../src/core/mutant-gene/finder/horizontal/MutantGeneHorizontalFinder";
import {GeneSequence} from "../../../../../src/model/mutant-gene/GeneSequence";

describe("MutantGeneHorizontalFinder Test Suite", () => {

    describe("Success Cases", () => {

        it("extractGeneSequences should Return the Horizontal Genes of a Genome", () => {
            const genome : Genome = [["A","A","A"],["C","C","C"],["G","G","G"]],
                mutantGeneFinder : MutantGeneFinder = new MutantGeneHorizontalFinder();
            const geneSequences : GeneSequence[] = mutantGeneFinder.extractGeneSequences(genome);
            expect(geneSequences).toEqual([["A","A","A"],["C","C","C"],["G","G","G"]]);
        })

        it("containsMutantSequence should Return true if a mutant sequence is found", async () => {
            const genome : Genome = [["A","A","A","C"],["C","C","C","G"],["G","G","G","A"],["T","T","T","T"]],
                mutantGeneFinder : MutantGeneFinder = new MutantGeneHorizontalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            await expectAsync(containsMutantSequence).toBeResolvedTo(true);
        })

        it("containsMutantSequence should Return false if a mutant sequence is not found", async () => {
            const genome : Genome = [["A","C","G","T"],["C","G","T","A"],["G","T","A","C"],["T","A","C","G"]],
                mutantGeneFinder : MutantGeneFinder = new MutantGeneHorizontalFinder();
            const containsMutantSequence = mutantGeneFinder.containsMutantSequence(genome);
            await expectAsync(containsMutantSequence).toBeResolvedTo(false);
        })

    });
});