import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { comparePassword } from './validation';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
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
  //validator
  enviado = false;
  validado = false;
  reseteado = false;
  repetido = false;
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    contra: new FormControl('', [Validators.required]),
    contra2: new FormControl('', [Validators.required]),
  });
  result!: string;

  constructor(private userservice: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userForm.controls.contra2.addValidators([
      comparePassword(this.userForm.controls.contra),
    ]);
  }
  submit() {
    if (this.userForm.valid) {
      this.result = 'All data is valid!';
    } else {
      this.result = "There's invalid data in the form";
    }
  }
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
