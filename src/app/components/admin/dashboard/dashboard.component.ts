import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminGraphComponent } from '../admin-graph/admin-graph.component';
import { Graph1Component } from '../graph1/graph1.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, AdminGraphComponent, Graph1Component],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  ngOnInit(): void {
    this.RenderChart();
    this.Render2Chart();
  }

  RenderChart(){    
    const myChart = new Chart("myChart", {

    type: 'line',
    data: {
      labels:['Monday', 'Tuesday', 'Wednesday', 
        'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Registers',
        data: [65, 59, 80, 81, 56, 55, 40, 150],
        // fill: false,
        borderColor: 'rgb(255, 199, 0)',
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
    const myChart = new Chart("graph2", {

    type: 'bar',
    data: {
      labels:['Monday', 'Tuesday', 'Wednesday', 
        'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Visits',
        data: [65, 59, 80, 81, 56, 55, 40, 200],
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
        borderWidth: 1,
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