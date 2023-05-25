import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-detalles-gastos-administrador',
  templateUrl: './mostrar-detalles-gastos-administrador.component.html',
  styleUrls: ['./mostrar-detalles-gastos-administrador.component.css']
})
export class MostrarDetallesGastosAdministradorComponent {

  constructor (private router:Router){}
  
  estado()
  {
    Swal.fire({
      icon: 'info',
      title: 'Puedes enviar un comentario',
      input: 'textarea',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'green',
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true
    }).then((respuesta) => {
      if(respuesta.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Gasto Aprobado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: 'blue',
        }).then((res) => 
        {
          if(res)
          {
            this.router.navigate(["/Administrador/Gastos"])
          }
        })
      }
      else if(respuesta.isDenied)
      {
        Swal.fire({
          icon: 'success',
          iconColor: '#FF0000',
          title: 'Gasto Rechazado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: 'blue',
        }).then((res) => 
        {
          if(res)
          {
            this.router.navigate(["/Administrador/Gastos"])
          }
        })
      }
    })
  }
}
