import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

constructor(private readonly myClient: HttpClient) {}

private readonly Base_URL = environment.apiURL + "/verify";

// Email
sendVerification(email:any) {
  const body = {
    email: email
  }
  return this.myClient.post(this.Base_URL + '/email', body)
}

verifyUserEmail(userId: any,token: any) {
  return this.myClient.get(this.Base_URL + '/emailVerify/' + userId + '/' + token)
}

// Password email request
sendPasswordReset(email:any) {
  const body = {
    email: email
  }
  return this.myClient.post(this.Base_URL + '/passwordReset', body)
}
}
