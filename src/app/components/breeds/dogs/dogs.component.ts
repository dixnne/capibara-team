import { Component } from '@angular/core';
import { DogBreedsService } from '../../../shared/dog-breeds.service';
import { CommonModule } from '@angular/common';
import { BreedComponent } from '../breed/breed.component';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [CommonModule, BreedComponent],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css'
})
export class DogsComponent {
  breeds: any = [];

  constructor(public dogBreedsService: DogBreedsService) {
    this.retrieveData();
  }

  retrieveData(): void {
    console.log("Connecting to Dog Breeds API");
    this.dogBreedsService.returnBreedsList().subscribe({
      next: this.successRequest.bind(this),
      error: (err) => {console.log(err)}
    });
  }
  
  successRequest(data: any): void {
    this.breeds = data;
  }
}
