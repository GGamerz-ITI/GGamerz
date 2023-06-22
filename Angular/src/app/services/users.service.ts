import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private valueSubject: Subject<boolean> = new Subject<boolean>();
  value$: Observable<boolean> = this.valueSubject.asObservable();


  public banSubject: Subject<void> = new Subject<any>
  public banChngObservable: Observable<void> = this.banSubject.asObservable();

  constructor(private readonly myClient: HttpClient, private authService: AuthService) { }

  private readonly Base_URL = environment.apiURL + "/users";

  Login(body: any) {
    return this.myClient.post(this.Base_URL + "/login", body);
  }

  Register(body: any) {
    return this.myClient.post(this.Base_URL + "/register", body);
  }

  updatePassword(body: any) {
    return this.myClient.post(this.Base_URL + "/passReset", body);
  }

  getCurrentUser() {
    const token = this.authService.getToken('user');
    try {
      if (token) {
        const decodedToken: any = jwt_decode(token);
        return this.getUserByID(decodedToken.id)
      }
    }
    catch (err) {
    }
    return null
  }

  getUserByID(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id)
  }

  logout() {
    this.valueSubject.next(false);
    localStorage.removeItem('user');
  }

  updateUser(id: string, body: any) {
    console.log("in service")
    return this.myClient.put(this.Base_URL + '/' + id, body)
  }

  getAllUsers() {
    return this.myClient.get(this.Base_URL);
  }

  ban(body: any) {
    return this.myClient.post(this.Base_URL + "/ban", body)
  }

  unban(body: any) {
    return this.myClient.post(this.Base_URL + "/unban", body)
  }

  searchUsers(searchTerm: string): Observable<any> {
    return this.myClient.post(this.Base_URL + "/preference", { searchTerm });
  }
}
