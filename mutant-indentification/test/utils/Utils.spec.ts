import {Utils} from "../../src/utils/Utils";

describe("Utils Test Suite", () => {

    describe("Success Test Cases", () => {

        it("buildMutantFindingRegex should return a Regex", () => {
            const generatedRegex = Utils.buildMutantFindingRegex();
            expect(generatedRegex).toBeInstanceOf(RegExp);
        });

        it("isMutantMarkerPresent should return true if a String matches the mutant regex", () => {
            const mutantRegex = /([K])\1\1\1+/,
                sequenceToTest = ["K","K","K","K"];
            spyOn(Utils, "buildMutantFindingRegex").and.returnValue(mutantRegex);
            const isMutantMarkerPresent = Utils.isMutantMarkerPresent(sequenceToTest);
            expect(isMutantMarkerPresent).toBeTrue();
        });

        it("isMutantMarkerPresent should return false if a String matches the mutant regex", () => {
            const mutantRegex = /([K])\1\1\1+/,
                sequenceToTest = ["K","K","K","G"];
            spyOn(Utils, "buildMutantFindingRegex").and.returnValue(mutantRegex);
            const isMutantMarkerPresent = Utils.isMutantMarkerPresent(sequenceToTest);
            expect(isMutantMarkerPresent).toBeFalse();
        });

        it("isSquareGenome should return false if Genome is not square", () => {
            const gnomeToTest =
                [
                    ["K","K"],
                    ["K"]
                ];
            const isGnomeSquare = Utils.isSquareGenome(gnomeToTest);
            expect(isGnomeSquare).toBeFalse();
        });

        it("isSquareGenome should return true if Genome is square", () => {
            const gnomeToTest =
                [
                    ["K","K"],
                    ["K","K"]
                ];
            const isGnomeSquare = Utils.isSquareGenome(gnomeToTest);
            expect(isGnomeSquare).toBeTrue();
        });

    });
});