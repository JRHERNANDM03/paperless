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

 /* estado()
  {
    Swal.fire({
      icon: 'info',
  title: 'Puedes enviar un comentario',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
    showCancelButton: true,
    confirmButtonColor: '#22B41B',
    confirmButtonText: 'APROBAR',
    cancelButtonColor: '#D60E0E',
    cancelButtonText: 'RECHAZAR',
    backdrop: true,
    allowOutsideClick: false,
    allosEscapeKey: false,
    allosEnterKey: false,
    stopKeydownPropagation: false,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      window.location="./informe_gasto.html"
    )
  }
  else
  {
    window.location="./informe_gasto.html"
  }
    })
  }*/

  estado()
  {
    Swal.fire({
      icon: 'info',
      title: 'Puedes enviar un comentario',
      input: 'textarea',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'APROBAR',
      confirmButtonColor: 'green',
      denyButtonText: 'RECHAZAR',
      denyButtonColor: 'red',
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
