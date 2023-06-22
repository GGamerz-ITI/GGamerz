import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.css']
})
export class UpdateAnnouncementComponent {
  updatedGameName: string = "Update Announcement";
  gameForm!: FormGroup;
  updatedTitle!: string;
  updatedContent!: string;
  announcement: any;
  updatedAnnouncementId!: string;

  constructor(
    private toastr: ToastrService,
    public newsService: NewsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      title: new FormControl(),
      content: new FormControl()
    });

    this.updatedAnnouncementId = this.route.snapshot.params["id"];

    this.newsService.getNewsById(this.updatedAnnouncementId).subscribe({
      next: (data: any) => {
        this.announcement = data;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear();
        }, 3000);
      }
    });
  }

  update() {
    if (this.gameForm.valid) {
      this.updatedTitle = this.gameForm.value.title || this.announcement.title;
      this.updatedContent = this.gameForm.value.content || this.announcement.content;

      const updatedAnnouncement = {
        title: this.updatedTitle,
        content: this.updatedContent
      };

      this.newsService.updateNewsById(this.updatedAnnouncementId, updatedAnnouncement).subscribe({
        next: () => {
          console.log("done");
          this.router.navigate(['dashboard/announcements']);
        },
        error: (err) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear();
          }, 3000);
        }
      });
    }
  }
}
