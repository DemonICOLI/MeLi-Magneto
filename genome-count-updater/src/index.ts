import { AppContainer } from "./config/Config";
import { TYPES } from "./utils/Constants";
import { GenomeCountUpdaterController } from "./controller/GenomeCountUpdaterController";

let controllerInstance: GenomeCountUpdaterController;

export async function handler(event: object, context: object): Promise<object> {
	console.debug("Evento Recibido: %o \n Contexto de Ejecución: %o", event, context);
	try {
		console.debug("Resolviendo Dependencias");
		controllerInstance =
			controllerInstance ?? AppContainer.get<GenomeCountUpdaterController>(TYPES.GenomeCountUpdaterController);
		console.debug("Cediendo Ejecucion al Controlador");
		return await controllerInstance.handleEvent(event);
	} catch (error) {
		console.error("Error en la ejecución de la funcion: %o", error);
		throw error;
	} finally {
		console.log("Ejecución Finalizada");
	}
}
