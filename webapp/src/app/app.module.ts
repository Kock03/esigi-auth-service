import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AuthServiceCreateComponent } from './modules/auth-service/auth-service-create/auth-service-create.component';
import { AuthServiceListComponent } from './modules/auth-service/auth-service-create/auth-service-list/auth-service-list.component';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SnackBarService } from 'src/services/snackbar.service';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';

@NgModule({
  declarations: [AppComponent, SnackBarComponent],
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient],
      },
    }),
    MatDividerModule,
    HttpClientModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [SnackBarService, ConfirmDialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
