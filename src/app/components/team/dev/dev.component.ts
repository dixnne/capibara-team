import { Component, Input } from '@angular/core';
import { Dev } from '../../../interfaces/dev';
import { DevsService } from '../../../shared/devs.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetsService } from '../../../shared/pets.service';
import { Pet } from '../../../interfaces/pet';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent {
  @Input() dev!: Dev;
  pets!: Pet[];
  devPetIndex: number = 0;

  constructor(
    public devsService: DevsService,
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.dev = this.devsService.getADev(params['id']);
      this.pets = this.petsService.getPets();
    });
  }

  inArray(needle: number, haystack: number[]): boolean{
    var count = haystack.length;
    for(var i=0;i<count;i++)
    {
        if(haystack[i]===needle){
          this.devPetIndex++;
          return true;
        }
    }
    return false;
  }
}
