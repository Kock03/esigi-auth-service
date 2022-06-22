import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackRef: MatSnackBarRef<SnackBarComponent>
  ) {}

  ngOnInit() {}

  close() {
    this.snackRef.dismiss();
  }
}
