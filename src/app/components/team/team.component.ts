import { Component } from '@angular/core';
import { DevsComponent } from './devs/devs.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [DevsComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
}
