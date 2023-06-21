import { Component } from '@angular/core';
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
  lastsearch: any[] = [];

  constructor(private userService: UserService) {}


  Search() {

    this.userService.searchUsers(this.searchTerm).subscribe({
      next: (data) => {

        this.users = data;

        //for save last search when no searchterm appear last search
        if(!this.searchTerm)
          {
            this.users = this.lastsearch;
          }

        // console.log(this.searchTerm)
        // console.log("data",data)
        // console.log("users",this.users)
        // console.log("late",this.lastsearch)
      },
      error: (err) => {
        this.users = [];
        console.error(err);
      }
    })

    this.lastsearch = this.users;
  }
}
