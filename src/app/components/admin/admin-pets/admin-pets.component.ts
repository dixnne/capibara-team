import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Pet } from '../../../interfaces/pet';
import { PetsService } from '../../../shared/pets.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';

@Component({
  selector: 'app-admin-pets',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './admin-pets.component.html',
  styleUrl: './admin-pets.component.css'
})
export class AdminPetsComponent {

  pets: Pet[] = [];
  imgURL: string = "https://capibara.losnarvaez.com/";
  isAdmin: boolean = false;

  constructor(private petsService: PetsService, private router: Router, private userRepoService: UserRepositoryService) {
    this.petsService.getPets().subscribe(res => {
      this.pets = res;
    });
    this.isAdmin = this.userRepoService.isAdmin();
    if (!this.isAdmin) {
      Swal.fire({
        title: "Stop right there!",
        text: "You're not an admin, get out of here.",
        icon: "error"
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  deletePet(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to retrieve this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.petsService.deletePet(id).subscribe(res => {
          if (res.message !== "Elemento eliminado") {
            Swal.fire({
              title: "Oooops!",
              text: "Couldn't delete pet from database.",
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Wooooof!",
              text: "Successfully deleted pet from database.",
              icon: "success"
            }).then(() => {
              this.petsService.getPets().subscribe(res => {
                this.pets = res;
                this.router.navigate(['/admin/pets']);
              });
            });
          }
        });
      }
    });
    
  }
}
