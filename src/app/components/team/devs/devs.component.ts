import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dev } from '../../../interfaces/dev';
import { DevsService } from '../../../shared/devs.service';

@Component({
  selector: 'app-devs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './devs.component.html',
  styleUrl: './devs.component.css'
})
export class DevsComponent {
  myDevs: Dev[] = [];
  imgURL: string = "https://capibara.losnarvaez.com/";

  constructor(public devsService: DevsService) {}

  ngOnInit(): void {
    this.devsService.getDevs().subscribe(res => {
      this.myDevs = res;
    });
  }
}
