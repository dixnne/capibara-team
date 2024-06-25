import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DateInfo } from '../../../interfaces/date';
import { DatesService } from '../../../shared/dates.service';
import { PetsService } from '../../../shared/pets.service';
import { UserService } from '../../../shared/user.service';
import { Pet } from '../../../interfaces/pet';
import { User } from '../../../interfaces/user';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dates',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin-dates.component.html',
  styleUrl: './admin-dates.component.css',
})
export class AdminDatesComponent {
  dates: DateInfo[] = [];
  pets: Pet[] = [];
  users: User[] = [];
  imgURL: string = 'https://capibara.losnarvaez.com/';
  isAdmin: boolean = false;

  constructor(
    private dateservice: DatesService,
    private petservice: PetsService,
    private userservice: UserService,
    private userRepoService: UserRepositoryService,
    private router: Router
  ) {
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
    this.dateservice.getDates().subscribe((res) => {
      this.dates = res;
    });
    this.petservice.getPets().subscribe((res) => {
      this.pets = res;
    });
    this.userservice.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getPetImage(id: string) {
    const pet = this.pets.find((p) => p.id == id);
    return pet?.data.img;
  }
  getUserById(id: string) {
    const usr = this.users.find((u) => u.id == id);
    return (
      usr?.data.name.firstname +
      ' ' +
      usr?.data.name.lastname 
    );
  }
}
