import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.css'
})
export class BreedComponent {
  @Input() data: any = [];
  @Input() index: number = 0;
  @Input() originalIndex: number = 0;
  @Input() pet: string = "";

  next(): void {
    if (this.index < this.data.length -1) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  prev(): void {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.data.length - 1;
    }
  }

  setIndex(): void {
    this.index = this.originalIndex;

  }
}
