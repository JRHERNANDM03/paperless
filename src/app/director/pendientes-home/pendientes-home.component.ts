import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pendientes-home',
  templateUrl: './pendientes-home.component.html',
  styleUrls: ['./pendientes-home.component.css']
})
export class PendientesHomeComponent {

  aprobar()
  {
    let timerInterval=0;

    Swal.fire({
      title: '¿Aprobar Viaje?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'APROBAR',
      cancelButtonText: 'Cancelar'
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
            
          }
          })
      }
    })
  }


}
