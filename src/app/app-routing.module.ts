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

const routes: Routes = [
  { path:'', component:IndexComponent},
  { path:'Viajero/Home', component:HomeComponent},
  { path:'Viajero/Viaje', component:MostrarViajeComponent},
  { path:'Viajero/Gastos', component:MostrarGastoComponent},
  { path:'Viajero/Detalles/Gasto', component:DetallesGastoComponent},
  { path:'Viajero/Registrar/Gasto', component:RegistrarGastoComponent},
  { path:'Viajero/Editar/Gasto', component:EditarGastoComponent},
  { path:'Viajero/Filtro/NumeroViaje', component:NumeroViajeComponent},
  { path:'Viajero/Filtro/Fecha', component:FechaComponent},
  { path:'Viajero/Filtro/Estado', component:EstadoComponent},
  { path:'Director/Home', component:HomeDirectorComponent},
  { path:'Director/Viaje', component:MostrarViajeDirectorComponent},
  { path:'Director/Gastos', component:MostrarGastosDirectorComponent},
  { path:'Director/Detalles/Gastos', component:MostrarDetallesGastosDirectorComponent},
  { path:'Director/Filtro/NumeroEmpleado', component:DNumeroEmpleadoComponent},
  { path:'Director/Filtro/NumeroViaje', component:DNumeroViajeComponent},
  { path:'Director/Filtro/Fecha', component:DFechaComponent},
  { path:'Director/Filtro/Estado', component:DEstadoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
