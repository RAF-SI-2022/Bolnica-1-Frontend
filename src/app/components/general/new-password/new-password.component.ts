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
        if(!this.validateFields())
            return;

        this.authService.resetPassword(this.oldPassword, this.newPassword).subscribe(result => {
            this.resetPasswordMessage = result.message;
            console.log("message " + this.resetPasswordMessage);
            this.authService.resetPasswordConfirmed(this.resetPasswordMessage).subscribe(res => {
                this.showSuccessMessageAndRedirect("Uspesno promenjena lozinka!", "/profile");
            });
        }, error => {
            this.successMessage = '';
            this.errorMessage = "Lozinka nije ispravna"
        });
    }


     /**
     * Shows success message on screen and redirects
     * @param message Success message to show
     * @param redirect Redirects to provided page
     */
     showSuccessMessageAndRedirect(message: string, redirect: string): void {
        this.errorMessage = '';
        this.successMessage = message;
        setTimeout(() => {
            this.router.navigate([redirect]);
        }, 3000);
    }

    validateFields(): boolean {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.classList.add('was-validated');
        if(form.checkValidity() === false){
            return false;
        }
        return true;
    }
}
