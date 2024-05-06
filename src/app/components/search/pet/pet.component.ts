import { Component } from '@angular/core';
import { PetsService } from '../../../shared/pets.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pet } from '../../../interfaces/pet';
import { CommonModule } from '@angular/common';
import { DateInfo } from '../../../interfaces/date';
import { DatesService } from '../../../shared/dates.service';
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

  petIndex: number = 0;
  pet!: Pet;
  petDates: DateInfo[] = [];
  searchName!: string;

  constructor(
    private petsService: PetsService, 
    private datesService: DatesService, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.petIndex = this.petsService.getPetIndex(params["name"]);
      this.searchName = params['name'];
      if (this.petIndex != -1){
        this.pet = this.petsService.getAPet(this.petIndex); 
        this.petDates = this.datesService.getPetDates(this.petIndex);
        this.toast('success', 'Wooooof!', 'Results found for ' + params['name']);
      }
    });
  }

  //type: success, warn, error, info
  toast(type: string, heading: string, text: string): void {
    this.messageService.add({ severity: type, summary: heading, detail: text });
  }

}
