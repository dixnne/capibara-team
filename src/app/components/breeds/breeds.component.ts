import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [DividerModule, FieldsetModule, ButtonModule],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css'
})
export class BreedsComponent {

}
