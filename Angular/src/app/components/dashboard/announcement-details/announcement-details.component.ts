import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<AnnouncementDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public announcement: any
  ) { }
  
  
}
