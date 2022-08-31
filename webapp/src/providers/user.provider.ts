import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class UserProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }


    update(id: string | null, user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put(environment.AUTH_SERVICE_MS + 'users/:id', { id: id }, user)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.AUTH_SERVICE_MS + 'users')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findOne(users: string) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.AUTH_SERVICE_MS + 'users/find/:users', { users: users })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findActive(): Promise<any> {
        return new Promise((resolve, reject) => {
          this.apiGateway
            .get(environment.AUTH_SERVICE_MS + 'users/list/active')
            .subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
            }, reject);
        });
      }
    
      findByName(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
          this.apiGateway.post(environment.AUTH_SERVICE_MS + 'users/find/name', body)
            .subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
            }, reject);
        });
      }

      findInactive(): Promise<any> {
        return new Promise((resolve, reject) => {
          this.apiGateway
            .get(environment.AUTH_SERVICE_MS + 'users/list/inactive')
            .subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
            }, reject);
        });
      }
}