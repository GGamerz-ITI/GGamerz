import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  userTitle: string = "Users";
  displayedColumns: string[] = ['name', 'username', 'email', 'rule', 'action'];
  dataSource!: MatTableDataSource<any>;
  users!: any[];
  ban!: boolean;
  user: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toastr: ToastrService, private usersService: UserService) {
    this.getUsers();
  }

  ngOnInit() {
    this.usersService.banChngObservable.subscribe(() => {
      this.getUsers();
    })
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(
      {
        next: (data: Object) => {
          this.users = data as any[];
          console.log(this.users)
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          this.toastr.error(error, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }
      }
    );
  }

  banToggle(id: any) {
    this.usersService.getUserByID(id).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);

        this.ban = this.user.isBanned;
        if (this.ban) {
          this.unbanUser(id);
        } else {
          this.banUser(id);
        }
        // this.dataSource = new MatTableDataSource(this.users);
        // this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }

    });
  }

  banUser(userId: string) {
    const body = { id: userId };
    this.usersService.ban(body).subscribe({
      next: () => {
        this.usersService.banSubject.next();
        this.toastr.success('User banned successfully', "Feedback");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
        this.user.isBanned = true;
      },
      error: (err) => {
        this.toastr.error('Failed to ban user ' + err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });
  }

  unbanUser(userId: string) {
    const body = { id: userId };
    this.usersService.unban(body).subscribe({
      next: () => {
        this.usersService.banSubject.next();
        this.toastr.success('User unbanned successfully', "Feedback");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
        // console.log('User unbanned successfully');
        // this.updateDataSource();
        this.user.isBanned = false;
      },
      error: (err) => {
        this.toastr.error('Failed to unban user ' + err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });
  }


}
