import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { DevsService } from '../../../shared/devs.service';
import { Dev } from '../../../interfaces/dev';
import Swal from 'sweetalert2';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';

@Component({
  selector: 'app-admin-devs',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './admin-devs.component.html',
  styleUrl: './admin-devs.component.css'
})
export class AdminDevsComponent {

  devs: Dev[] = [];
  imgURL: string = "https://capibara.losnarvaez.com/";
  isAdmin: boolean = false;

  constructor(private devsService: DevsService, private router: Router, private userRepoService: UserRepositoryService) {
    this.devsService.getDevs().subscribe(res => {
      this.devs = res;
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

  deleteDev(id: string): void {
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
        this.devsService.deleteDev(id).subscribe(res => {
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
              this.devsService.getDevs().subscribe(res => {
                this.devs = res;
                this.router.navigate(['/admin/devs']);
              });
            });
          }
        });
      }
    });
    
  }
}
