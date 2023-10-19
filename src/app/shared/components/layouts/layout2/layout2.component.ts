import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.css']
})
export class Layout2Component {

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
  
}
