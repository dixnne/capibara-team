import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Dev } from '../../../interfaces/dev';
import { Pet } from '../../../interfaces/pet';
import { PetsService } from '../../../shared/pets.service';
import { DevsService } from '../../../shared/devs.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dev',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './add-dev.component.html',
  styleUrl: './add-dev.component.css'
})
export class AddDevComponent {
  dev: Dev = {
    id: "",
    data: {
      name: "",
      details: "",
      image: "",
      tags: [],
      jobs: [],
      skills: {
        languages: [],
        frameworks: [],
        technologies: [],
        tools: []
      },
      pets: []
    }
  }
  pets: Pet[] = [];
  tag: string = "";
  job: string = "";
  language: string = "";
  framework: string = "";
  technology: string = "";
  tool: string = "";
  pet: string = "";
  addedPets: string[] = [];
  currentFile?: File;

  constructor (private petsService: PetsService, private devsService: DevsService, private router: Router) {
    this.petsService.getPets().subscribe(res => {
      this.pets = res;
    })
  }

  addTag(): void {
    this.dev.data.tags.push(this.tag);
    this.tag = "";
  }

  addJob(): void {
    this.dev.data.jobs.push(this.job);
    this.job = "";
  }

  addLanguage(): void {
    this.dev.data.skills.languages.push(this.language);
    this.language = "";
  }

  addFramework(): void {
    this.dev.data.skills.frameworks.push(this.framework);
    this.framework = "";
  }

  addTechnology(): void {
    this.dev.data.skills.technologies.push(this.technology);
    this.technology = "";
  }

  addTool(): void {
    this.dev.data.skills.tools.push(this.tool);
    this.tool = "";
  }

  addPet(): void {
    this.dev.data.pets.push(this.pet);
    if (this.pets) {
      for (let index = 0; index < this.pets.length; index++) {
        const p = this.pets[index];
        if (p.data.name === this.pet) {
          this.addedPets.push(p.data.name);
        }
      }
    }
    this.pet = "";
  }

  addDev(): void {
    if (this.currentFile) {
      this.devsService.addDev(this.dev, this.currentFile).subscribe(res => {
        Swal.fire({
          title: "Meowwww!",
          text: "Developer added to database.",
          icon: "success"
        }).then(() => {
          this.router.navigate(['/admin/devs']);
        })
      });
    }
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
    console.log("File selected");
  }
}
