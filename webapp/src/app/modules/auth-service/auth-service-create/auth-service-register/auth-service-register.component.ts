import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-service-register',
  templateUrl: './auth-service-register.component.html',
  styleUrls: ['./auth-service-register.component.scss']
})
export class AuthServiceRegisterComponent implements OnInit {
  @Input('form') collaboratorProfileForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.collaboratorProfileForm = this.fb.group({
      office: [null, Validators.required],
      admissionDate: [null, Validators.required],
      active: [null, Validators.required],
      ddd: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  next() {
    this.onChange.next(true);
  }

}
