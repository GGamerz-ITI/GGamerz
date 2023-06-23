import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css']
})
export class DashboardProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  productsTitle: string = "Games";
  games: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private toastr: ToastrService,private gamesService: GamesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gamesService.GetAllGames().subscribe(
   {
       next:(data: Object) => {
        this.games = data as any[];
        console.log(this.games)
        this.dataSource = new MatTableDataSource(data as any[]);
        this.dataSource.paginator = this.paginator;
      },
      error:(error) => {
        this.toastr.error(error, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);       }}
    );
  }

  deleteProduct(id: any) {
    this.gamesService.deleteGame(id).subscribe(
      {
        next:() => {
        this.removeDeletedProduct(id);
        this.dataSource = new MatTableDataSource(this.games);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);       }
    }
    );
  }

  removeDeletedProduct(id: any) {
    this.games = this.games.filter(game => game.id !== id);
  }

   formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} - ${month} - ${year}`;
  }

  // navigateToEdit(game: any) {
  //   this.router.navigate(['./add'], { relativeTo: this.route, queryParams: { gameId: game.id }, state: { game: game } });
  // }

}
