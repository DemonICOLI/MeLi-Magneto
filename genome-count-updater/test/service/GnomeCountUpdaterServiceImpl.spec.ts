import { Mock } from "ts-mocks";
import { GenomeCountUpdaterServiceImpl } from "../../src/service/GenomeCountUpdaterServiceImpl";
import { GenomeInformationRepository } from "../../src/repository/GenomeInformationRepository";
import { GenomeCountUpdaterPresenter } from "../../src/presenter/GenomeCountUpdaterPresenter";
import { CONSTANTS } from "../../src/utils/Constants";

describe("GenomeCountUpdaterServiceImpl Test Suite", () => {
	describe("Success Test Cases", () => {
		it("updateGenomeCount should throw is an Unknown Genome Type is recieved", async () => {
			const presenter = new Mock<GenomeCountUpdaterPresenter>().Object;
			const repository = new Mock<GenomeInformationRepository>().Object;
			const service = new GenomeCountUpdaterServiceImpl(repository, presenter);
			await expectAsync(service.updateGenomeCount("AAAA")).toBeRejected();
		});

		it("updateGenomeCount should call incrementHumanGenomeCount if Human Genome", async () => {
			const repositoryMock = {
				incrementHumanGenomeCount: async () => undefined,
				incrementMutantGenomeCount: async () => undefined,
			};
			spyOn(repositoryMock, "incrementHumanGenomeCount");
			const presenter = new Mock<GenomeCountUpdaterPresenter>({
				generateOkResponse: () => {
					return {};
				},
			}).Object;
			const repository = new Mock<GenomeInformationRepository>(repositoryMock).Object;
			const service = new GenomeCountUpdaterServiceImpl(repository, presenter);
			await service.updateGenomeCount(CONSTANTS.GENOME_HUMAN_TYPE);
			expect(repositoryMock.incrementHumanGenomeCount).toHaveBeenCalled();
		});

		it("updateGenomeCount should call incrementMutantGenomeCount if Mutant Genome", async () => {
			const repositoryMock = {
				incrementHumanGenomeCount: async () => undefined,
				incrementMutantGenomeCount: async () => undefined,
			};
			spyOn(repositoryMock, "incrementMutantGenomeCount");
			const presenter = new Mock<GenomeCountUpdaterPresenter>({
				generateOkResponse: () => {
					return {};
				},
			}).Object;
			const repository = new Mock<GenomeInformationRepository>(repositoryMock).Object;
			const service = new GenomeCountUpdaterServiceImpl(repository, presenter);
			await service.updateGenomeCount(CONSTANTS.GENOME_MUTANT_TYPE);
			expect(repositoryMock.incrementMutantGenomeCount).toHaveBeenCalled();
		});

		it("updateGenomeCount should call generateOkResponse if no error happens", async () => {
			const presenterMock = {
				generateOkResponse: () => {
					return {};
				},
			};
			spyOn(presenterMock, "generateOkResponse");
			const presenter = new Mock<GenomeCountUpdaterPresenter>(presenterMock).Object;
			const repository = new Mock<GenomeInformationRepository>({
				incrementHumanGenomeCount: async () => undefined,
				incrementMutantGenomeCount: async () => undefined,
			}).Object;
			const service = new GenomeCountUpdaterServiceImpl(repository, presenter);
			await service.updateGenomeCount(CONSTANTS.GENOME_MUTANT_TYPE);
			expect(presenterMock.generateOkResponse).toHaveBeenCalled();
		});
	});
});
