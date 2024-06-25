import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserRepositoryService } from '../../shared/user/user-repository.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isAdmin: boolean = false;
  constructor(private userRepoService: UserRepositoryService, private router: Router) {
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
}
