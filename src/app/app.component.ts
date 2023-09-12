import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Requerimientos';

  constructor(private crudService:CrudService, private authService:AuthService){
  }
  ngOnInit(): void {
    //this.crudService.getRoles().subscribe((res)=>{
      //console.log(res);
    //})
    //this.crudService.getUsuarios().subscribe((res)=>{
      //console.log(res);
    //})
  }
}
