import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Mission } from '../../models/mission.model';
import { SpacexApiService } from '../../services/spacex-api.service';

@Component({
  selector: 'app-missiondetails',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './missiondetails.html',
  styleUrl: './missiondetails.scss',
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly spacexApiService: SpacexApiService,
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');
    if (!flightNumber) {
      this.error = 'Mission not found.';
      return;
    }

    this.spacexApiService.getMissionByFlightNumber(flightNumber).subscribe({
      next: (mission) => {
        this.mission = mission;
      },
      error: () => {
        this.error = 'Unable to fetch mission details.';
      },
    });
  }
}
