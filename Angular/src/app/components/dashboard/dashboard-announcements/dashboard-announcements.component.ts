import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewsService } from 'src/app/services/news.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-announcements',
  templateUrl: './dashboard-announcements.component.html',
  styleUrls: ['./dashboard-announcements.component.css']
})
export class DashboardAnnouncementsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'created_date',  'actions'];
  dataSource!: MatTableDataSource<any>;
  announcements: any[] = [];
  Announcements: string = "Announcements";
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAnnouncements();
  }

  getAnnouncements() {
    this.newsService.getAllNews().subscribe(
      (data: any) => {
        this.announcements = data;
        this.dataSource = new MatTableDataSource(this.announcements);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} - ${month} - ${year}`;
  }


  deleteAnnouncement(id: string) {
    this.newsService.deleteNewsById(id).subscribe(
      () => {
        console.log('Announcement deleted successfully');
        // Refresh the list of announcements
        this.getAnnouncements();
      },
      (error: any) => {
        console.log('Error deleting announcement:', error);
      }
    );
  }
  

  updateAnnouncement(id: string) {
    this.router.navigate(['/dashboard/announcements/update', id]);
  }
}