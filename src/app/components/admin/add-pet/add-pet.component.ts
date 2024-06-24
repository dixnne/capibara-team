import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../../interfaces/pet';
import { PetsService } from '../../../shared/pets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css'
})
export class AddPetComponent {
  pet: Pet = {
    id: "",
    data: {
      name: "",
      age: 0,
      color: "",
      breed: "",
      stay: "",
      img: "",
      details: "",
      tag: []
    }
  }
  tag: string = "";
  currentFile?: File;

  constructor (private petsService: PetsService, private router: Router) {}

  addTag(): void {
    this.pet.data.tag.push(this.tag);
    this.tag = "";
  }

  addPet(): void {
    if (this.currentFile) {
      this.petsService.addPet(this.pet, this.currentFile).subscribe(res => {
        Swal.fire({
          title: "Meowwww!",
          text: "Pet added to database.",
          icon: "success"
        }).then(() => {
          this.router.navigate(['/admin/pets']);
        });
      });
    }
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
    console.log("File selected");
  }
}
