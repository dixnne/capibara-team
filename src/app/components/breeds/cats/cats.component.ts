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
  activeImage: any = {
    url: "",
    height: 0,
    width: 0
  }

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

  getBreedImage(breedID: string): any {
    console.log("Getting Breed Image (id = " + breedID + ")");
    this.catBreedsService.returnABreed(breedID).subscribe({
      next: this.successRequestImage.bind(this),
      error: (err) => {console.log(err)}
    });
  }

  successRequestImage(data: any): void {
    console.log(data);
    this.activeImage.url = data[0].url;
    this.activeImage.width = data[0].width;
    this.activeImage.height = data[0].height;
  }
}
