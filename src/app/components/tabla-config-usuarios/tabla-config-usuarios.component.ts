import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';
@Component({
  selector: 'app-tabla-config-usuarios',
  templateUrl: './tabla-config-usuarios.component.html',
  styleUrls: ['./tabla-config-usuarios.component.css']
})
export class TablaConfigUsuariosComponent implements OnInit{

  // usuarios: Usuario[]=[]
  // constructor(private crudService:CrudService){
  // }
  // ngOnInit(): void {
  //   this.crudService.getUsuarios().subscribe((res: Usuario[])=>{
  //     //console.log(res);
  //     this.usuarios=res    
  //   })
  // }

  usuarios: Usuario[] = [];
  roles: Rol[] = [];


  constructor(private crudService:CrudService){
  }
  ngOnInit(): void {
    this.crudService.getUsuarios().subscribe((res: Usuario[])=>{
      //console.log(res);
      this.usuarios=res   
    })

    this.crudService.getRoles().subscribe((res: Rol[])=>{
      //console.log(res);
      this.roles=res   
    })

  }

}
