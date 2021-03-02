import { AppContainer } from "./config/Config";
import { MutantIdentificationController } from "./controller/MutantIdentificationController";
import { TYPES } from "./utils/Constants";

let controllerInstance: MutantIdentificationController;

export async function handler(event: object, context: object): Promise<object> {
	console.debug("Evento Recibido: %o \n Contexto de Ejecución: %o", event, context);
	try {
		console.debug("Resolviendo Dependencias");
		controllerInstance =
			controllerInstance ??
			AppContainer.get<MutantIdentificationController>(TYPES.MutantIdentificationController);
		console.debug("Cediendo Ejecucion al Controlador");
		return await controllerInstance.handleEvent(event);
	} catch (error) {
		console.error("Error en la ejecución de la funcion: %o", error);
		throw error;
	} finally {
		console.log("Ejecución Finalizada");
	}
}
