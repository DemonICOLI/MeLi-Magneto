import { MutantGeneFinder } from "../MutantGeneFinder";
import { GeneSequence } from "../../../../model/mutant-gene/GeneSequence";
import { Genome } from "../../../../model/mutant-gene/Genome";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MutantGeneHorizontalFinder extends MutantGeneFinder {
	extractGeneSequences(genome: Genome): GeneSequence[] {
		const geneSequences: GeneSequence[] = [];
		genome.forEach((geneSequence) => {
			geneSequences.push(geneSequence);
		});
		return geneSequences;
	}
}
