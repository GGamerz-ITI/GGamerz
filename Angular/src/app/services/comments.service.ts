import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly Base_URL = environment.apiURL + "/comments"; //localhost:3000/api
public commentChngStatusSubject:Subject<void> = new Subject <any>
public commentUpdateChngObservable: Observable <void> = this.commentChngStatusSubject.asObservable();
constructor(private readonly myClient: HttpClient) { }

getAllReviewcomments(id: any) {
  return this.myClient.get(this.Base_URL + '/review/' + id)
}

deleteComment(id: string) {
  // console.log(this.Base_URL + '/' + id)
  return this.myClient.delete(this.Base_URL + '/' + id)
}

createComment(data: any){
  // console.log('create');
  return this.myClient.post(this.Base_URL+'/create', data);
}


}
