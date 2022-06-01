import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceCreateComponent } from './auth-service-create.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthServiceListComponent } from './auth-service-list/auth-service-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthServiceRegisterComponent } from './auth-service-register/auth-service-register.component';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'lista',
    component: AuthServiceListComponent,
  },
  {
    path: 'novo',
    component: AuthServiceRegisterComponent,
  },
];

@NgModule({
  declarations: [
    AuthServiceCreateComponent,
    AuthServiceListComponent,
    AuthServiceRegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AuthServiceListComponent, AuthServiceRegisterComponent],
})
export class AuthServiceModule {}
