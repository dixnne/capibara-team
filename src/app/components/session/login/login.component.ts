import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email ?: string;
  password ?: string;
  code ?: string;
  
  sendSMS(): void {

  }

  logIn(type: string): void {
    switch (type) {
      case 'email':
        
        break;
      case 'sms':
        
        break;
      default:
        break;
    }
  }
}
