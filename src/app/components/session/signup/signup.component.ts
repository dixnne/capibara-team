import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserRepositoryService } from '../../../shared/user/user-repository.service';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { comparePassword } from './validation';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private service: UserRepositoryService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userForm.controls.contra2.addValidators([
      comparePassword(this.userForm.controls.contra),
    ]);
  }
  user: User = {
    id: '',
    data: {
      dates: [],
      email: '',
      image: '',
      password: '',
      name: {
        username: '',
        firstname: '',
        lastname: '',
      },
      phone: '',
    },
  };
  confirmPassword: string = '';
  passwordAlert: string = "Passwords don't match";
  currentFile?: File;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    contra: new FormControl('', [Validators.required]),
    contra2: new FormControl('', [Validators.required]),
  });
  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
    console.log('File selected');
  }

  signUp(): void {
    this.service.register(
      this.user.data.email,
      this.user.data.password,
      (result: boolean) => {
        if (result) {
          if (this.currentFile) {
            this.userService
              .addUser(this.user, this.currentFile)
              .subscribe((res) => {
                Swal.fire({
                  title: 'Welcomeeee!',
                  text: 'Account created successfully.',
                  icon: 'success',
                }).then(() => {
                  this.router.navigate(['/login']);
                });
              });
          }
        } else {
          Swal.fire({
            title: 'Wooof!',
            text: 'Sign up failed.',
            icon: 'success',
          });
        }
      }
    );
  }
}
