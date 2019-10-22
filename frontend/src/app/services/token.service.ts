import {Injectable} from '@angular/core';
import {TokenApiGatewayService} from "./gateways/token-api-gateway.service";
import {Token} from "../entity/token";

@Injectable()
export class TokenService {

  constructor(private tokenApiGateway: TokenApiGatewayService) {
  }

  async getToken(tokenString: string) {
    let user = null;
    let userData = await this.tokenApiGateway.getByTokenString(tokenString);
    let data = userData.data;
    if (data) {
      user = Token.fromData(data);
    }
    return user;
  }

  async tokenExists(tokenString: string): Promise<boolean> {
    let response = await this.tokenApiGateway.exists(tokenString);
    return response.data;
  }

  async tokenIsNotExpired(tokenString: string): Promise<boolean> {
    let response = await this.tokenApiGateway.isNotExpired(tokenString);
    return response.data;
  }

  async setTokenAsUsed(tokenString: string) {
    let response = await this.tokenApiGateway.setAsUsed(tokenString);
    return response.data;
  }
}
