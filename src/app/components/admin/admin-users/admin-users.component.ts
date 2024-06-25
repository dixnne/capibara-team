import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  users: User[] = [];
  imgURL: string = 'https://capibara.losnarvaez.com/';

  constructor(private userservice: UserService, private router: Router) {
    this.userservice.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this User will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.deleteUser(id).subscribe((res) => {
          if (res.message !== 'Elemento eliminado') {
            Swal.fire({
              title: 'Oooops!',
              text: "Couldn't delete this User from database.",
              icon: 'error',
            });
          } else {
            Swal.fire({
              title: 'Finally!',
              text: 'Successfully deleted User from database.',
              icon: 'success',
            }).then(() => {
              this.userservice.getUsers().subscribe((res) => {
                this.users = res;
                this.router.navigate(['/admin/users']);
              });
            });
          }
        });
      }
    });
  }
}
