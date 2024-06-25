import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../shared/mail.service';
import { MailFormat } from '../../interfaces/mail';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  mailData: MailFormat = {
    to: "",
    subject: "Comment",
    body: ""
  }

  constructor(private mailService: MailService) {}

  sendMail(): void {
    console.log(this.mailData);
    this.mailService.sendContactMail(this.mailData).subscribe(res => {
      if (res.success) {
        Swal.fire({
          title: "Mail sent!",
          text: "Thank you for contacting us.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Sorry...",
          text: "Couldn't send email.",
          icon: "error"
        });
      }
    });
  }
}
