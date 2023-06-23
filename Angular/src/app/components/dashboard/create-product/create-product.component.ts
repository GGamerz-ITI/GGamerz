import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent  {

  createdGame: string = "New Game";
  gameForm!: FormGroup;
  // selectedImage: File | undefined;
  selectedSingleImage: File | undefined;
  selectedImages:string[] = [];
  selectedCharacter:string[] = [];
  selectedTags:string[] = [];
  selectedType:string[] = [];
  selectedOs:string[] = [];
  updatedTags:string[]=[];
  updatedTypes:string[]=[];
  updatedOs:string[]=[];
  tagsList = ['Action', 'funny', 'sports','adventure','horror',"war","combat","fantasy"];
  typesList = ['multiplayer', 'singleplayer'];
  osList = ['linux', 'mac', 'windows'];


  constructor(private toastr: ToastrService,public gamesService: GamesService,  private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {

    this.gameForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      points: new FormControl(null, Validators.required),
      tag: new FormControl([], Validators.required),
      type: new FormControl([], Validators.required),
      os: new FormControl([], Validators.required),
      description: new FormControl(null, Validators.required),
      imageURL: this.formBuilder.array([]),
      character: new FormControl(null),
    });

    const tagControl = this.gameForm.get('tag');
    if (tagControl) {
      tagControl.valueChanges.subscribe((selectedTags: string[]) => {
        this.updatedTags = selectedTags;
      });
      console.log(this.updatedTags)
    }
    const typeControl = this.gameForm.get('type');
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
    // console.log(event.target)
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


  // onImageChange(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   if (target.files && target.files.length > 0) {
  //     this.selectedImage = target.files[0];
  //   }
  // }
  
  add(){
        const formData = new FormData();
        // console.log('in function')
        if (this.gameForm.valid) {
          for(let image of this.selectedImages){
            formData.append('imageURL', image);
          }
          //////
          for(let tag of this.updatedTags){
            formData.append('tags', tag);
          }
          console.log(this.updatedTags)
          //////
          for(let type of this.updatedTypes){
            formData.append('types', type);
          }
          ///////
          for(let os of this.updatedOs){
            formData.append('os', os);
          }
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          formData.append('releaseDate', formattedDate);
          formData.append('name', this.gameForm.get('name')!.value);
          formData.append('price', this.gameForm.get('price')!.value);
          formData.append('points', this.gameForm.get('points')!.value);
          formData.append('description', this.gameForm.get('description')!.value);
          
          if (this.selectedSingleImage) {
            formData.append('character', this.selectedSingleImage);
          }

              console.log(formData);

          this.gamesService.AddNewProduct( formData).subscribe({
            next:()=>{
              this.toastr.info("product will be created shortly", "create product");
      setTimeout(() => {
        this.toastr.clear()},3000);
              this.router.navigate(['/dashboard/games']);
            }
            ,
            error:(err)=>{
              this.toastr.error(err, "Error");
              setTimeout(() => {
                this.toastr.clear()
              }, 3000);
            }
          });
     }
    else{
      console.log("Not valid")
    }
  }
}
