import { MutantGeneFinder } from "../MutantGeneFinder";
import { Genome } from "../../../../model/mutant-gene/Genome";
import { GeneSequence } from "../../../../model/mutant-gene/GeneSequence";
import { CONSTANTS } from "../../../../utils/Constants";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MutantGeneLeftDiagonalFinder extends MutantGeneFinder {
	extractGeneSequences(genome: Genome): GeneSequence[] {
		let geneSequences: GeneSequence[] = [];
		const genomeLength = genome.length;
		for (let i = 0; i <= genomeLength * 2 - 1; i++) {
			const leftDiagonal: GeneSequence = [];
			for (let y = genomeLength - 1; y >= 0; y--) {
				const x = i - (genomeLength - y);
				if (x >= 0 && x < genomeLength) {
					leftDiagonal.push(genome[y][x]);
				}
			}
			if (leftDiagonal.length > 0) {
				geneSequences.push(leftDiagonal);
			}
		}
		geneSequences = geneSequences.filter((geneSequence) => {
			return geneSequence.length >= CONSTANTS.NUMBER_OF_CONSECUTIVE_GENES_TO_BE_MUTANT;
		});
		return geneSequences;
	}
}
