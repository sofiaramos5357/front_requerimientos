import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Sistema } from 'src/app/models/sistema.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-formulario-editar-req',
  templateUrl: './formulario-editar-req.component.html',
  styleUrls: ['./formulario-editar-req.component.css']
})
export class FormularioEditarReqComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private crudService: CrudService,) { }

  datosRuta: RequerimientoCreado
  sistemas: Sistema[];
  usuarios: Usuario[];


  ngOnInit() {
    this.obtenerDatosRuta()
    this.ObtenerSistemas()
    this.obtenerElaborador()
  }

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      const requerimientoParam = params['requerimiento'];
      //console.log(requerimientoParam);
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          //  utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimiento
        } catch (error) {
          console.error("Error al analizar JSON:", error);
          // Maneja el error de análisis JSON de acuerdo a las necesidades
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }

  ObtenerSistemas() {
    //obtiene los roles y solo almacena los activos
    this.crudService.getSistemas().subscribe((res: Sistema[]) => {
      const sistemasActivos = res.filter((Sistema) => Sistema.Activo === true);
      this.sistemas = sistemasActivos;
      //console.log(this.sistemas)
    });
  }

  obtenerElaborador() {
    //obtiene los elaboradores y solo almecena los activos
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      const usuariosActivos = res.filter((Usuario) => Usuario.Activo === true && Usuario.RolId===2);
      this.usuarios = usuariosActivos;
      //console.log(this.usuarios)
    });
  }



}
