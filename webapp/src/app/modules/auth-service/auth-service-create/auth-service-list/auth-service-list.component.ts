import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ProfileProvider } from 'src/providers/profile.provider';
import { UserProvider } from 'src/providers/user.provider';

export interface ICollaborator {
  id: string;
  firstNameCorporateName: string;
  lastNameCorporateName: string;
  email: string;
  login: string;
  password: string;
}


export interface IProfile {
  id: string;
  name: string;
}

export interface IUser{
  id: string
  userId: string
}

@Component({
  selector: 'app-auth-service-list',
  templateUrl: './auth-service-list.component.html',
  styleUrls: ['./auth-service-list.component.scss']
})
export class AuthServiceListComponent implements OnInit {
  filteredCollaboratorList = new MatTableDataSource();

  displayedCollaborator: string[] = [
    'collaborator',
    'permissions',
    'status',
    'icon',
  ];

  Collaborator: any;
  collaborators!: ICollaborator[] | any[];

  profiles!: IProfile[] | any[];
  filteredProfileList: any;
  filteredProfiles?: any[]; 

  users!: IUser[] | any[];
  filteredUserList: any;

  constructor(
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private profileProvider: ProfileProvider,
    private userProvider: UserProvider,
  ) { }

  ngOnInit(): void {
    this.getCollaboratorList();
    this.getProfileList();
    // this.getUserList();
  }

  createCollaborator() {
    this.router.navigate(['autorizacao/novo']);
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();
  }

  async getProfileList() {
    this.filteredProfileList = this.profiles =
      await this.profileProvider.shortListProfile();
  }

  // async getUserList(){
  //   this.filteredUserList = this.users =
  //     await this.userProvider.shortListUser()
  // }

}
