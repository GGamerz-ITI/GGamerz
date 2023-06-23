import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  updatedGameName: string = "Update Game";
  selectedSingleImage: File | undefined;
  gameForm!: FormGroup;
  selectedImages: string[] = [];
  updatedDescription!: string;
  updatedName!: string;
  updatedPrice!: number;
  updatedPoints!: number;
  game: any;
  updatedProductId!: string;
  updatedValues!: any
  updatedTags: string[] = [];
  updatedTypes: string[] = [];
  updatedOs: string[] = [];
  updatedImages: string[] = [];

  tagsList = ['action', 'funny', 'sports', 'adventure', 'horror', "war", "combat", "fantasy"];
  typesList = ['multiplayer', 'singleplayer'];
  osList = ['linux', 'mac', 'windows'];

  constructor(
    private toastr: ToastrService,
    public gamesService: GamesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      name: new FormControl(),
      price: new FormControl(),
      points: new FormControl(),
      tags: new FormControl(),
      types: new FormControl(),
      os: new FormControl(),
      character: new FormControl(),
      description: new FormControl(),
      imageURL: this.formBuilder.array([]),
    });

    this.updatedProductId = this.route.snapshot.params["id"];

    this.gamesService.GetGameByID(this.updatedProductId).subscribe({
      next: (data: any) => {
        this.game = data;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });

    const tagControl = this.gameForm.get('tags');
    if (tagControl) {
      tagControl.valueChanges.subscribe((selectedTags: string[]) => {
        this.updatedTags = selectedTags;
      });
      console.log(this.updatedTags)
    }
    const typeControl = this.gameForm.get('types');
    if (typeControl) {
      typeControl.valueChanges.subscribe((selectedTypes: string[]) => {
        this.updatedTypes = selectedTypes;
      });
      console.log(this.updatedTypes)
    }
    const osControl = this.gameForm.get('os');
    if (osControl) {
      osControl.valueChanges.subscribe((selectedOs: string[]) => {
        this.updatedOs = selectedOs;
      });
      console.log(this.updatedOs)
    }
  }


  onChangeFile(event: any) {
    const files = event.target.files;
    this.selectedImages = [];
    console.log(event.target)
    console.log("tesssss")
    const imagesControl = this.gameForm.get('imageURL') as FormArray;
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
      imagesControl.push(this.formBuilder.control(files[i]));
    }
  }

  onSingleImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedSingleImage = file;
    }
  }

  update() {
    const formData = new FormData();
    if (this.gameForm.valid) {
      this.updatedValues = this.gameForm.value;
      console.log(this.game)

      this.gameForm.value.name == this.game.name || this.gameForm.value.name == null ? this.updatedName = this.game.name : this.updatedName = this.gameForm.value.name;
      this.gameForm.value.price == this.game.price || this.gameForm.value.price == null ? this.updatedPrice = this.game.price : this.updatedPrice = this.gameForm.value.price;
      this.gameForm.value.price == this.game.price || this.gameForm.value.price == null ? this.updatedPoints = this.game.price : this.updatedPoints = this.gameForm.value.price;
      this.gameForm.value.description == this.game.description || this.gameForm.value.description == null ? this.updatedDescription = this.game.description : this.updatedDescription = this.gameForm.value.description;
      formData.append('name', this.updatedName);
      formData.append('description', this.updatedDescription);
      formData.append('price', this.updatedPrice.toString());
      formData.append('points', this.updatedPoints.toString());





      // console.log(this.updatedTypes)
      if (this.updatedTags.length === 0) {
        if (typeof (this.game.tags) == 'string') {
          this.updatedTags.push(this.game.tags)
        } else {
          this.updatedTags = [...this.game.tags];

        }
      }

      for (let tag of this.updatedTags) {
        formData.append('tags', tag);
      }

      if (this.updatedTypes.length == 0) {
        if (typeof (this.game.types) == 'string') {
          this.updatedTypes.push(this.game.types)
        }
        else {
          this.updatedTypes = [...this.game.types]
        }
      }

      for (let type of this.updatedTypes) {
        formData.append('types', type);
      }

      if (this.updatedOs.length === 0) {
        if (typeof (this.game.os) == 'string') {
          this.updatedOs.push(this.game.os)
        } else {
          this.updatedOs = [...this.game.os];

        }
      }

      for (let os of this.updatedOs) {
        formData.append('os', os);
      }

      if (this.selectedImages.length == 0) {
        this.updatedImages = this.game.images
        console.log(this.updatedImages)
      }
      else {
        this.updatedImages = this.selectedImages
        console.log(this.update)
      }

      for (let images of this.updatedImages) {
        formData.append('imageURL', images);
      }

      if (this.selectedSingleImage) {
        formData.append('character', this.selectedSingleImage);
      } else {
        // If no new image is selected, use the old value
        formData.append('character', this.game.character);
      }

      formData.forEach((value, key) => {
        console.log(key + ": " + value);
      });

      this.gamesService.updateProduct(this.updatedProductId, formData).subscribe({
        next: () => {

          this.toastr.success("Product updated successfully", "Feedback");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);

          console.log("done")
          this.router.navigate(['/dashboard/games/' + this.updatedProductId]);
        },
        error: (err) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }
      })

    }
  }

}
