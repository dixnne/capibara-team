import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../search/search.component';
import { UserRepositoryService } from '../../shared/user/user-repository.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HeaderComponent, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  data: boolean = false;
  fontSize: number = 1;
  constructor(private userRepoService: UserRepositoryService) {
    this.data = userRepoService.isLoggedIn();
  }

  @Output() InvertEvent = new EventEmitter<boolean>();
  @Output() FontSizeEvent = new EventEmitter<string>();
  @Output() ColorBlindnessEvent = new EventEmitter<string>();
  @Output() SpeakEvent = new EventEmitter<string>();

  onInvert(): void {
    this.data = !this.data;
    this.InvertEvent.emit(this.data);
  }

  onIncrementFont(): void {
    this.fontSize += 0.2;
    this.FontSizeEvent.emit("" + this.fontSize + "rem");
  }

  onDecrementFont(): void {
    if (this.fontSize > 1) {
      this.fontSize -= 0.2;
    }
    this.FontSizeEvent.emit("" + this.fontSize + "rem");
  }

  onColorBlindness(colorBlindness: string): void {
    this.ColorBlindnessEvent.emit(colorBlindness);
  }

  onSpeak(state: string): void {
    this.SpeakEvent.emit(state);
  }
}
