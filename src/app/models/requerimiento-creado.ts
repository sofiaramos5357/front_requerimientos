export interface RequerimientoCreado    {
    Id: number,
    Descripcion: string,
    Objetivo: string,
    FechaCreacion: Date,
    UsuarioIdCreador: number,
    SistemaId: number,
    UsuarioIdElaborador: number,
    RequerimientoEstadoId:number
    NombreCreador:String,
    ApellidoCreador:String,
    NombreSistema:String,
	NombreElaborador:String,
    ApellidoElaborador:String,
	Estado:String,
    ObservacionesRevision?:string,
    FechaEntrega?:string
}