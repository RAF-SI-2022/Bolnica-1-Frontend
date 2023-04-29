import { Component, Injectable, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarServiceService {


  constructor(private snackBar: MatSnackBar) {}
  openSuccessSnackBar(message: string, action: string = 'OK') {
    const config = new MatSnackBarConfig();
    config.panelClass = ['success-snackbar'];
    config.duration = 3000;
  
    const snackBarRef = this.snackBar.open(message, action, config);
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
  
  openWarningSnackBar(message: string, action: string = 'OK') {
    const config = new MatSnackBarConfig();
    config.panelClass = ['warning-snackbar'];
    config.duration = 3000;
  
    const snackBarRef = this.snackBar.open(message, action, config);
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
  
  openErrorSnackBar(message: string, action: string = 'OK') {
    const config = new MatSnackBarConfig();
    config.panelClass = ['error-snackbar'];
    config.duration = 3000;
  
    const snackBarRef = this.snackBar.open(message, action, config);
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
}
