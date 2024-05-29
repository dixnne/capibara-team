import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PetsService } from '../../shared/pets.service';
import { Pet } from '../../interfaces/pet';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CalendarComponent } from '../dates/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DateInfo } from '../../interfaces/date';
import { DatesService } from '../../shared/dates.service';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    FormsModule,
    CalendarComponent,
    CommonModule,
    RouterLink,
    ToastModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css',
})
export class VisitComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date(2025, 4);
  @Input() pet!: Pet;
  @Input() date!: any;
  idx: number = 0;
  horario: string[] = [
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];
  petId: number = 0;
  dateID: number = 0;
  day: number = 0;
  month: number = 0;
  year: number = 0;
  hour!: string;
  name: string = '';
  phone: string = '';
  arr: DateInfo[] = [];
  newDate!: DateInfo;
  vali: boolean = false;
  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private dateService: DatesService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pet = petsService.getAPet(params['id']);
      this.idx = params['id'];
      this.petId = params['id'];
    });
  }

  takeDate(e: Date) {
    this.day = e.getUTCDate();
    this.month = e.getMonth() + 1;
    this.year = e.getUTCFullYear();
  }

  send() {
    let a = false;
    let title = '';
    let text = '';
    let confirmedTitle = '';
    let confirmedText = '';
    console.log('petID' + this.petId);
    console.log('day' + this.day);
    console.log('Month' + this.month);
    console.log('Year' + this.year);
    console.log('Hour' + this.hour);
    console.log('name is:' + this.name);
    console.log('phone is:' + this.phone);

    if ((this.validdata() == true)) {
      if ((this.validator() == true)) {
        this.newDate = {
          petId: this.petId,
          dateID: this.dateService.getNextId(),
          date: {
            day: this.day,
            month: this.month,
            year: this.year,
            hour: this.hour,
          },
          name: this.name,
          phone: this.phone
        }
        title = 'Meowwww';
        text = 'Date booked, you are one step closer to expand your family';
        confirmedTitle = '';
        confirmedText = '';
        this.dateService.addDate(this.newDate);
        this.successAlert(title, text);
        this.toast('success', title, text);
      } else {
        title = 'Rawwwr';
        text = 'Sorry, reserved date...';
        this.errorAlert(title, text);
      }
    }
  }
  validdata(): boolean {
    let aux: boolean = false;
    let auxd: boolean = false;
    let auxh: boolean = false;
    let auxi: boolean = false;
    console.log('validate init');
    if (this.day != 0) {
      auxd = true;
    }
    if (this.hour != '') {
      auxh = true;
    }
    if (this.name != '') {
      if (this.phone != '') {
        auxi = true;
      }
    }
    if (auxd && auxi && auxh) {
      aux = true;
      console.log('validate succes');
    }
    console.log("Validdata is " + aux);
    
    return aux;
  }
  validator(): boolean {
    let title = '';
    let text = '';
    console.log('validator init');
    this.arr = this.dateService.getPetDates(this.pet.id);
    if (this.arr.length != 0) {
      console.log(this.arr);
      for (let i in this.arr) {
        if (this.day == this.arr[i].date.day) {
          if (this.month == this.arr[i].date.month) {
            if (this.year == this.arr[i].date.year) {
              if (this.hour == this.arr[i].date.hour) {
                return false;
              } 
            } 
          } 
        } 
      }
      return true;
    } else {
      return true;
    }
  }
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
    }).then(() => {
      this.router.navigate(['/dates']);
    });
  }

  errorAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
    });
  }
}
