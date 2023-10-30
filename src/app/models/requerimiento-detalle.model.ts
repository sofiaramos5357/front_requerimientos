export interface RequerimientoDetalle {
  Id: number;
  TipoObjetoId: number;
  Objeto: string;
  Ubicacion: string;
  Actividad: string;
  Observaciones: string;
  FechaRegistro: Date;
  RequerimientoCambioId: number;
  NombreObjeto: string;
}
