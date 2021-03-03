export interface GenomeCountUpdaterController {
	handleEvent(event: object): Promise<any>;
}
