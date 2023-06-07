import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/login/index.component';
import { HomeComponent } from './viajero/home/home.component';
import { MostrarViajeComponent } from './viajero/mostrar-viaje/mostrar-viaje.component';
import { MostrarGastoComponent } from './viajero/mostrar-gasto/mostrar-gasto.component';
import { DetallesGastoComponent } from './viajero/detalles-gasto/detalles-gasto.component';
import { RegistrarGastoComponent } from './viajero/registrar-gasto/registrar-gasto.component';
import { EditarGastoComponent } from './viajero/editar-gasto/editar-gasto.component';
import { NumeroViajeComponent } from './viajero/filtros/numero-viaje/numero-viaje.component';
import { FechaComponent } from './viajero/filtros/fecha/fecha.component';
import { EstadoComponent } from './viajero/filtros/estado/estado.component';
import { HomeDirectorComponent } from './director/home-director/home-director.component';
import { MostrarViajeDirectorComponent } from './director/mostrar-viaje-director/mostrar-viaje-director.component';
import { MostrarGastosDirectorComponent } from './director/mostrar-gastos-director/mostrar-gastos-director.component';
import { MostrarDetallesGastosDirectorComponent } from './director/mostrar-detalles-gastos-director/mostrar-detalles-gastos-director.component';
import { DNumeroEmpleadoComponent } from './director/filtros/d-numero-empleado/d-numero-empleado.component';
import { DNumeroViajeComponent } from './director/filtros/d-numero-viaje/d-numero-viaje.component';
import { DFechaComponent } from './director/filtros/d-fecha/d-fecha.component';
import { DEstadoComponent } from './director/filtros/d-estado/d-estado.component';
import { MostrarMiviajeDirectorComponent } from './director/mostrar-miviaje-director/mostrar-miviaje-director.component';
import { PendientesHomeComponent } from './director/pendientes-home/pendientes-home.component';
import { MostrarDetallesMisGastosDirectorComponent } from './director/mostrar-detalles-mis-gastos-director/mostrar-detalles-mis-gastos-director.component';
import { MostrarMisGastosDirectorComponent } from './director/mostrar-mis-gastos-director/mostrar-mis-gastos-director.component';
import { RegistrarGastoDirectorComponent } from './director/registrar-gasto-director/registrar-gasto-director.component';
import { EditarGastoDirectorComponent } from './director/editar-gasto-director/editar-gasto-director.component';
import { HomeAdministradorComponent } from './administrador/home-administrador/home-administrador.component';
import { MostrarViajeAdministradorComponent } from './administrador/mostrar-viaje-administrador/mostrar-viaje-administrador.component';
import { MostrarGastosAdministradorComponent } from './administrador/mostrar-gastos-administrador/mostrar-gastos-administrador.component';
import { MostrarDetallesGastosAdministradorComponent } from './administrador/mostrar-detalles-gastos-administrador/mostrar-detalles-gastos-administrador.component';
import { AEstadosComponent } from './administrador/filtros/a-estados/a-estados.component';
import { ANumeroViajeComponent } from './administrador/filtros/a-numero-viaje/a-numero-viaje.component';
import { AFechaComponent } from './administrador/filtros/a-fecha/a-fecha.component';
import { GastosHomeComponent } from './administrador/gastos-home/gastos-home.component';
import { EditarGastoAdministradorComponent } from './administrador/editar-gasto-administrador/editar-gasto-administrador.component';
import { MostrarDetallesMisGastosAdministradorComponent } from './administrador/mostrar-detalles-mis-gastos-administrador/mostrar-detalles-mis-gastos-administrador.component';
import { MostrarMisGastosAdministradorComponent } from './administrador/mostrar-mis-gastos-administrador/mostrar-mis-gastos-administrador.component';
import { MostrarMisviajesAdministradorComponent } from './administrador/mostrar-misviajes-administrador/mostrar-misviajes-administrador.component';
import { MostrarMiviajeAdministradorComponent } from './administrador/mostrar-miviaje-administrador/mostrar-miviaje-administrador.component';
import { RegistrarGastoAdministradorComponent } from './administrador/registrar-gasto-administrador/registrar-gasto-administrador.component';
import { RespuestaFormularioAdministradorComponent } from './administrador/respuesta-formulario-administrador/respuesta-formulario-administrador.component';
import { HomeChangeUserComponent } from './viajero/home-change-user/home-change-user.component';
import { HomeOtherUserComponent } from './otherUser/home-other-user/home-other-user.component';
import { MostrarViajeOtherUserComponent } from './otherUser/mostrar-viaje-other-user/mostrar-viaje-other-user.component';
import { MostrarGastoOtherUserComponent } from './otherUser/mostrar-gasto-other-user/mostrar-gasto-other-user.component';
import { DetalleGastoOtherUserComponent } from './otherUser/detalle-gasto-other-user/detalle-gasto-other-user.component';
import { OtherEstadoComponent } from './otherUser/filtros/other-estado/other-estado.component';
import { OtherFechaComponent } from './otherUser/filtros/other-fecha/other-fecha.component';
import { OtherNumeroViajeComponent } from './otherUser/filtros/other-numero-viaje/other-numero-viaje.component';
import { RegistrarGastoOtherUserComponent } from './otherUser/registrar-gasto-other-user/registrar-gasto-other-user.component';
import { EditarGastoOtherUserComponent } from './otherUser/editar-gasto-other-user/editar-gasto-other-user.component';
import { ShowFileComponent } from './file/show-file/show-file.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:IndexComponent},
  { path:'Viajero/Home', component:HomeComponent},
  { path:'Viajero/Viaje', component:MostrarViajeComponent},
  { path:'Viajero/Gastos', component:MostrarGastoComponent},
  { path:'Viajero/Detalles/Gasto', component:DetallesGastoComponent},
  { path:'Viajero/Registrar/Gasto', component:RegistrarGastoComponent},
  { path:'Viajero/Editar/Gasto', component:EditarGastoComponent},
  { path:'Viajero/Filtro/NumeroViaje', component:NumeroViajeComponent},
  { path:'Viajero/Filtro/Fecha', component:FechaComponent},
  { path:'Viajero/Filtro/Estado', component:EstadoComponent},
  { path:'Viajero/CambiarUsuaro', component:HomeChangeUserComponent},
  { path:'Director/Home', component:HomeDirectorComponent},
  { path:'Director/Viaje', component:MostrarViajeDirectorComponent},
  { path:'Director/Gastos', component:MostrarGastosDirectorComponent},
  { path:'Director/Detalles/Gastos', component:MostrarDetallesGastosDirectorComponent},
  { path:'Director/Filtro/NumeroEmpleado', component:DNumeroEmpleadoComponent},
  { path:'Director/Filtro/NumeroViaje', component:DNumeroViajeComponent},
  { path:'Director/Filtro/Fecha', component:DFechaComponent},
  { path:'Director/Filtro/Estado', component:DEstadoComponent},
  { path:'Director/Mi-Viaje', component:MostrarMiviajeDirectorComponent},
  { path:'Director/Pendientes', component:PendientesHomeComponent},
  { path:'Director/Mis-Gastos', component:MostrarMisGastosDirectorComponent},
  { path:'Director/Detalles/Mis-Gastos', component:MostrarDetallesMisGastosDirectorComponent},
  { path:'Director/Registrar/Gasto', component:RegistrarGastoDirectorComponent},
  { path:'Director/Editar/Gasto', component:EditarGastoDirectorComponent},
  { path:'Administrador/Home', component:HomeAdministradorComponent},
  { path:'Administrador/Viaje', component:MostrarViajeAdministradorComponent},
  { path:'Administrador/Gastos', component:MostrarGastosAdministradorComponent},
  { path:'Administrador/Detalles/Gastos', component:MostrarDetallesGastosAdministradorComponent},
  { path:'Administrador/Filtro/Estado', component:AEstadosComponent},
  { path:'Administrador/Filtro/NumeroViaje', component:ANumeroViajeComponent},
  { path:'Administrador/Filtro/Fecha', component:AFechaComponent},
  { path:'Administrador/Gastos-Pendientes', component:GastosHomeComponent},
  { path:'Administrador/Editar/Gasto', component:EditarGastoAdministradorComponent},
  { path:'Administrador/Detalles/Mis-Gastos', component:MostrarDetallesMisGastosAdministradorComponent},
  { path:'Administrador/Mis-Gastos', component:MostrarMisGastosAdministradorComponent},
  { path:'Administrador/Mis-Viajes', component:MostrarMisviajesAdministradorComponent},
  { path:'Administrador/Detalle/Viaje', component:MostrarMiviajeAdministradorComponent},
  { path:'Administrador/Registrar/Gasto', component:RegistrarGastoAdministradorComponent},
  { path:'Administrador/Answer', component:RespuestaFormularioAdministradorComponent},  
  { path:'otherUser/Home', component:HomeOtherUserComponent},
  { path:'otherUser/Viaje', component:MostrarViajeOtherUserComponent},
  { path:'otherUser/Gastos', component:MostrarGastoOtherUserComponent},
  { path:'otherUser/Filtros/Fecha', component:OtherFechaComponent},
  { path:'otherUser/Filtros/Estado', component:OtherEstadoComponent},
  { path:'otherUser/Filtros/NumeroViaje', component:OtherNumeroViajeComponent},
  { path:'otherUser/Detalles/Gasto', component:DetalleGastoOtherUserComponent},
  { path:'otherUser/Registrar/Gasto', component:RegistrarGastoOtherUserComponent},
  { path:'otherUser/Editar/Gasto', component:EditarGastoOtherUserComponent},
  { path:'showFile', component:ShowFileComponent},
  { path:'***', redirectTo:'inicio', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
