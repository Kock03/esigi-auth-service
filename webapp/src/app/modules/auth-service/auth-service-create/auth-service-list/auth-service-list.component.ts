import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
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

  @ViewChild('filter', {static: true}) filter!: ElementRef;

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

  async ngOnInit(): Promise<void> {
    this.getCollaboratorList();
    this.getProfileList();
    // this.getUserList();
    // this.initFilter();
  }

  async selectList(ev: any) {
    if (ev.value == 1) {
      return (this.filteredProfileList = this.profiles =
        await this.profileProvider.findAll());
    }
    if (ev.value == 2) {
      return (this.filteredProfileList = this.profiles =
        await this.profileProvider.findActive());
    }
    if (ev.value == 3) {
      return (this.filteredProfileList = this.profiles =
        await this.profileProvider.findInactive());
    }
  }

  async searchCollaborators(query?: string) {
    try {
      this.collaborators = await this.collaboratorProvider.findByName(query);
      console.log(this.collaborators)
    } catch(error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(debounceTime(200), distinctUntilChanged())

    .subscribe((res) => {
      this.filteredCollaboratorList.data = this.collaborators.filter(
        (collaborator) =>
        collaborator.firstNameCorporateName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
      )
      const params = `firstNameCorporateName=${this.filter.nativeElement.value}`;
      this.searchCollaborators(params);
    });
  }

  createCollaborator() {
    this.router.navigate(['autorizacao/novo']);
  }

  // async deleteCollaborator(collaboratorId: any) {
  //   const collaborators = await this.collaboratorProvider.destroy(
  //     collaboratorId
  //   );
  //   this.getCollaboratorList();
  // }

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
