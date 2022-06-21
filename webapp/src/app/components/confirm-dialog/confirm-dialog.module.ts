import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule, MatButtonModule, CommonModule, FlexLayoutModule],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
})
export class ConfirmDialogModule {}
