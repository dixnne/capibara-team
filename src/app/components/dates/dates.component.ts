import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.css'
})
export class DatesComponent {

}
