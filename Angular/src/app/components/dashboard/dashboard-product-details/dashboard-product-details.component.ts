import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-product-details',
  templateUrl: './dashboard-product-details.component.html',
  styleUrls: ['./dashboard-product-details.component.css']
})
export class DashboardProductDetailsComponent implements OnInit {
  Title: string = "Game details";
  hoveredImageUrl: string = "";
  firstImage: string = "";
  tags: string[] =[];
  types: string[] =[];
  os: string[] =[];
  currentSlideIndex = 0;
  images: GalleryItem[] = [];

  ID: any;
  game: any;

  constructor(
    private toastr: ToastrService,private route: ActivatedRoute, private gameService: GamesService) { }

  ngOnInit(): void {
    this.ID=this.route.snapshot.params["id"]
    this.loadGameDetails();
  }
  assignImages() {
    this.game.images.forEach((img: string) => {
      this.images.push(new ImageItem({ src: img, thumb: img })
      )
    
    });
  }

  loadGameDetails(): void {
    this.gameService.GetGameByID(this.ID).subscribe(
      {
        next: (data) => {
          this.game = data;
          if(typeof(this.game.tags)=="string"){
            this.tags.push (this.game.tags)
          }else{
            this.tags = this.game.tags;
          }
          if(typeof(this.game.types)=="string"){
            this.types.push (this.game.types)
          }else{
            this.types = this.game.types;
          }
          if(typeof(this.game.os)=="string"){
            this.os.push (this.game.os)
          }else{
            this.os = this.game.os;
          }
          console.log(this.tags,this.types,this.os)
          this.assignImages()
        },
        error: (err) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);         }
      }
    );
  }

  }