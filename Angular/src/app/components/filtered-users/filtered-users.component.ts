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

  constructor(private userService: UserService) {}

  Search() {
    this.userService.searchUsers(this.searchTerm).subscribe({
      next: (data) => {
        // Assign the response data to the users property
        this.users = data;
        console.log(data)
      },
      error: (err) => {
        // Handle any errors here
        console.error(err);
      }
    })
  }
}
