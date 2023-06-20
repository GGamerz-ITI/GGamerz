import { Component } from '@angular/core';
import { CommentService } from 'src/app/services/comments.service';
import { ReviewService } from 'src/app/services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent {
  gameID: any;
  reviews: any;
  isLoggedIn: boolean = false;
  user: any;
  cart: any
  images: GalleryItem[] = [];

  constructor(route: ActivatedRoute, private gameService: GamesService, private authService: AuthService, private userService: UserService, private reviewService: ReviewService,private commentService:CommentService) {
    this.gameID = route.snapshot.params["id"];
  }
  buttonHidden = false;
  ngOnInit(): void {
    // console.log(this.user.id);
    this.reviewService.getAllGameReviews(this.gameID).subscribe({
      next: (data) => {
        this.reviews = data
        console.log(this.reviews);
        // this.assignImages()
      },
      error: (err) => {
        console.log(err)
      }
    })
    // this.commentService.getAllReviewcomments(this.gameID).subscribe({
    //   next: (data) => {
    //     this.reviews = data
    //     // this.assignImages()
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }})
    //  // abdelrahim
     $('.reply-link').click(function(e) {
      e.preventDefault();
      $(this).next('.reply-container').toggleClass('show');
    });

    $('.reply-submit-btn').click(function(e) {
      e.preventDefault();
      var replyText = $(this).siblings('form').find('textarea').val();
      var newComment = $('<div class="comment"><p class="comment-text">' + replyText + '</p></div>');
      $(this).closest('.comment').after(newComment);
      $(this).closest('.reply-container').removeClass('show');
    });

    ////
  }
  ///// abdelrahim
  isFormVisible = false;
  reviewText = '';
  isReplyVisible = false;

  showForm() {
    this.isFormVisible = true;
  }
  showReply() {
    this.isReplyVisible = true;
  }

  // submitReview() {
  //   // Here you can implement the logic to submit the review
  //   console.log(this.reviewText);
  // }
  ////
create_review(){

  const formData = new FormData();
  formData.append('userId', "4");
  formData.append('gameId', this.gameID);
  formData.append('content', this.reviewText);
  console.log(formData);
  this.reviewService.createReview(formData).subscribe({
    next: () => {
      // this.reviews = data
      // this.assignImages()
    },
    })
    window.location.reload();
}
create_comment(){

}
delete_review(){

}
delete_comment(){

}
}
