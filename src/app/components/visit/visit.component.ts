import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetsService } from '../../shared/pets.service';
import { Pet } from '../../interfaces/pet';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '../dates/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [StepperModule, ButtonModule, FormsModule, CalendarComponent, CommonModule, RouterLink, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css',
})
export class VisitComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date(2025, 4)
  @Input() pet!: Pet;
  idx: number = 0;
  date2: Date | undefined;
  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pet = petsService.getAPet(params['id']);
      this.idx = params['id'];
    });
  }

  //type: success, warn, error, info
  toast(type: string, heading: string, text: string): void { 
    this.messageService.add({severity: type, summary: heading, detail: text});
  }

  confirmAlert(title: string, text: string, confirmedTitle: string, confirmedText: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: confirmedTitle,
          text: confirmedText,
          icon: "success"
        });
      }
    });
  }

  successAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: "success"
    });
  }

  errorAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: "error"
    });
  }
}
