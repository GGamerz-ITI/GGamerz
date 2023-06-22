import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/api/news';

  constructor(private http: HttpClient) { }

  getAllNews() {
    return this.http.get(`${this.apiUrl}`);
  }

  createNews(news: any) {
    return this.http.post(`${this.apiUrl}`, news);
  }

  getNewsById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateNewsById(id: string, news: any) {
    return this.http.put(`${this.apiUrl}/${id}`, news);
  }

  deleteNewsById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
