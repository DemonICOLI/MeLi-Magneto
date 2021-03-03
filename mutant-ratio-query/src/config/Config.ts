import { Container } from "inversify";
import { TYPES } from "../utils/Constants";
import { GenomeInformationRepository } from "../repository/GenomeInformationRepository";
import { GenomeInformationDynamoDBRepository } from "../repository/aws/dynamo-db/GenomeInformationDynamoDBRepository";
import { MutantRatioQueryPresenter } from "../presenter/MutantRatioQueryPresenter";
import { MutantRatioQueryAPIGWPresenter } from "../presenter/aws/api-gateway/MutantRatioQueryAPIGWPresenter";
import { IMutantRatioService } from "../service/IMutantRatioService";
import { MutantRatioServiceImpl } from "../service/MutantRatioServiceImpl";
import { MutantRatioQueryController } from "../controller/MutantRatioQueryController";
import { MutantRatioQueryAPIGWController } from "../controller/aws/api-gateway/MutantRatioQueryAPIGWController";

const AppContainer: Container = new Container();

AppContainer.bind<MutantRatioQueryPresenter>(TYPES.MutantRatioQueryPresenter).to(MutantRatioQueryAPIGWPresenter);
AppContainer.bind<IMutantRatioService>(TYPES.MutantRatioService).to(MutantRatioServiceImpl);
AppContainer.bind<MutantRatioQueryController>(TYPES.MutantRatioQueryController).to(MutantRatioQueryAPIGWController);
AppContainer.bind<GenomeInformationRepository>(TYPES.GenomeInformationRepository).to(
	GenomeInformationDynamoDBRepository
);

export { AppContainer };
