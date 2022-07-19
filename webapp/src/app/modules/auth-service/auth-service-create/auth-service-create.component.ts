import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ProfileProvider } from 'src/providers/profile.provider';
import { UserProvider } from 'src/providers/user.provider';
import { SnackBarService } from 'src/services/snackbar.service';


export interface ICollaborator {
  id: string;
  firstNameCorporateName: string;
  lastNameCorporateName: string;
  email: string;
  password: string;
}

export interface IProfile {
  id: string;
  name: string;
}

export interface IPhone {
  id: string;
  Phone: {
    phoneNumber: string;
    ddd: string;
  };

}
export interface IUser {
  id: string
  login: string,
}

@Component({
  selector: 'app-auth-service-create',
  templateUrl: './auth-service-create.component.html',
  styleUrls: ['./auth-service-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthServiceCreateComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  show: boolean = false
  collaboratorControl = new FormControl();
  collaborator!: ICollaborator;
  collaborators!: ICollaborator[] | any[];
  collaboratorValid: boolean = false;
  filteredCollaboratorList: any;
  collaboratorId!: string | null;
  filteredCollaborators?: any[];
  login!: string | null;
  collaboratorProfileForm!: FormGroup;
  profileControl = new FormControl();
  profile!: IProfile;
  profiles!: IProfile[] | any[];
  profileValid: boolean = false;
  filteredProfileList: any;
  filteredProfiles?: any[];
  profileEmpty: boolean = true;
  userControl = new FormControl();
  userId!: any;
  dataUser: any;
  user!: IUser;
  log!: any


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private profileProvider: ProfileProvider,
    private userProvider: UserProvider,
    private snackbarService: SnackBarService,
    public dialogRef: MatDialogRef<AuthServiceCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCollaboratorList();
    this.getProfileList();
    this.initFilter();
    this.initFilterProfile();
    console.log(this.profileControl)
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();
  }

  async getProfileList() {
    this.filteredProfileList = this.profiles =
      await this.profileProvider.shortListProfile();
  }

  async saveCollaborator() {
    let data = this.collaboratorProfileForm.getRawValue();
    let id = data.profileId.id;
    if (data.password === null) {
      try {
        const user = await this.userProvider.update(
          this.userId, { profileId: id }
        );
        this.router.navigate(['autorizacao/lista']);
        this.snackbarService.successMessage('Informações alteradas Com Sucesso');
      }
      catch (err) {
        this.snackbarService.showError('Campos inválidos');
        console.log(err)
      }
    } else if (id !== null) {
      try {
        const user = await this.userProvider.update(
          this.userId, { password: data.password, profileId: id }
        );
        this.router.navigate(['autorizacao/lista']);
        this.snackbarService.successMessage('Informações alteradas Com Sucesso');
      }
      catch (err) {
        this.snackbarService.showError('Campos inválidos');
        console.log(err)
      }
    } else {
      this.snackbarService.showError('Campos inválidos');

    }

  }

  //Essa função tem como objetivo subscrever o input de login, ele pega o res.id do collaboratorForm
  // dentro do initForm, onde é feita a chamada do método, e passa o login direto no controlls setando o setValue 
  // com o valor retornado do microserviço
  getUserId(collabotatorId: string) {

    return this.userProvider.findOne(
      collabotatorId
    ).then((res: any) => {

      this.userId = res[0].id;
      this.log = res[0].login;
      console.log(this.log);
      this.collaboratorProfileForm.controls['login'].setValue(this.log)
      this.collaboratorProfileForm.controls['userId'].setValue(this.userId)
      console.log(this.userId)
    });

  }

  passwordShow() {
    this.show = !this.show;
  }

  private initFilter() {
    this.collaboratorControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filter(res);
        if (res && res.id) {
          this.collaboratorValid = true;
        } else {
          this.collaboratorValid = false;
        }
      });
  }

  private initFilterProfile() {
    this.profileControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterProfile(res);
        if (res && res.id) {
          this.profileValid = true;
        } else {
          this.profileValid = false;
        }
      });
  }


  displayFn(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }

  displayFnProfile(user: any): string {
    if (typeof user === 'string' && this.profiles) {
      return this.profiles.find(
        (profile) => profile.id === user
      );
    }
    return user && user.name ? user.name : '';
  }

  private async _filter(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findByName(
      params
    );
  }

  private async _filterProfile(name: string): Promise<void> {
    const params = `name=${name}`;
    this.filteredProfiles = await this.profileProvider.findByName(
      params
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  initForm() {
    this.collaboratorProfileForm = this.fb.group({
      collaboratorId: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      ddd: ['', Validators.required],
      profileId: [''],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      userId: ['', Validators.required],

    });

    this.collaboratorControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.getUserId(res.id)

        this.collaboratorProfileForm.controls['collaboratorId'].setValue(res.id, {
          emitEvent: true,
        });

        this.collaboratorProfileForm.controls['email'].setValue(res.email, {
          emitEvent: true,
        });
        this.collaboratorProfileForm.controls['ddd'].setValue(res.Phone.ddd, {
          emitEvent: true,
        });
        this.collaboratorProfileForm.controls['phoneNumber'].setValue(res.Phone.phoneNumber, {
          emitEvent: true,
        });
      }
    });

    this.profileControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.collaboratorProfileForm.controls['profileId'].setValue({ id: res.id }, {
          emitEvent: true,
        });
        if (res.id !== '') {
          this.profileEmpty = false;
        }
        console.log(res);
      }
    });


    if (this.profileValid = true) {
      this.collaboratorProfileForm.controls['password'].removeValidators(Validators.required);
    }

  }


  next() {
    this.onChange.next(true);
  }

}
