export interface Usuario {
  Id: number;
  Identidad: string;
  Nombre: string;
  Apellido: string;
  Correo: string;
  Activo: boolean;
  NombreUsuario: string;
  RolId: number;
  CambioContrasena: boolean;
}
