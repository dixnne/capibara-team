import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DateInfo } from '../../../interfaces/date';
import { DatesService } from '../../../shared/dates.service';
import { PetsService } from '../../../shared/pets.service';
import { UserService } from '../../../shared/user.service';
import { Pet } from '../../../interfaces/pet';
import { User } from '../../../interfaces/user';

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

  constructor(
    private dateservice: DatesService,
    private petservice: PetsService,
    private userservice: UserService
  ) {
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
      usr?.data.name.lastname +
      ' ' +
      usr?.data.name.username
    );
  }
}
