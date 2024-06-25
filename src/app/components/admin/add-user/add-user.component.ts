import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  user: User = {
    id: '',
    data: {
      dates: [],
      email: '',
      name: {
        username: '',
        firstname: '',
        lastname: '',
      },
      password: '',
      phone: '',
      image: '',
    },
  };
  currentFile?: File;
  constructor(private userservice: UserService, private router: Router) {}

  addUser(): void {
    if (this.currentFile) {
      this.userservice.addUser(this.user, this.currentFile).subscribe((res) => {
        Swal.fire({
          title: 'Exit',
          text: 'User added to database',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['admin/users']);
        });
      });
    }
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
    console.log('File selected');
  }
}
