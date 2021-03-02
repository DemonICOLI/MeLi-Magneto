import { Container } from "inversify";
import { MutantGeneFinder } from "../core/mutant-gene/finder/MutantGeneFinder";
import { TYPES } from "../utils/Constants";
import { MutantGeneHorizontalFinder } from "../core/mutant-gene/finder/horizontal/MutantGeneHorizontalFinder";
import { MutantGeneVerticalFinder } from "../core/mutant-gene/finder/vertical/MutantGeneVerticalFinder";
import { MutantGeneLeftDiagonalFinder } from "../core/mutant-gene/finder/diagonal/MutantGeneLeftDiagonalFinder";
import { MutantGeneRightDiagonalFinder } from "../core/mutant-gene/finder/diagonal/MutantGeneRightDiagonalFinder";
import { MutantIdentificationPresenter } from "../presenter/MutantIdentificationPresenter";
import { MutantIdentificationAWSAPIGWPresenter } from "../presenter/aws/api-gateway/MutantIdentificationAWSAPIGWPresenter";
import { MutantIdentificationController } from "../controller/MutantIdentificationController";
import { MutantIdentificationAWSAPIGWController } from "../controller/aws/api-gateway/MutantIdentificationAWSAPIGWController";
import { IMutantIdentificationService } from "../service/IMutantIdentificationService";
import { MutantIdentificationServiceImpl } from "../service/MutantIdentificationServiceImpl";

const AppContainer: Container = new Container();

AppContainer.bind<MutantGeneFinder>(TYPES.MutantGeneHorizontalFinder).to(MutantGeneHorizontalFinder);
AppContainer.bind<MutantGeneFinder>(TYPES.MutantGeneVerticalFinder).to(MutantGeneVerticalFinder);
AppContainer.bind<MutantGeneFinder>(TYPES.MutantGeneLeftDiagonalFinder).to(MutantGeneLeftDiagonalFinder);
AppContainer.bind<MutantGeneFinder>(TYPES.MutantGeneRightDiagonalFinder).to(MutantGeneRightDiagonalFinder);
AppContainer.bind<MutantIdentificationPresenter>(TYPES.MutantIdentificationPresenter).to(
	MutantIdentificationAWSAPIGWPresenter
);
AppContainer.bind<IMutantIdentificationService>(TYPES.MutantIdentificationService).to(MutantIdentificationServiceImpl);
AppContainer.bind<MutantIdentificationController>(TYPES.MutantIdentificationController).to(
	MutantIdentificationAWSAPIGWController
);

export { AppContainer };
