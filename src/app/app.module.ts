import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { ANumeroEmpleadoComponent } from './administrador/filtros/a-numero-empleado/a-numero-empleado.component';
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
    ANumeroEmpleadoComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
