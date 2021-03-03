import { CONSTANTS } from "./Constants";
import { GeneSequence } from "../model/mutant-gene/GeneSequence";
import { Genome } from "../model/mutant-gene/Genome";
import * as crypto from "crypto";

export class Utils {
	public static buildMutantFindingRegex(): RegExp {
		let pattern = `([${CONSTANTS.GENES}])`;
		for (let index = 0; index < CONSTANTS.NUMBER_OF_CONSECUTIVE_GENES_TO_BE_MUTANT - 1; index++) {
			pattern += "\\2";
		}
		pattern = `^([${CONSTANTS.GENES}]*)${pattern}+([${CONSTANTS.GENES}]*)$`;
		return new RegExp(pattern);
	}

	public static isMutantMarkerPresent(geneSequence: GeneSequence): boolean {
		const mutantRegex = this.buildMutantFindingRegex(),
			flattenedGeneSequence = this.flatGeneSequence(geneSequence);
		return mutantRegex.test(flattenedGeneSequence);
	}

	public static isSquareGenome(subjectGenome: Genome): boolean {
		const genomeLength = subjectGenome.length;
		let isSquare = true;
		for (const sequence of subjectGenome) {
			isSquare = isSquare && sequence.length === genomeLength;
		}
		return isSquare;
	}

	private static flatGeneSequence(geneSequence: GeneSequence): string {
		return geneSequence.join("");
	}

	static generateGenomeIdentifier(subjectGenome: Genome) {
		return crypto.createHash(CONSTANTS.HASH_ALGORITHM).update(JSON.stringify(subjectGenome)).digest("base64");
	}
}
