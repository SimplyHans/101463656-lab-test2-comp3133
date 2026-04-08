import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root',
})
export class SpacexApiService {
  private readonly baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private readonly http: HttpClient) {}

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.baseUrl);
  }

  getMissionsByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}?launch_year=${year}`);
  }

  getMissionByFlightNumber(flightNumber: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.baseUrl}/${flightNumber}`);
  }
}
