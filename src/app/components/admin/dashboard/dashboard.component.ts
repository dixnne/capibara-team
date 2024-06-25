import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminGraphComponent } from '../admin-graph/admin-graph.component';
import { Graph1Component } from '../graph1/graph1.component';
import { CalendarComponent } from '../../dates/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GraphService } from '../../../shared/graph/graph.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, AdminGraphComponent, Graph1Component,CalendarComponent,CalendarModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedDate?:Date;
  yearRange?: string;
  constructor(private grphService:GraphService){
    const currentYear = new Date().getFullYear();
    this.yearRange = `${currentYear - 10}:${currentYear + 10}`; // Ajusta el rango de años según sea necesario
  }
  cambiarFecha(date:Date){
    let pipe=new DatePipe('en-US');
    this.grphService.getChartsData(pipe.transform(date,'yyyy-MM-dd')!).subscribe((data:any)=>{
      console.log(data);
    })
  }
}
