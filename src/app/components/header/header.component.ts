import { Component } from '@angular/core';
import { UserRepositoryService } from '../../shared/user/user-repository.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../shared/user.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authenticated: boolean = true;
  isAdmin: boolean = true;
  uid: string = "";
  user ?: User;
  url: string = "https://capibara.losnarvaez.com/";

  constructor(private userRepoService: UserRepositoryService, private userService: UserService, private router: Router) {
    this.authenticated = this.userRepoService.isLoggedIn();
    this.isAdmin = this.userRepoService.isAdmin();
    if (this.authenticated) {
      const u = this.userRepoService.getUser();
      if (u) {
        this.userService.getUserByEmail(u.email || u.uid).subscribe((res) => {
          this.user = res[0];
          console.log(this.user);
        });
      }
    }
  }

  logout(): void {
    this.userRepoService.logout(res => {
      if (res) {
        Swal.fire({
          title: "Goodbye!",
          text: "Successfully logged out.",
          icon: "success"
        }).then(() => {
          this.authenticated = this.userRepoService.isLoggedIn();
          this.isAdmin = this.userRepoService.isAdmin();
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        });
      } else {
        Swal.fire({
          title: "Sorry!",
          text: "Couldn't log out.",
          icon: "error"
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
    })
  }
}
