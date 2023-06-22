import { NewsService } from 'src/app/services/news.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {
  createdAnnouncement: string = "New Announcement";
  announcementForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    this.initAnnouncementForm();
  }

  initAnnouncementForm(): void {
    this.announcementForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const news = {
        title: this.announcementForm.value.title,
        content: this.announcementForm.value.content
      };

      this.newsService.createNews(news).subscribe(
        (response) => {
          // Handle successful response
          console.log('Announcement created successfully:', response);
          // Reset the form
          this.announcementForm.reset();
          this.router.navigate(['/dashboard/announcements']); // Navigate to '/dashboard/news'

        },
        (error) => {
          // Handle error
          console.error('Error creating announcement:', error);
        }
      );
    }
  }
}
