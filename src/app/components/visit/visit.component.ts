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
import { UserRepositoryService } from '../../shared/user/user-repository.service';
import { UserService } from '../../shared/user.service';
import { MailFormat } from '../../interfaces/mail';
import { MailService } from '../../shared/mail.service';

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
  idx: string = "";
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
  petId: string = "";
  dateId: string = "";
  day: number = 0;
  month: number = 0;
  year: number = 0;
  hour!: string;
  arr: DateInfo[] = [];
  newDate!: DateInfo;
  vali: boolean = false;
  imgURL: string = "https://capibara.losnarvaez.com/";
  authenticated: boolean = false;
  uid: string = "";
  mailData: MailFormat = {
    to: "",
    subject: "Date booked on Capibara Team",
    body: "Hello, your date with "
  }
  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private dateService: DatesService,
    private router: Router,
    private userRepoService: UserRepositoryService,
    private userService: UserService,
    private mailService: MailService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      petsService.getPet(params['id']).subscribe(res => {
        this.pet = res;
        this.dateService.getDates().subscribe(r => {
          this.arr = r.filter(d => d.data.petId == this.pet.id);
        });
      });
      this.idx = params['id'];
      this.petId = params['id'];
    });
    this.authenticated = this.userRepoService.isLoggedIn();
    if (!this.authenticated) {
      Swal.fire({
        title: "Stop right there!",
        text: "You have to log in in order to book a date.",
        icon: "error"
      }).then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      const u = this.userRepoService.getUser();
      this.mailData.to = u?.email || u?.uid || "";
      this.userService.getUserByEmail(u?.email || u?.uid || "").subscribe(res => {
        this.uid = res[0].id;
      });
    }
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

    if ((this.validdata() == true)) {
      if ((this.validator() == true)) {
        this.newDate = {
          id: "",
          data: {
            petId: this.petId,
            userId: "",
            date: {
              day: this.day,
              month: this.month,
              year: this.year,
              hour: this.hour,
            }
          }
        }
        this.petsService.getPet(this.newDate.data.petId).subscribe(res => {
          this.mailData.body += res.data.name;
          title = 'Meowwww';
          text = 'Date booked, you are one step closer to expand your family, and we have sent you a mail with the information.';
          confirmedTitle = '';
          confirmedText = '';
          this.newDate.data.userId = this.uid;
          this.dateService.addDate(this.newDate).subscribe(re => {
            this.mailData.body += " is booked on " + this.newDate.data.date.day + "/" + this.newDate.data.date.month + "/" + this.newDate.data.date.year + " at " + this.newDate.data.date.hour;
            this.mailService.sendDateMail(this.mailData).subscribe(r => {
              if (r.success) {
                this.successAlert(title, text);
                this.toast('success', title, text);
              } else {
                title = 'Sorry...';
                text = 'Could not send yo the email with your date information.';
                this.errorAlert(title, text);
              }
            });
          });
        })
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
    console.log('validate init');
    if (this.day != 0) {
      auxd = true;
    }
    if (this.hour != '') {
      auxh = true;
    }
    if (auxd && auxh) {
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
    if (this.arr.length != 0) {
      console.log(this.arr);
      for (let i in this.arr) {
        if (this.day == this.arr[i].data.date.day) {
          if (this.month == this.arr[i].data.date.month) {
            if (this.year == this.arr[i].data.date.year) {
              if (this.hour == this.arr[i].data.date.hour) {
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
