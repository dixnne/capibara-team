import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private router: Router) {}

  searchAPet(name: string) {
    this.router.navigate(['/search', name]);
  }
}
