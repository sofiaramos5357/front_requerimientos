export interface Requerimiento {
  Id: number;
  Descripcion?: string;
  Objetivo?: string;
  FechaCreacion?: Date;
  FechaEntrega?: Date;
  FechaRevision?: Date;
  RequerimientoEstadoId?: number;
  UsuarioIdCreador?: number;
  SistemaId?: number;
  UsuarioIdEvaluador?: number;
  UsuarioIdElaborador?: number;
  UsuarioIdAprobador?: number;
  TiempoEstimadoHrs?: number;
  ObservacionesAprobacion?: string;
  ObservacionesRevision?: string;
  TipoCambioId?: number;
  Observaciones?: string;
}
