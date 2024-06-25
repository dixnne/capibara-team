import { Component } from '@angular/core';
import { Pet } from '../../interfaces/pet';
import { PetsService } from '../../shared/pets.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DateInfo } from '../../interfaces/date';
import { DatesService } from '../../shared/dates.service';
import { CommonModule } from '@angular/common';
import { UserRepositoryService } from '../../shared/user/user-repository.service';
import Swal from 'sweetalert2';
import { UserService } from '../../shared/user.service';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [RouterLink, CommonModule, QRCodeModule],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.css',
})
export class DatesComponent {
  dates: DateInfo[] = [];
  user: string = "";
  today: Date = new Date();
  authenticated: boolean = false;
  pets: Pet[] = [];
  url: string = "https://capibara.losnarvaez.com/";
  myAngularxQrCode: string = "";
  qrCodeDownloadLink: SafeUrl = "";

  constructor(
    public petsService: PetsService,
    private datesService: DatesService,
    private router: Router,
    private userRepoService: UserRepositoryService,
    private userService: UserService
  ) {
    this.authenticated = this.userRepoService.isLoggedIn();
    if (!this.authenticated) {
      Swal.fire({
        title: "Get out!",
        text: "You need to be logged in to see your booked dates.",
        icon: "error"
      }).then(() => {
        this.router.navigate(['/login']);
      });
    } 
    const u = this.userRepoService.getUser();
    this.userService.getUserByEmail(u?.email || u?.uid || "").subscribe(res => {
      this.user = res[0].id;
      this.datesService.getDates().subscribe(r => {
        this.dates = r.filter(dt => dt.data.userId == this.user);
        if (r.length > 0) {
          this.myAngularxQrCode = "Date: " + this.dates[0].data.date.day + "/" + this.dates[0].data.date.month + "/" + this.dates[0].data.date.year + " " + this.dates[0].data.date.hour;
        }
      });
    });
    this.petsService.getPets().subscribe(res => {
      this.pets = res;
    });
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  getPetImage(id: string): string {
    let pet = this.pets.find(p => p.id == id);
    return pet?.data.img || "";
  }

  getPetName(id: string): string {
    let pet = this.pets.find(p => p.id == id);
    return pet?.data.name || "";
  }
}
