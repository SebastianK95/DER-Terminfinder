import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AbstractApiGateway} from './AbstractApiGateway';

@Injectable()
export class GeneralApiGateway extends AbstractApiGateway {

  constructor(http: Http) {
    super(http);
  }
  
  async select(tableName: string, felder = [], filter = {}, joins = []) {
    return await super.dynamicQuery(tableName, felder, filter, joins);
  }
  
  async insert(tableName: string, hinzufuegenFelder = {}) {
    return await super.dynamicMutation(tableName, hinzufuegenFelder, {}, 'hinzufuegen');
  }
  
  async update(tableName: string, aendernFelder = {}, filter = {}) {
    return await super.dynamicMutation(tableName, aendernFelder, filter, 'aendern');
  }
  
  async sendMail(emailTo, subject = '', message = '') {
    return await super.sendMailRequest(emailTo, subject, message)
  }

}
