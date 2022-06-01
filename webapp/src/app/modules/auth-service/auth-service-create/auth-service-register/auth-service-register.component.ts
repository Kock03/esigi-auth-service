import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  password() {
    this.show = !this.show;
}

  listCollaborator() {
    this.router.navigate(['autorizacao/lista']);
    sessionStorage.clear();
  }

  initForm() {
    this.collaboratorProfileForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      ddd: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      profile: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  next() {
    this.onChange.next(true);
  }

}
