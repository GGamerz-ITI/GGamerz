import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private readonly Base_URL = environment.apiURL + "/community";
  constructor(private readonly myClient: HttpClient) { }

  getFollowers(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id + '/followers')
  }

  getFollowing(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id + '/followings')
  }

  follow( userId: any,id:any) {
    console.log("in follow srvs")
    console.log("person to follow",userId)
    console.log("my id",id)
    return this.myClient.post(this.Base_URL +'/follow', { id: id, userId: userId })
  }

  unfollow(userId: any,id:any) {
    console.log("in unfollow srvs")

    return this.myClient.post(this.Base_URL + '/unfollow', { id: id, userId: userId })
  }
}
