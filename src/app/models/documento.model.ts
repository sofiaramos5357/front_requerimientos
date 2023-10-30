export interface Documento {
  Id: number;
  Nombre: string;
  Fecha: Date;
  DocumentoURL: string;
  Activo: boolean;
  RequerimientoCambioId: number;
}
