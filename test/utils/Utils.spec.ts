import {Utils} from "../../src/utils/Utils";

describe("Utils Test Suite", () => {

    describe("Success Test Cases", () => {

        it("buildMutantFindingRegex should return a Regex", () => {
            const generatedRegex = Utils.buildMutantFindingRegex();
            expect(generatedRegex).toBeInstanceOf(RegExp);
        });

        it("isMutantMarkerPresent should return true if a String matches the mutant regex", () => {
            const mutantRegex = /[K]\1\1\1+/,
                stringToTest = "KKKK";
            spyOn(Utils, "buildMutantFindingRegex").and.returnValue(mutantRegex);
            const isMutantMarkerPresent = Utils.isMutantMarkerPresent(stringToTest);
            expect(isMutantMarkerPresent).toBeTrue();
        });

        it("isMutantMarkerPresent should return false if a String matches the mutant regex", () => {
            const mutantRegex = /[K]\1\1\1+/,
                stringToTest = "KKKG";
            spyOn(Utils, "buildMutantFindingRegex").and.returnValue(mutantRegex);
            const isMutantMarkerPresent = Utils.isMutantMarkerPresent(stringToTest);
            expect(isMutantMarkerPresent).toBeFalse();
        });

    });
});