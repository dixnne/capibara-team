import { Component } from '@angular/core';
import { CatBreedsService } from '../../../shared/cat-breeds.service';
import { CommonModule } from '@angular/common';
import { BreedComponent } from '../breed/breed.component';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule, BreedComponent],
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.css'
})
export class CatsComponent {

  breeds: any = [];

  constructor(public catBreedsService: CatBreedsService) {
    this.retrieveData();
  }

  retrieveData(): void {
    console.log("Connecting to Cat Breeds API");
    this.catBreedsService.returnBreedsList().subscribe({
      next: this.successRequest.bind(this),
      error: (err) => {console.log(err)}
    });
  }
  
  successRequest(data: any): void {
    console.log(data);
    this.breeds = data;
  }
}
