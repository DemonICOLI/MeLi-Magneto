import { MutantGeneFinder } from "../MutantGeneFinder";
import { GeneSequence } from "../../../../model/mutant-gene/GeneSequence";
import { Genome } from "../../../../model/mutant-gene/Genome";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MutantGeneVerticalFinder extends MutantGeneFinder {
	extractGeneSequences(genome: Genome): GeneSequence[] {
		const geneSequences: GeneSequence[] = [];
		for (const columnIndex in genome) {
			geneSequences.push(genome.map((genes) => genes[columnIndex]));
		}
		return geneSequences;
	}
}
