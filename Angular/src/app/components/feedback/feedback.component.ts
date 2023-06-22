import { Component } from '@angular/core';
import { CommentService } from 'src/app/services/comments.service';
import { ReviewService } from 'src/app/services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  reviewId: any ; // default review ID
  constructor(route: ActivatedRoute,private toastr: ToastrService, private gameService: GamesService, private authService: AuthService, private userService: UserService, private reviewService: ReviewService,private commentService:CommentService) {
    this.gameID = route.snapshot.params["id"];
  }
  buttonHidden = false;
  ngOnInit(): void {
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;

        },
        error: (error) => {
                console.error('Error getting user:', error);

                      }
      })
    }
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
    $('.reply-link').click(function (e) {
      e.preventDefault();
      $(this).next('.reply-container').toggleClass('show');
    });

    ////
  }


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
    if (this.user) {
      const review = {
        userId: this.user.id,
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
      window.location.reload();
    } else {
      this.toastr.warning('You have to login first', 'Warning');
    }
  }

    create_comment(review: any) {
      if (this.user) {
      if (this.commentText.value === '') {
        console.error('Comment content is empty');
        return;
      }
      const comment = {
        userId: this.user.id,
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
    }else {
      this.toastr.warning('You have to login first', 'Warning');
    }
    }



    delete_review(review: any) {
      if (this.user) {
      this.reviewService.deleteReview(review.id).subscribe({
        next: (response) => {
          if (this.user.id == review.userId) {
            console.log('Review deleted successfully:', response);
            this.ngOnInit();
          } else {
            console.error('Error: User ID does not match the review owner.');
          }
        },
        error: (error) => {
          console.error('Error deleting review:', error);
        },
      });
    }else {
      this.toastr.warning('You have to login first', 'Warning');
    }
    }
    delete_comment(comment: any) {
      if (this.user) {
      if (this.user.id === comment.userId) {
        this.commentService.deleteComment(comment.id).subscribe({
          next: (response) => {
            console.log('Comment deleted successfully:', response);
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error deleting comment:', error);
          },
          complete: () => {
            // The complete callback is invoked after the request completes
            // You can put any post-processing logic here, like reloading the comments list
            window.location.reload();
          }
        });
      } else {
        console.error('Error: User ID does not match the comment owner.');
      }
    }else {
      this.toastr.warning('You have to login first', 'Warning');
    } }
   check_acessbility(incommingid:any){
    if (this.user) {
    if (incommingid == this.user.id){
      return true;
     }
     else {
      return false;
     }
   }  else {
    return false;
  }
}
 }
