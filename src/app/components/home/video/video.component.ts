import { Component } from '@angular/core';
import { VideopipePipe } from '../../../pipes/videopipe.pipe';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [RouterOutlet, VideopipePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {
  video: string = 'GHbgCJPWAtg';
}
