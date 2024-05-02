import { Component, Input } from '@angular/core';
import { Mascota } from '../../services/mascota';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css',
})
export class VisitComponent {
  @Input() mascota!: Mascota;
  idx: number = 0;
  constructor(
    public mascotaservice: MascotaService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.mascota = mascotaservice.getUnaMascota(params['id']);
      this.idx = params['id'];
    });
  }
}
