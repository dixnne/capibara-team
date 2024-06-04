import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
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
    
  }
}
