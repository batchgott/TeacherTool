import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-upload',
  templateUrl: './class-upload.component.html',
  styleUrls: ['./class-upload.component.scss']
})
export class ClassUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private file: string;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(reader.result);
      reader.onload = (event) => { // called once readAsDataURL is completed
       console.log(reader.result);
      }
    }
  }

}
