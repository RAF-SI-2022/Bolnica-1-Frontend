import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {

constructor(private authService: AuthService, private router: Router){}

  newPassword: string = '';
  oldPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  resetPasswordMessage: string = '';

  onSubmit() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    
    if(form.checkValidity() === false){
      form.classList.add('was-validated');
        return;
    }

    this.authService.resetPassword(this.oldPassword, this.newPassword).subscribe(result => {
        this.resetPasswordMessage = result.message;
        console.log("message " + this.resetPasswordMessage);
        this.authService.resetPasswordConfirmed(this.resetPasswordMessage).subscribe(res => {
            this.errorMessage = '';
            this.successMessage = 'Lozinka uspesno promenjena';
            setTimeout(() => {
              this.router.navigate(['/profile']);
            }, 3000);
        });
    }, error => {
        this.successMessage = '';
        this.errorMessage = "Lozinka nije ispravna"
    });
  }
}
