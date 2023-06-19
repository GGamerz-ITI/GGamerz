import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  buttonHidden = false;
  ngOnInit(): void {
     // abdelrahim
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

  submitReview() {
    // Here you can implement the logic to submit the review
    console.log(this.reviewText);
  }
  ////
}
