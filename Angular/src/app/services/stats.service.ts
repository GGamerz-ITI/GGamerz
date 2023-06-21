import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private readonly myClient: HttpClient) { }
  private readonly Base_URL = environment.apiURL + '/stats';

  updatePoints(id:any) {
  const  points= this.getPoints()
    return this.myClient.put(this.Base_URL + '/points', {points:points,id:id});
  }

  getPoints(): number {
    const points = localStorage.getItem('orderPts');
    return points !== null ? parseInt(points) : 0;
  }
}
