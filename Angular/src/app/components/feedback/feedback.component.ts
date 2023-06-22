import { Component } from '@angular/core';
import { CommentService } from 'src/app/services/comments.service';
import { ReviewService } from 'src/app/services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent {
  gameID: any;
  reviews: any;
  comments: any = [];
  isLoggedIn: boolean = false;
  user: any;
  cart: any
  images: GalleryItem[] = [];
  commentText = new FormControl('');
  reviewId: any; // default review ID
  constructor(route: ActivatedRoute, private gameService: GamesService, private authService: AuthService, private userService: UserService, private reviewService: ReviewService, private commentService: CommentService) {
    this.gameID = route.snapshot.params["id"];
  }
  buttonHidden = false;
  ngOnInit(): void {
    // console.log(this.user.id);
    this.reviewService.getAllGameReviews(this.gameID).subscribe({
      next: (data) => {
        this.reviews = data
        // console.log(this.reviews);
        this.reviews.forEach((review: any) => {
          this.fetchComments(review.id);
          this.userService.getUserByID(review.userId).subscribe({
            next: (user) => {
              review.user = user;
            },
            error: (error) => {
              console.error('Error getting user:', error);
            },
          });
        });
      },
      error: (err) => {
        console.log(err)
      }
    })
    //  // abdelrahim
    $('.reply-link').click(function (e) {
      e.preventDefault();
      $(this).next('.reply-container').toggleClass('show');
    });

    ////
  }


  ///// abdelrahim
  isFormVisible = false;
  reviewText = '';
  isReplyVisible = false;
  fetchComments(reviewId: number) {
    this.commentService.getAllReviewcomments(reviewId).subscribe({
      next: (data) => {
        this.comments[reviewId] = data;
        this.comments[reviewId].forEach((comment: any) => {
          this.userService.getUserByID(comment.userId).subscribe({
            next: (user) => {
              comment.user = user;
            },
            error: (error) => {
              console.error('Error getting user:', error);
            },
          });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  showForm() {
    this.isFormVisible = true;
  }
  // showReply() {
  //   this.isReplyVisible = true;
  // }
  showReply(review: any) {
    review.showReplyForm = !review.showReplyForm;
  }

  create_review() {
    const review = {
      userId: 1,
      gameId: this.gameID,
      content: this.reviewText,
    };
    this.reviewService.createReview(review).subscribe({
      next: (response) => {
        console.log('Review created successfully:', response);
        this.ngOnInit()
        this.reviewText=""
      },
      error: (error) => {
        console.error('Error creating review:', error);
      },
    });
    // window.location.reload();
  }

  create_comment(review: any) {
    if (this.commentText.value === '') {
      console.error('Comment content is empty');
      return;
    }
    const comment = {
      userId: 1,
      reviewId: review.id,
      content: this.commentText.value,
    };
    this.commentService.createComment(comment).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response);
        this.ngOnInit()
        this.commentText.reset()
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      },
    });

    // Clear the comment text
    // this.commentText.reset();
  }



  delete_review(reviewId: string) {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: (response) => {
        console.log('Review deleted successfully:', response);
        // You may want to reload the reviews list or update the view here
        this.ngOnInit()
      },
      error: (error) => {
        console.error('Error deleting review:', error);
      },
    });
    // window.location.reload();
  }
  delete_comment(commentId: any) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (response) => {
        console.log('comment deleted successfully:', response);
        // You may want to reload the reviews list or update the view here
        this.ngOnInit()
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      },
    });
    // window.location.reload();

  }
}
