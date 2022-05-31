import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/autorizacao/lista',

    pathMatch: 'full',
  },
  {
    path: 'autorizacao',
    loadChildren: () =>
      import('./modules/auth-service/auth-service-create/auth-service.module').then(
        m => m.AuthServiceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
