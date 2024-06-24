import { Component, ContentChild, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../shared/loading.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgTemplateOutlet],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  private readonly loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;
}
