import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/reviews.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent {
  reviews: any
  user: any
  userId: any
  currntUser: any

  constructor(private route: ActivatedRoute, private userService: UserService, private reviewsService: ReviewService) { }

  ngOnInit() {
    this.fetch()
  }
  fetch() {
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          if (this.route.snapshot.params["id"]) {
            this.userId = this.route.snapshot.params["id"]
            console.log(this.userId)
          } else {
            this.currntUser = data
            this.userId = this.currntUser.id
          }
          this.reviewsService.getReviewsByUser(this.userId).subscribe({
            next: (data) => {
              this.reviews = data
              // console.log(this.reviews)
              this.ngOnInit()
            },
            error: (err) => {
              console.log("error retrieving reviews", err)
            }
          })
        },
        error: (err) => {
          console.log("error retrieving reviews", err)
        }
      })

    }
  }
  formatDate(dateString: string | null): string {

    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }
}
