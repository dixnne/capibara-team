import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private service:UserRepositoryService, private router: Router) { }
  emailLogin(): void {
    this.service.loginWithEandP(this.email, this.password, (result: boolean) => {
      if (result) {
        Swal.fire({
          title: "Helloooow!",
          text: "Successfully logged in.",
          icon: "success"
        }).then(() => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        });
      } else {
        Swal.fire({
          title: "Sorry!",
          text: "Couldn't log in.",
          icon: "error"
        });
      }
    });
  }
  
  sendSMS(): void {

  }

  logIn(type: string): void {
    switch (type) {
      case 'email':
        this.emailLogin();
        break;
      case 'sms':
        
        break;
      default:
        break;
    }
  }
}
