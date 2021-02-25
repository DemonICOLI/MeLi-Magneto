import { CONSTANTS } from "./Constants";

export class Utils {

    public static buildMutantFindingRegex() : RegExp {
        let pattern = `([${CONSTANTS.GENES}])`;
        for(let index = 0; index < CONSTANTS.NUMBER_OF_CONSECUTIVE_GENES_TO_BE_MUTANT - 1; index++){
            pattern += "\\1";
        }
        pattern += "+";
        return new RegExp(pattern);
    }

    public static isMutantMarkerPresent(geneSequence: string) : boolean {
        const mutantRegex = this.buildMutantFindingRegex();
        return mutantRegex.test(geneSequence);
    }
}