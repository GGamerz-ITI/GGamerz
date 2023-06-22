import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];

  constructor(
    private toastr: ToastrService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(): void {
    this.newsService.getAllNews()
      .subscribe({
        next: (news: Object) => {
          this.newsList = news as any[]; // Cast the 'news' object to 'any[]' type
        },
        error: (error) => {
          this.toastr.error(error, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }
      } );
  }
  formatDate(dateString: string | null): string {

    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }
}
