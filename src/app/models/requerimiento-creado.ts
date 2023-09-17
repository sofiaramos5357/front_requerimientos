export interface RequerimientoCreado    {
    Id: number,
    Descripcion: string,
    Objetivo: string,
    FechaCreacion: Date,
    UsuarioIdCreador: number,
    SistemaId: number,
    UsuarioIdElaborador: number,
    RequerimientoEstadoId:number
}