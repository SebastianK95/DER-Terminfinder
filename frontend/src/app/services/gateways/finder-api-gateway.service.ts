import {Injectable} from '@angular/core';
import {GraphQlParameter} from '../../types/GraphQlParameter';
import {GraphQlResponse} from '../../types/GraphQlResponse';
import {Http} from '@angular/http';
import {AbstractApiGateway} from './AbstractApiGateway';
import {GraphQlParameterBuilder} from '../../helper/graph-ql-parameter-builder';

@Injectable()
export class FinderApiGatewayService extends AbstractApiGateway {
  constructor(http: Http) {
    super(http);
  }

  async getById(id: number): Promise<GraphQlResponse> {
    let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
    let requestedValues = ['id', 'name', 'userId', 'description'];
    return await super.query('getFinders', parameters, requestedValues);
  }

  async getByParameters(parameters: Array<GraphQlParameter>, requestedValues: string[]): Promise<GraphQlResponse> {
    return await super.query('getFinders', parameters, requestedValues);
  }

  /**
   * Diese Methode ermittelt alle Finder entsprechend eines Filters.
   * @author Sebastian Koers
   * @param    (object)    filter    Ein Objekt, welches Filterargumente enthaelt.
   *                                 {
     *                                   feldname: wert
     *                                 }
   */
  async getByFilter(filter = {}) {
    let parameters = [], filterKeys = Object.keys(filter);
    for (var i = 0; i < filterKeys.length; i++) {
      parameters.push(GraphQlParameterBuilder.createParameterObject(filterKeys[i], filter[filterKeys[i]]))
    }
    return await super.query('getFinders', parameters, ['id', 'name', 'description', 'userId']);
  }

  async create(hinzufuegenFelder) {
    let parameters = [], keys = Object.keys(hinzufuegenFelder), ret = false, self = this;
    if (hinzufuegenFelder.name) {
      var finder = this.getByFilter({name: hinzufuegenFelder.name});
      finder.then(function (res) {
        if (res.data.length === 0) {
          for (var i = 0; i < keys.length; i++) {
            parameters.push(GraphQlParameterBuilder.createParameterObject(keys[i], hinzufuegenFelder[keys[i]]));
          }
          self.mutate('createFinder', parameters);
        }
      });
    }
    return ret;
  }

  async exists(id: number): Promise<GraphQlResponse> {
    let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
    return await super.query('finderExists', parameters, null);
  }

  async delete(id: number): Promise<GraphQlResponse> {
    let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
    return await super.mutate('deleteFinder', parameters);
  }

  async updateFinderName(id: number, name: string) {
    let parameters = [
      GraphQlParameterBuilder.createParameterObject('id', id),
      GraphQlParameterBuilder.createParameterObject('name', name),
    ];
    return await super.mutate('updateFinderName', parameters)
  }

  async updateFinderDescription(id: number, description: string) {
    let parameters = [
      GraphQlParameterBuilder.createParameterObject('id', id),
      GraphQlParameterBuilder.createParameterObject('description', description),
    ];
    return await super.mutate('updateFinderDescription', parameters)
  }
}
