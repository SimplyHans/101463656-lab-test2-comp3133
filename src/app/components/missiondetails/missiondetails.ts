import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs/operators';

import { Mission } from '../../models/mission.model';
import { SpacexApiService } from '../../services/spacex-api.service';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './missiondetails.html',
  styleUrls: ['./missiondetails.scss'], 
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  error = '';
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly spacexApiService: SpacexApiService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const flightNumber = Number(idParam);

    console.log('PARAM:', flightNumber);

    if (isNaN(flightNumber)) {
      this.error = 'Mission not found.';
      this.loading = false;
      return;
    }

    this.spacexApiService
      .getMissionByFlightNumber(flightNumber)
      .pipe(take(1)) 
      .subscribe({
        next: (mission) => {
          console.log('MISSION RETURNED:', mission);

          this.mission = mission;
          this.loading = false; 
        },
        error: (err) => {
          console.log('ERROR:', err);
          this.error = 'Unable to fetch mission details.';
          this.loading = false;
        },
        complete: () => {
          console.log('COMPLETE');
        },
      });
  }
}