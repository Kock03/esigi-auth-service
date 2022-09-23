import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class ProfileProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    shortListProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.AUTHORIZATION_MS + 'profiles/short/list/profiles')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.AUTHORIZATION_MS + 'profiles')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findOne(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.AUTHORIZATION_MS + 'profiles/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findInactive(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.AUTHORIZATION_MS + 'profiles/list/incative')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findActive(): Promise<any> {
        return new Promise((resolve, reject) => {
          this.apiGateway
            .get(environment.AUTHORIZATION_MS + 'profiles/list/active')
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



    update(id: string | null, profile: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put(environment.AUTHORIZATION_MS + 'profiles/:id', { id: id }, profile)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    store(profile: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post(environment.AUTHORIZATION_MS + 'profiles', profile)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    destroy(profileId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .delete(environment.AUTHORIZATION_MS + 'profiles/' + profileId)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }
}
