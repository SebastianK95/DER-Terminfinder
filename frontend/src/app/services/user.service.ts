import {Injectable} from '@angular/core';
import {UserApiGatewayService} from './gateways/user-api-gateway.service';
import {User} from '../entity/user';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {

    constructor(private userApiGateway: UserApiGatewayService) {
    }

    async getUser(filter = {}) {
        let user = null;
        let userData = await this.userApiGateway.getUser(filter);
        let data = userData.data[0];
        if (data) {
            user = User.fromData(data);
        }
        return user;
    }

    async getById(id: number): Promise<User> {
        let user = null;
        let userData = await this.userApiGateway.getById(id);
        let data = userData.data[0];
        if (data) {
            user = User.fromData(data);
        }
        return user;
    }

    async getAll(): Promise<User[]> {
        let userData = await this.userApiGateway.getByParameters(null, ['id', 'name', 'email', 'password']);
        let data = userData.data;
        let users = [];
        for (let userIndex = 0; userIndex < data.length; userIndex++) {
            users.push(User.fromData(data[userIndex]))
        }
        return users;
    }

    async createUser(name: string, email: string, password: string): Promise<boolean> {
        const HASH = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        let user = User.fromNameEmailPassword(name, email, HASH);
        let response = await this.userApiGateway.create(user);
        return response.data;
    }

    async deleteUser(id: number): Promise<boolean> {
        let response = await this.userApiGateway.delete(id);
        return response.data;
    }

    async userExists(id: number): Promise<boolean> {
        let response = await this.userApiGateway.exists(id);
        return response.data;
    }

    async userExistsByEmail(email: string): Promise<boolean> {
        let response = await this.userApiGateway.existsByEmail(email);
        return response.data;
    }

    async userIsAuthorizedById(id: number, password: string): Promise<boolean> {
        const HASH = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        let response = await this.userApiGateway.userIsAuthorizedById(id, HASH);
        return response.data;
    }

    async userIsAuthorizedByEmail(email: string, password: string): Promise<boolean> {
        const HASH = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        let response = await this.userApiGateway.userIsAuthorizedByEmail(email, HASH);
        // let response = await this.userApiGateway.userIsAuthorizedByEmail(email, password);
        return response.data;
    }

    async updateUsername(id: number, name: string): Promise<boolean> {
        let response = await this.userApiGateway.updateUsername(id, name);
        return response.data;
    }

    async updatePassword(id: number, password: string): Promise<boolean> {
        const HASH = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        let response = await this.userApiGateway.updatePassword(id, HASH);
        return response.data;
    }

    async resetPassword(email: string) {
        let response = await this.userApiGateway.resetPassword(email);
        return response.data;
    }

    async userDoLogout(request: any): Promise<boolean> {
        let response = await this.userApiGateway.userDoLogout(request);
        return response.data;
    }
}
