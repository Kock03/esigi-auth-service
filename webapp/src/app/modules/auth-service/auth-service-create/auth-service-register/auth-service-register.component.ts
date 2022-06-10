import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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

export interface IPhone {
  id: string;
  Phone: {
    phoneNumber: string;
    ddd: string;
  };

}
export interface IUser {
  id: string
}

@Component({
  selector: 'app-auth-service-register',
  templateUrl: './auth-service-register.component.html',
  styleUrls: ['./auth-service-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthServiceRegisterComponent implements OnInit {
  @Input('form') collaboratorProfileForm!: FormGroup;
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

  profileControl = new FormControl();
  profile!: IProfile;
  profiles!: IProfile[] | any[];
  profileValid: boolean = false;
  filteredProfileList: any;
  filteredProfiles?: any[];

  userControl = new FormControl();
  userId!: string | null;
  users!: IUser[] | any[];




  constructor(
    private fb: FormBuilder,
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private profileProvider: ProfileProvider,
    private userProvider: UserProvider
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCollaboratorList();
    this.getProfileList();
    this.initFilter();
    this.initFilterProfile();
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();
    // await this.collaboratorProvider.findCollaborator()
  }

  async getProfileList() {
    this.filteredProfileList = this.profiles =
      await this.profileProvider.shortListProfile();
  }

  async saveCollaborator() {
    // this.collaboratorProfileForm.controls['password'].getRawValue()
    let data = this.collaboratorProfileForm.getRawValue();
    console.log("🚀 ~ file: auth-service-register.component.ts ~ line 82 ~ AuthServiceRegisterComponent ~ saveCollaborator ~ data", data)
    try {
      const job = await this.userProvider.update(
        data.userId, data.password
      );
    }
    catch (err) {
      // const user = await 
    }
  }


  async getUserId(collabotatorId: string) {
    let data = this.collaboratorProfileForm.getRawValue();
    this.users == await this.userProvider.findOne(
      collabotatorId
    )
    console.log("🚀 ~ file: auth-service-register.component.ts ~ line 117 ~ AuthServiceRegisterComponent ~ getUserId ~ users", this.users)
  }

  passwordShow() {
    this.show = !this.show;
  }

  listCollaborator() {
    this.router.navigate(['autorizacao/lista']);
    sessionStorage.clear();
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


  initForm() {
    this.collaboratorProfileForm = this.fb.group({
      collaboratorId: [null],
      email: [null],
      phoneNumber: [null],
      ddd: [null],
      Permission: [null],
      login: [null],
      password: [null],
      userId: [null],

    });

    this.collaboratorControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        console.log("🚀 ~ file: auth-service-register.component.ts ~ line 185 ~ AuthServiceRegisterComponent ~ this.collaboratorControl.valueChanges.subscribe ~ res", res)
        this.collaboratorProfileForm.controls['collaboratorId'].setValue(res.id, {
          emitEvent: true,
        });
        this.getUserId(res.id)
        
        this.collaboratorProfileForm.controls['email'].setValue(res.email, {
          emitEvent: true,
        });
        this.collaboratorProfileForm.controls['ddd'].setValue(res.Phone.ddd, {
          emitEvent: true,
        });
        this.collaboratorProfileForm.controls['phoneNumber'].setValue(res.Phone.phoneNumber, {
          emitEvent: true,
        });
        this.collaboratorProfileForm.controls['login'].setValue(res.login, {
          emitEvent: true,
        });
      }
    });

    this.profileControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.collaboratorProfileForm.controls['Permission'].setValue({ id: res.id }, {
          emitEvent: true,
        });
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

}
