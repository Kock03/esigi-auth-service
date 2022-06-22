import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorProvider {

  constructor(private apiGateway: ApiGateway) { }

  ngOnInit(): void { }

  shortListCollaborators(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/short/list/collaborators')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  shortListCollaboratorsPermission(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/short/list/permission/collaborators')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
  
  findCollaborator(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/info/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });   
  }

  findByName(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.COLLABORATOR_MS + `collaborators/find/name?${query}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  create(id: string | null, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.COLLABORATOR_MS + 'collaborators/permission/:id', { id: id }, body)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });   
  }

  destroy(collaboratorId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.apiGateway
            .delete(environment.COLLABORATOR_MS + 'profiles/' + collaboratorId)
            .subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
    });
}

  
}
