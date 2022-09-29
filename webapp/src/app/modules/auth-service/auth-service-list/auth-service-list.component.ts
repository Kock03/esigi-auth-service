import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ProfileProvider } from 'src/providers/profile.provider';
import { UserProvider } from 'src/providers/user.provider';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { AuthServiceCreateComponent } from '../auth-service-create/auth-service-create.component';

@Component({
  selector: 'app-auth-service-list',
  templateUrl: './auth-service-list.component.html',
  styleUrls: ['./auth-service-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

  users!: any[];
  filteredUserList: any;
  params: string = '';
  select: number = 1;

  constructor(
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private profileProvider: ProfileProvider,
    private userProvider: UserProvider,
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUserList();
    this.initFilter();
  }

  async selectList(ev: any) {
    this.select = ev.value;
    this.searchUser();
  }

  async searchUser() {
    const data = {
      firstName: this.params,
      status: this.select,
    };
    try {
      this.filteredUserList = this.users = await this.userProvider.findByName(
        data
      );
    } catch (error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredUserList = this.users.filter((user) => {
          user.firstName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase());
        });
        this.params = this.filter.nativeElement.value;
        this.searchUser();
        if (this.filter.nativeElement.value === '') {
          this.getUserList();
        }
      });
  }

  createCollaborator() {
    this.router.navigate(['autorizacao/novo']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthServiceCreateComponent, {
      width: '800px',
      height: '490px',
    });
    dialogRef.afterClosed().subscribe((permission) => {
      if (permission) {
        this.getUserList();
      }
    });
  }

  async getUserList() {
    this.filteredUserList = this.users = await this.userProvider.findAll();
  }

  goHome(port: number): void {
    location.replace(`http://localhost:${port}/portal`);
  }
}
