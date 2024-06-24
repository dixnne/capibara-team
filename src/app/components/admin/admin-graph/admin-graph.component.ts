import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-admin-graph',
  standalone: true,
  imports: [],
  templateUrl: './admin-graph.component.html',
  styleUrl: './admin-graph.component.css'
})
export class AdminGraphComponent implements OnInit{
  public chart: Chart | undefined;

  ngOnInit(): void {

    // const labels = Utils.months({count: 7});
    const data = {
      labels:['Monday', 'Tuesday', 'Wednesday', 
        'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Registers',
        data: [65, 59, 80, 81, 56, 55, 40, 150],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.chart = new Chart("myChart", {
      type: 'line' as ChartType,
      data: data,
    });

  };
}