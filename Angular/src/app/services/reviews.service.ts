import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly Base_URL = environment.apiURL + "/reviews"; //localhost:3000/api
public reviewChngStatusSubject:Subject<void> = new Subject <any>
public reviewUpdateChngObservable: Observable <void> = this.reviewChngStatusSubject.asObservable();
  constructor(private readonly myClient: HttpClient) { }

  getAllGameReviews(id: any) {
    return this.myClient.get(this.Base_URL + '/game/' + id)
  }

  deleteReview(id: string) {
    // console.log(this.Base_URL + '/' + id)
    return this.myClient.delete(this.Base_URL + '/' + id)
  }

  createReview(data: any){
    // console.log('create');
    return this.myClient.post(this.Base_URL+'/create', data);
  }
  getReviewsByUser(id: any) {
    return this.myClient.get(this.Base_URL + '/user/' + id)
  }
}
