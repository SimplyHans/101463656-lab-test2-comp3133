import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import { Mission } from '../../models/mission.model';
import { SpacexApiService } from '../../services/spacex-api.service';
import { MissionfilterComponent } from '../missionfilter/missionfilter';

@Component({
  selector: 'app-missionlist',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MissionfilterComponent,
  ],
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.scss',
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  loading = false;
  error = '';

  constructor(private readonly spacexApiService: SpacexApiService) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  onFilterByYear(year: string): void {
    if (!year) {
      this.loadMissions();
      return;
    }

    this.loading = true;
    this.error = '';
    this.spacexApiService.getMissionsByYear(year).subscribe({
      next: (missions) => {
        this.missions = missions;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to fetch missions for that year.';
        this.loading = false;
      },
    });
  }

  private loadMissions(): void {
    this.loading = true;
    this.error = '';
    this.spacexApiService.getMissions().subscribe({
      next: (missions) => {
        this.missions = missions;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to fetch missions.';
        this.loading = false;
      },
    });
  }
}
