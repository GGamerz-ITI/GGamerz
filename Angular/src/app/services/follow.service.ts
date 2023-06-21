import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private readonly Base_URL = environment.apiURL + "/community";
  constructor(private readonly myClient: HttpClient) { }

  getFollowers(id:any) {
    
    return this.myClient.get(this.Base_URL + '/' + id+'/followers')
  }

  getFollowing(id:any) {
    
    return this.myClient.get(this.Base_URL + '/' + id+'/followings')
  }

}
