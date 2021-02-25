import {CONSTANTS} from "./Constants";
import {GeneSequence} from "../model/mutant-gene/GeneSequence";

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

    private static flatGeneSequence(geneSequence: GeneSequence): string {
        return geneSequence.join("");
    }
}