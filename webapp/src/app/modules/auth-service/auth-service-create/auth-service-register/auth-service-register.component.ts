import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ProfileProvider } from 'src/providers/profile.provider';


export interface ICollaborator {
  id: string;
  firstNameCorporateName: string;
  lastNameCorporateName: string;
}

export interface IProfile {
  id: string;
  name: string;
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
  filteredCollaborators?: any[];
  profileControl = new FormControl();
  profile!: IProfile;
  profileValid: boolean = false;
  profiles!: IProfile[] | any[];
  filteredProfileList: any;
  filteredProfiles?: any[];
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private profileProvider: ProfileProvider,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCollaboratorList();
    this.getProfileList();
    this.initFilter();
    this.initFilterProfile()
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();
  }

  async getProfileList() {
    this.filteredProfileList = this.profiles =
      await this.profileProvider.shortListProfile();
  }


  password() {
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
      email: [null, [Validators.required, Validators.email]],
      ddd: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      name: [null],
      login: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.collaboratorControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.collaboratorProfileForm.controls['collaboratorId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });

    this.profileControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.collaboratorProfileForm.controls['name'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

}
