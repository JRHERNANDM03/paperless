import { Component } from '@angular/core';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-d-numero-viaje',
  templateUrl: './d-numero-viaje.component.html',
  styleUrls: ['./d-numero-viaje.component.css']
})
export class DNumeroViajeComponent {

  styleDisplay = 'none';

  listar()
  {
    this.styleDisplay='block';
  }

  aprovate()
  {
    let timerInterval = 0;

    Swal.fire({
      title: '¿Aprobar viaje?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'purple',
      showCloseButton: false,
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
          showCancelButton: false,
          showConfirmButton: false,
          willClose:() => {
            clearInterval(timerInterval)
          }
        }).then((res) => {
          if(res.dismiss === Swal.DismissReason.timer)
          {

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
          confirmButtonText: 'Ok',
          confirmButtonColor: 'blue'
        })
      }
    })
  }
}
