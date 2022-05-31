import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceCreateComponent } from './auth-service-create.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthServiceListComponent } from './auth-service-list/auth-service-list.component';

const routes: Routes = [
 {
   path: '/lista', 
   component: AuthServiceListComponent
 }
]


@NgModule({
  declarations: [
    AuthServiceCreateComponent,
    AuthServiceListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthServiceModule { }
