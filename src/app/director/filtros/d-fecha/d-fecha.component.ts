import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-fecha',
  templateUrl: './d-fecha.component.html',
  styleUrls: ['./d-fecha.component.css']
})
export class DFechaComponent {

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
      showConfirmButton: true,
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'purple',
      showDenyButton: true,
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Viaje aprobado',
          timer: 2000,
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
