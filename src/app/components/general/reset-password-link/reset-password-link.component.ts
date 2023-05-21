import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password-link',
  templateUrl: './reset-password-link.component.html',
  styleUrls: ['./reset-password-link.component.css']
})
export class ResetPasswordLinkComponent {
  passwordAgain: string = '';
  password: string = '';

  onSubmit(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if(form.checkValidity() === false){
    }

    form.classList.add('was-validated');
  }
}
