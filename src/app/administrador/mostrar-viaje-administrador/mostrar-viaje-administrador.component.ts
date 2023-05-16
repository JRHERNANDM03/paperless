import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje-administrador',
  templateUrl: './mostrar-viaje-administrador.component.html',
  styleUrls: ['./mostrar-viaje-administrador.component.css']
})
export class MostrarViajeAdministradorComponent {

  constructor (private router:Router){}

  gastos()
  {
    this.router.navigate(["/Administrador/Gastos"])
  }

}
