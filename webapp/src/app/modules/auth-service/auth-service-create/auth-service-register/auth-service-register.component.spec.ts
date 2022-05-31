import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceRegisterComponent } from './auth-service-register.component';

describe('AuthServiceRegisterComponent', () => {
  let component: AuthServiceRegisterComponent;
  let fixture: ComponentFixture<AuthServiceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthServiceRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthServiceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
