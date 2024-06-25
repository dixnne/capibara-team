import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [],
  templateUrl: './graph1.component.html',
  styleUrl: './graph1.component.css'
})
export class Graph1Component implements OnInit {
  
  public chart: Chart | undefined;
  
  ngOnInit(): void {
    // const labels = Utils.months({count: 7});
    const data = {
      labels:['Monday', 'Tuesday', 'Wednesday', 
        'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Visits',
        data: [65, 59, 80, 81, 56, 55, 40, 200],
        fill: false,

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


        tension: 0.1
      }]
    };

    this.chart = new Chart("myChart", {
      type: 'bar' as ChartType,
      data: data,
    });
  }

}