import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.css',
})
export class DatesComponent {
<<<<<<< HEAD
  constructor(private messageService: MessageService) {}

  //type: success, warn, error, info
  toast(type: string, heading: string, text: string): void {
    this.messageService.add({ severity: type, summary: heading, detail: text });
  }

  confirmAlert(
    title: string,
    text: string,
    confirmedTitle: string,
    confirmedText: string
  ): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: confirmedTitle,
          text: confirmedText,
          icon: 'success',
        });
      }
    });
  }

  successAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
    });
  }

  errorAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
    });
  }
=======
>>>>>>> 8237170fd45fce8c004e305d61adb501193e4412
}
