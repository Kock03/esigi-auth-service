import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceCreateComponent } from './auth-service-create.component';

describe('AuthServiceCreateComponent', () => {
  let component: AuthServiceCreateComponent;
  let fixture: ComponentFixture<AuthServiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthServiceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
