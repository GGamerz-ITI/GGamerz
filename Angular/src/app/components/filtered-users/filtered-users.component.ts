import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-filtered-users',
  templateUrl: './filtered-users.component.html',
  styleUrls: ['./filtered-users.component.css']
})
export class FilteredUsersComponent {
  searchToggle(event: MouseEvent) {
    const obj = event.target as HTMLElement;
    const container = obj.closest('.search-wrapper') as HTMLElement;

    if (!container.classList.contains('active')) {
      container.classList.add('active');
      event.preventDefault();
    } else if (
      container.classList.contains('active') &&
      !obj.closest('.input-holder')
    ) {
      container.classList.remove('active');
      // clear input
      const input = container.querySelector('.search-input') as HTMLInputElement;
      input.value = '';
    }
  }

  searchTerm = "";
  users: any[] = [];
  userFollower: any
  userFollowing: any
  lastsearch: any[] = [];
  currentUser:any

  constructor(private toastr: ToastrService,private followService: FollowService,private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data
      },
      error: (err) => {
        console.log(err)
      }
    })
    const userObservable = this.userService.getCurrentUser(); //get current user
    if (userObservable) {
      userObservable.subscribe({
        next: (data: any) => {
          this.currentUser = data;
          this.getFollowersAndFollowing()
          this.users=this.users.filter(user=>user.id!=this.currentUser.id)

        },
        error: (err: any) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }
      });
    }
  }

  Search() {

    this.userService.searchUsers(this.searchTerm).subscribe({
      next: (data) => {

        this.users = data;
        this.users=this.users.filter(user=>user.id!=this.currentUser.id)

        //for save last search when no searchterm appear last search
        if (!this.searchTerm) {
          this.users = this.lastsearch;
        }

      },
      error: (err) => {
        this.users = [];
        console.error(err);
      }
    })

    this.lastsearch = this.users;
  }


  getFollowersAndFollowing() {
    this.followService.getFollowers(this.currentUser.id).subscribe({
      next: (data) => {
        this.userFollower = data
      },
      error: (err: any) => {console.log(err)

      }
    })
    this.followService.getFollowing(this.currentUser.id).subscribe({
      next: (data) => {
        this.userFollowing = data
      },
      error: (err: any) => {console.log(err)

      }
    })
  }

  isFollower(id:any): boolean {
    // console.log(this.userFollower.followers)
    if (this.userFollower.followers.some((follower: { id: any; }) => follower.id === id))
      return true
    else
      return false
  }

  isFollowing(id:any): boolean {
    // console.log(this.userFollowing.followings)
    if (this.userFollowing.followings.some((following: { id: any; }) => following.id === id))
      return true
    else
      return false
  }

  follow(id:any) {
    this.followService.follow(id, this.currentUser.id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.message, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
  }

  unfollow(id:any) {
    this.followService.unfollow(id, this.currentUser.id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.message, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
  }
}
