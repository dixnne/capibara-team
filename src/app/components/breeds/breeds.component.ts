import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { DogsComponent } from './dogs/dogs.component';
import { CatsComponent } from './cats/cats.component';

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [DividerModule, FieldsetModule, ButtonModule, DogsComponent, CatsComponent],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css'
})
export class BreedsComponent {

  current: string = "dogs";

  setDogs(): void {
    this.current = "dogs";
    console.log("Switched to " + this.current);
    
  }

  setCats(): void {
    this.current = "cats";
    console.log("Switched to " + this.current);
  }
}
