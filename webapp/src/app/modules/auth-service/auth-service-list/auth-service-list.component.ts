import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ProfileProvider } from 'src/providers/profile.provider';
import { UserProvider } from 'src/providers/user.provider';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { AuthServiceCreateComponent } from '../auth-service-create/auth-service-create.component';

export interface ICollaborator {
  id: string;
  firstNameCorporateName: string;
  lastNameCorporateName: string;
  email: string;
  login: string;
  password: string;
  office: string;
}


export interface IProfile {
  id: string;
  name: string;
}

export interface IUser {
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

  @ViewChild('filter', { static: true }) filter!: ElementRef;

  displayedCollaborator: string[] = [
    'collaborator',
    'permissions',
    'status',
    'icon',
  ];

  Collaborator!: ICollaborator;
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
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUserList();
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
    } catch (error) {
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

  openDialog() {
    const dialogRef = this.dialog.open(AuthServiceCreateComponent, {
      width: '700px',
      height: '550px',
    });
    dialogRef.afterClosed().subscribe(permission => {
      if (permission) {
        this.getUserList();
      }
    });
  }

  async getUserList() {
    this.filteredUserList = this.users =
      await this.userProvider.findAll();
  }

}
