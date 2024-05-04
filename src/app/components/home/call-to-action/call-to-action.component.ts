import { Component } from '@angular/core';
import { PawsComponent } from './paws/paws.component';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [PawsComponent],
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.css'
})
export class CallToActionComponent {

}
