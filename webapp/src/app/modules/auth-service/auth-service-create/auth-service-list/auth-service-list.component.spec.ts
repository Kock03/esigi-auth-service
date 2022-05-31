import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceListComponent } from './auth-service-list.component';

describe('AuthServiceListComponent', () => {
  let component: AuthServiceListComponent;
  let fixture: ComponentFixture<AuthServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
