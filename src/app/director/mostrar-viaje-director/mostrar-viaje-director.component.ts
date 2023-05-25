import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje-director',
  templateUrl: './mostrar-viaje-director.component.html',
  styleUrls: ['./mostrar-viaje-director.component.css']
})
export class MostrarViajeDirectorComponent {

  constructor (private router:Router){}

  aprobar()
  {
    let timerInterval=0;
    Swal.fire({
      title: '¿Aprobar viaje?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Aprobar',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red'
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Viaje aprobado',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          
          willClose: () => {
            clearInterval(timerInterval)
          }
          }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(["/Director/Pendientes"])
          
          }
          })
      }else if(result.isDenied)
      {
        Swal.fire({
          icon: 'info',
          iconColor: 'red',
          title: 'Viaje rechazado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  gastos()
  {
    this.router.navigate(["/Director/Gastos"])
  }

  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado: PENDIENTE',
      showCancelButton: false,
      confirmButtonColor: 'purple'
    })
  }

}
