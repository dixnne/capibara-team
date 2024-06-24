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
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.chart = new Chart("myChart", {
      type: 'line' as ChartType,
      data: data,
    });
  }

}