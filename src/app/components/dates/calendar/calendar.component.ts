import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  date: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

  @Output() newDateEvent = new EventEmitter<Date>();

  dateChanged() {
    this.newDateEvent.emit(this.date);
  }
}
