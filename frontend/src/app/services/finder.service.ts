import {Injectable} from '@angular/core';
import {FinderApiGatewayService} from './gateways/finder-api-gateway.service';
import {Finder} from '../entity/finder';

@Injectable()
export class FinderService {

    constructor(private finderApiGateway: FinderApiGatewayService) {
    }

    async getById(id: number): Promise<Finder> {
        let finder = null
        let finderData = await this.finderApiGateway.getById(id);
        let data = finderData.data[0];
        if (data) {
            finder = Finder.fromData(data);
        }
        return finder;
    }

    async getAll(): Promise<Finder[]> {
        let finderData = await this.finderApiGateway.getByParameters(null, ['id', 'name', 'userId']);
        let data = finderData.data;
        let finders = [];
        for (let finderIndex = 0; finderIndex < data.length; finderIndex++) {
            finders.push(Finder.fromData(data[finderIndex]))
        }
        return finders;
    }
    
    /**
     * Diese Methode fuegt einen neuen Finder hinzu.
     * @author    Sebastian Koers
     * @param     hinzufuegenFelder    {Object}    Objekt mit den Werten,
     *                                             welche hinzugefuegt werden sollen.
     */
    async createFinder(hinzufuegenFelder): Promise<boolean> {
        let response = await this.finderApiGateway.create(hinzufuegenFelder);
        return response;
    }

    async deleteFinder(id: number): Promise<boolean> {
        let response = await this.finderApiGateway.delete(id);
        return response.data;
    }

    async finderExists(id: number): Promise<boolean> {
        let response = await this.finderApiGateway.exists(id);
        return response.data;
    }

    async updateFinderName(id: number, name: string): Promise<boolean> {
        let response = await this.finderApiGateway.updateFinderName(id, name);
        return response.data;
    }

    async updateFinderDescription(id: number, description: string): Promise<boolean> {
        let response = await this.finderApiGateway.updateFinderDescription(id, description);
        return response.data;
    }
}
