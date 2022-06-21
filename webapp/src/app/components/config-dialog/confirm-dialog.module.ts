import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule, MatButtonModule, CommonModule, FlexLayoutModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: translateFactory,
      deps: [HttpClient],
    },
  }),],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
})
export class ConfirmDialogModule { }

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}