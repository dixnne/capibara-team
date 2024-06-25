import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private service:UserRepositoryService) { }
  
  user: User = {
    id: "",
    data: {
      dates: [],
      email: "",
      image: "",
      password: "",
      name: {
        username: "",
        firstname: "",
        lastname: ""
      },
      phone: ""
    }
  }
  confirmPassword: string = "";
  passwordAlert: string = "Passwords don't match";

  signUp(): void {
    this.service.register(this.user.data.email, this.user.data.password, (result: boolean) => {
      if (result) {
        console.log('Sign up successful');
      } else {
        console.log('Sign up failed');
      }
    });
    
  }
}
