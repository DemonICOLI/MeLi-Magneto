import { Genome } from "../../../../../src/model/mutant-gene/Genome";
import { MutantGeneFinder } from "../../../../../src/core/mutant-gene/finder/MutantGeneFinder";
import { GeneSequence } from "../../../../../src/model/mutant-gene/GeneSequence";
import { MutantGeneVerticalFinder } from "../../../../../src/core/mutant-gene/finder/vertical/MutantGeneVerticalFinder";

describe("MutantGeneVerticalFinder Test Suite", () => {
	describe("Success Cases", () => {
		it("extractGeneSequences should Return the Vertical Genes of a Genome", () => {
			const genome: Genome = [
					["A", "A", "A"],
					["C", "C", "C"],
					["G", "G", "G"],
				],
				mutantGeneFinder: MutantGeneFinder = new MutantGeneVerticalFinder();
			const geneSequences: GeneSequence[] = mutantGeneFinder.extractGeneSequences(genome);
			expect(geneSequences).toEqual([
				["A", "C", "G"],
				["A", "C", "G"],
				["A", "C", "G"],
			]);
		});

		it("containsMutantSequence should Return true if a mutant sequence is found", async () => {
			const genome: Genome = [
					["A", "A", "A", "C"],
					["C", "C", "A", "G"],
					["G", "G", "A", "A"],
					["T", "T", "A", "T"],
				],
				mutantGeneFinder: MutantGeneFinder = new MutantGeneVerticalFinder();
			const containsMutantSequence = mutantGeneFinder.findNumberOfMutantSequence(genome);
			await expectAsync(containsMutantSequence).toBeResolvedTo(1);
		});

		it("containsMutantSequence should Return false if a mutant sequence is not found", async () => {
			const genome: Genome = [
					["A", "C", "G", "T"],
					["C", "G", "T", "A"],
					["G", "T", "A", "C"],
					["T", "A", "C", "G"],
				],
				mutantGeneFinder: MutantGeneFinder = new MutantGeneVerticalFinder();
			const containsMutantSequence = mutantGeneFinder.findNumberOfMutantSequence(genome);
			await expectAsync(containsMutantSequence).toBeResolvedTo(0);
		});
	});
});
