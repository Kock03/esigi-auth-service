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

    findOne (collaborator: string){
    return new Promise((resolve, reject) => {
        this.apiGateway
            .get(environment.AUTH_SERVICE_MS + 'users/find/:collaboratorId', { collaboratorId: collaborator })
            .subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
    });
}
}