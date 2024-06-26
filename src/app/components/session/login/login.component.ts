import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../shared/user.service';

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
  sendCodeConfirmation=false;

  constructor(private service:UserRepositoryService, private router: Router, private userService: UserService) { }
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
  
  sendSMS(captcha:HTMLButtonElement): void {
    if(!this.phone.includes('+52')){
      this.phone='+52'+this.phone;
    }
    this.service.sendCode(this.phone,captcha,(result)=>{
      this.sendCodeConfirmation=result;
      if(result){
        Swal.fire({
          title: "SMS sent!",
          text: "We sent you a code.",
          icon: "success"
        });
      }else{
        Swal.fire({
          title: "Error!",
          text: "Couldn't send the SMS.",
          icon: "error"
        });
      }
    });

  }

  logIn(type: string): void {
    switch (type) {
      case 'email':
        this.emailLogin();
        break;
      case 'sms':
        this.loginPhone();
        break;
      default:
        break;
    }
  }

  loginPhone(){
    this.service.phoneConfirmationCode(this.code,(result)=>{
      if (result) {
        this.userService.getUsers().subscribe(res => {
          const user = res.find(u => u.data.phone == this.phone);
          if (user) {
            this.service.loginWithEandP(user.data.email, user.data.password, (result: boolean) => {
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
          } else {
            Swal.fire({
              title: "Stop there!",
              text: "There's no account related to that phone.",
              icon: "success"
            });
          }
        });
      } else {
        Swal.fire({
          title: "Sorry!",
          text: "Couldn't log in.",
          icon: "error"
        });
      }
    })
    
  }
}
