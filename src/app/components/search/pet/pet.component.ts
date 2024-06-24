import { Component } from '@angular/core';
import { PetsService } from '../../../shared/pets.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pet } from '../../../interfaces/pet';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [RouterLink, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {

  petIndex: number = -1;
  pet!: Pet;
  searchName!: string;
  imgURL: string = "https://capibara.losnarvaez.com/";

  constructor(
    private petsService: PetsService, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.searchName = params['name']; 
        this.petsService.getPets().subscribe(res => {
          const pets = res;
          this.petIndex = pets.findIndex(p => p.data.name === this.searchName);
          if (this.petIndex == -1) {
            this.toast('error', 'Rawwwr!', 'Results not found for ' + this.searchName);
          } else {
            this.toast('success', 'Wooooof!', 'Results found for ' + this.searchName);
            this.pet = res[this.petIndex];
          }
        });
    });
  }

  //type: success, warn, error, info
  toast(type: string, heading: string, text: string): void {
    this.messageService.add({ severity: type, summary: heading, detail: text });
  }

}
