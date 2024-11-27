import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarData } from '@rumikub/frontend-models';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  public openNewAlert(error: string, errorMessage?: string) {
    this._snackBar.openFromComponent<AlertComponent, SnackBarData>(AlertComponent, {
      data: { title: error, text: errorMessage },
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  public openNewNotification(title: string, additionalText?: string) {
    this._snackBar.openFromComponent<AlertComponent, SnackBarData>(AlertComponent, {
      data: { title, text: additionalText },
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
