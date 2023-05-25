import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-miviaje-administrador',
  templateUrl: './mostrar-miviaje-administrador.component.html',
  styleUrls: ['./mostrar-miviaje-administrador.component.css']
})
export class MostrarMiviajeAdministradorComponent {

  constructor(private router:Router){}

  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado PENDIENTE',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    })
  }

  close()
  {
    Swal.fire({
      icon: 'question',
      iconColor: '#F25F29',
      title: '¿Cerrar Viaje?',
      text: 'Al cerrar el viaje ya no podrás agregar y/o editar gastos',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar Viaje',
      confirmButtonColor: '#F25F29'
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Cerrando viaje',
          timer: 1800,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false
        })
      }
    })
  }

}
