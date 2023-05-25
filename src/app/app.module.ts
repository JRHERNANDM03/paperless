import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Rutas
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/login/index.component';
import { HomeComponent } from './viajero/home/home.component';

import { RouterModule } from '@angular/router';
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
import { HomeAdministradorComponent } from './administrador/home-administrador/home-administrador.component';
import { MostrarViajeAdministradorComponent } from './administrador/mostrar-viaje-administrador/mostrar-viaje-administrador.component';
import { MostrarGastosAdministradorComponent } from './administrador/mostrar-gastos-administrador/mostrar-gastos-administrador.component';
import { MostrarDetallesGastosAdministradorComponent } from './administrador/mostrar-detalles-gastos-administrador/mostrar-detalles-gastos-administrador.component';
import { ANumeroViajeComponent } from './administrador/filtros/a-numero-viaje/a-numero-viaje.component';
import { AFechaComponent } from './administrador/filtros/a-fecha/a-fecha.component';
import { HomeOtherUserComponent } from './otherUser/home-other-user/home-other-user.component';
import { OtherEstadoComponent } from './otherUser/filtros/other-estado/other-estado.component';
import { OtherFechaComponent } from './otherUser/filtros/other-fecha/other-fecha.component';
import { OtherNumeroViajeComponent } from './otherUser/filtros/other-numero-viaje/other-numero-viaje.component';
import { MostrarViajeOtherUserComponent } from './otherUser/mostrar-viaje-other-user/mostrar-viaje-other-user.component';
import { DetalleGastoOtherUserComponent } from './otherUser/detalle-gasto-other-user/detalle-gasto-other-user.component';
import { MostrarGastoOtherUserComponent } from './otherUser/mostrar-gasto-other-user/mostrar-gasto-other-user.component';
import { RegistrarGastoOtherUserComponent } from './otherUser/registrar-gasto-other-user/registrar-gasto-other-user.component';
import { EditarGastoOtherUserComponent } from './otherUser/editar-gasto-other-user/editar-gasto-other-user.component';
import { ShowFileComponent } from './file/show-file/show-file.component';
import { MostrarMiviajeDirectorComponent } from './director/mostrar-miviaje-director/mostrar-miviaje-director.component';
import { PendientesHomeComponent } from './director/pendientes-home/pendientes-home.component';
import { MostrarDetallesMisGastosDirectorComponent } from './director/mostrar-detalles-mis-gastos-director/mostrar-detalles-mis-gastos-director.component';
import { MostrarMisGastosDirectorComponent } from './director/mostrar-mis-gastos-director/mostrar-mis-gastos-director.component';
import { RegistrarGastoDirectorComponent } from './director/registrar-gasto-director/registrar-gasto-director.component';
import { EditarGastoDirectorComponent } from './director/editar-gasto-director/editar-gasto-director.component';
import { GastosHomeComponent } from './administrador/gastos-home/gastos-home.component';
import { MostrarMisviajesAdministradorComponent } from './administrador/mostrar-misviajes-administrador/mostrar-misviajes-administrador.component';
import { MostrarMiviajeAdministradorComponent } from './administrador/mostrar-miviaje-administrador/mostrar-miviaje-administrador.component';
import { MostrarMisGastosAdministradorComponent } from './administrador/mostrar-mis-gastos-administrador/mostrar-mis-gastos-administrador.component';
import { MostrarDetallesMisGastosAdministradorComponent } from './administrador/mostrar-detalles-mis-gastos-administrador/mostrar-detalles-mis-gastos-administrador.component';
import { RegistrarGastoAdministradorComponent } from './administrador/registrar-gasto-administrador/registrar-gasto-administrador.component';
import { EditarGastoAdministradorComponent } from './administrador/editar-gasto-administrador/editar-gasto-administrador.component';
import { RespuestaFormularioAdministradorComponent } from './administrador/respuesta-formulario-administrador/respuesta-formulario-administrador.component';
import { AEstadosComponent } from './administrador/filtros/a-estados/a-estados.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    MostrarViajeComponent,
    MostrarGastoComponent,
    DetallesGastoComponent,
    RegistrarGastoComponent,
    EditarGastoComponent,
    NumeroViajeComponent,
    FechaComponent,
    EstadoComponent,
    HomeDirectorComponent,
    MostrarViajeDirectorComponent,
    MostrarGastosDirectorComponent,
    MostrarDetallesGastosDirectorComponent,
    DNumeroEmpleadoComponent,
    DNumeroViajeComponent,
    DFechaComponent,
    DEstadoComponent,
    HomeAdministradorComponent,
    MostrarViajeAdministradorComponent,
    MostrarGastosAdministradorComponent,
    MostrarDetallesGastosAdministradorComponent,
    ANumeroViajeComponent,
    AFechaComponent,
    HomeOtherUserComponent,
    OtherEstadoComponent,
    OtherFechaComponent,
    OtherNumeroViajeComponent,
    MostrarViajeOtherUserComponent,
    DetalleGastoOtherUserComponent,
    MostrarGastoOtherUserComponent,
    RegistrarGastoOtherUserComponent,
    EditarGastoOtherUserComponent,
    ShowFileComponent,
    MostrarMiviajeDirectorComponent,
    PendientesHomeComponent,
    MostrarDetallesMisGastosDirectorComponent,
    MostrarMisGastosDirectorComponent,
    RegistrarGastoDirectorComponent,
    EditarGastoDirectorComponent,
    GastosHomeComponent,
    MostrarMisviajesAdministradorComponent,
    MostrarMiviajeAdministradorComponent,
    MostrarMisGastosAdministradorComponent,
    MostrarDetallesMisGastosAdministradorComponent,
    RegistrarGastoAdministradorComponent,
    EditarGastoAdministradorComponent,
    RespuestaFormularioAdministradorComponent,
    AEstadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
