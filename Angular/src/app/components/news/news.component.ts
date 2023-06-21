import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(): void {
    this.newsService.getAllNews()
      .subscribe(
        (news: Object) => {
          this.newsList = news as any[]; // Cast the 'news' object to 'any[]' type
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
