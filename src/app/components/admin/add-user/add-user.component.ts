import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  user: any;
  tag: string = '';
  currentFile?: File;
  constructor(private users: UserService, private router: Router) {}
}
