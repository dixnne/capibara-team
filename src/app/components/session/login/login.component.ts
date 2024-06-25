import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  phone!: string;
  code!: string;

  constructor(private service:UserRepositoryService) { }
  emailLogin(): void {
    this.service.loginWithEandP(this.email, this.password, (result: boolean) => {
      if (result) {
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    });
  }
  
  sendSMS(captchaButton:HTMLButtonElement): void {
    if (this.phone!=""){
      this.phone = "+52" + this.phone;
      this.service.sendCode(this.phone, captchaButton, (result: boolean) => {
        if (result) {
          console.log('Código enviado con éxito');
        } else {
          console.log('Error al enviar el código');
        }
      });
    }
  }

  smsConfirmation(): void {
    this.service.phoneConfirmationCode(this.code, (result: boolean) => {
      if (result) {
        console.log('Usuario verificado con éxito');
      } else {
        console.log('Error al verificar el código');
      }
    });
  }

  logIn(type: string): void {
    switch (type) {
      case 'email':
        this.emailLogin();
        break;
      case 'sms':
        this.smsConfirmation();
        break;
      default:
        break;
    }
  }
}
