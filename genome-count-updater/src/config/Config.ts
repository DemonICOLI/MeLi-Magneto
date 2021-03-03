import { Container } from "inversify";
import { TYPES } from "../utils/Constants";
import { GenomeInformationRepository } from "../repository/GenomeInformationRepository";
import { GenomeInformationDynamoDBRepository } from "../repository/aws/dynamo-db/GenomeInformationDynamoDBRepository";
import { GenomeCountUpdaterPresenter } from "../presenter/GenomeCountUpdaterPresenter";
import { GenomeCountUpdaterSimplePresenter } from "../presenter/simple/GenomeCountUpdaterSimplePresenter";
import { IGenomeCountUpdaterService } from "../service/IGenomeCountUpdaterService";
import { GenomeCountUpdaterServiceImpl } from "../service/GenomeCountUpdaterServiceImpl";
import { GenomeCountUpdaterController } from "../controller/GenomeCountUpdaterController";
import { GenomeCountUpdaterDynamoStreamsController } from "../controller/aws/dynamo-streams/GenomeCountUpdaterDynamoStreamsController";
const AppContainer: Container = new Container();

AppContainer.bind<GenomeCountUpdaterPresenter>(TYPES.GenomeCountUpdaterPresenter).to(GenomeCountUpdaterSimplePresenter);
AppContainer.bind<IGenomeCountUpdaterService>(TYPES.GenomeCountUpdaterService).to(GenomeCountUpdaterServiceImpl);
AppContainer.bind<GenomeCountUpdaterController>(TYPES.GenomeCountUpdaterController).to(GenomeCountUpdaterDynamoStreamsController);
AppContainer.bind<GenomeInformationRepository>(TYPES.GenomeInformationRepository).to(
	GenomeInformationDynamoDBRepository
);

export { AppContainer };
