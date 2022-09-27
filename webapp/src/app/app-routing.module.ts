import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenComponent } from './components/validate-token/validate-token.component';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/autorizacao/lista',

    pathMatch: 'full',
  },
  {
    path: 'validate/:id',
    component: ValidateTokenComponent,
  },
  {
    path: 'autorizacao',
    loadChildren: () =>
      import('./modules/auth-service/auth-service.module').then(
        m => m.AuthServiceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
