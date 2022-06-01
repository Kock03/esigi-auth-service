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

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  listCollaborator() {
    this.router.navigate(['autorizacao/lista']);
    sessionStorage.clear();
  }

  initForm() {
    this.collaboratorProfileForm = this.fb.group({
      office: [null, Validators.required],
      admissionDate: [null, Validators.required],
      active: [null, Validators.required],
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
