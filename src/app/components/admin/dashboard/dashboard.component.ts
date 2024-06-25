import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Chart } from 'chart.js/auto';
import { CalendarComponent } from '../../dates/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GraphService } from '../../../shared/graph/graph.service';
import { AdminGraphComponent } from '../admin-graph/admin-graph.component';
import { Graph1Component } from '../graph1/graph1.component';
import { Report } from '../../../interfaces/graph-report';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CalendarComponent,CalendarModule,FormsModule, AdminGraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  selectedDate?:Date;
  yearRange?: string;
  reporte?:Report;
  pipe?:DatePipe;
  newUserChart?:any;
  screenViewChart?:any;
  constructor(private grphService:GraphService){
    const currentYear = new Date().getFullYear();
    this.yearRange = `${currentYear - 10}:${currentYear + 10}`;
    this.selectedDate = new Date();
    this.pipe=new DatePipe('en-US');
    this.grphService.getChartsData(this.pipe!.transform(this.selectedDate,'yyyy-MM-dd')!).subscribe((data:Report)=>{
      this.reporte=data;
      
    })
  }
  cambiarFecha(date:Date){
    this.grphService.getChartsData(this.pipe!.transform(date,'yyyy-MM-dd')!).subscribe((data:Report)=>{
      this.reporte=data;
      this.newUserChart.destroy();
      this.screenViewChart.destroy();
      this.RenderChart();
      this.Render2Chart();
    })
    
  }
  
  ngOnInit(): void {
    this.RenderChart();
    this.Render2Chart();
  }

  RenderChart(){
    this.newUserChart = new Chart("myChart", {

    type: 'line',
    data: {
      labels:this.reporte?.newUsers.map((user)=>user.date),
      datasets: [{
        label: 'Registers',
        data: this.reporte?.newUsers.map((user)=>user.value),
        // fill: false,
        borderColor: 'orange'
        // tension: 0.1
      }]
    },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  Render2Chart(){    
    this.screenViewChart = new Chart("graph2", {

    type: 'bar',
    data: {
      labels:this.reporte?.screenPageViews.map((user)=>user.date),
      datasets: [{
        label: 'Visits',
        data: this.reporte?.screenPageViews.map((user)=>user.value),
        // fill: false,

        backgroundColor: [
          'rgba(151, 49, 49)',
          'rgba(255, 125, 41)',
          'rgb(255, 175, 69)',
          'rgb(224, 167, 94)',
          'rgb(111, 78, 55)',
          'rgb(221, 118, 28)',
          'rgb(239, 156, 102)'
        ],
        borderColor: [
          'rgb(151, 49, 49)',
          'rgb(255, 159, 64)',
          'rgb(255, 175, 69)',
          'rgb(224, 167, 94)',
          'rgb(111, 78, 55)',
          'rgb(221, 118, 28)',
          'rgb(239, 156, 102)'
        ],
        borderWidth: 1
        // tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
    });
  }
}