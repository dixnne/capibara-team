import {
  Component,
  NgModule,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  date: Date = new Date();
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() invalidDates!: Date[];

  @Output() newDateEvent = new EventEmitter<Date>();

  dateChanged() {
    this.newDateEvent.emit(this.date);
  }

  ngOnInit() {
    this.newDateEvent.emit(this.date);
  }
}
