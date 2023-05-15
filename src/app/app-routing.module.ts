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

const routes: Routes = [
  { path:'', component:IndexComponent},
  { path:'ViajeroHome', component:HomeComponent},
  { path:'MostrarViaje', component:MostrarViajeComponent},
  { path:'MostrarGastos', component:MostrarGastoComponent},
  { path:'DetallesGasto', component:DetallesGastoComponent},
  { path:'RegistrarGasto', component:RegistrarGastoComponent},
  { path:'EditarGasto', component:EditarGastoComponent},
  { path:'Filtro_NumeroViaje', component:NumeroViajeComponent},
  { path:'Filtro_Fecha', component:FechaComponent},
  { path:'Filtro_Estado', component:EstadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
