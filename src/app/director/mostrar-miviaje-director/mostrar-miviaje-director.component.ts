import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-miviaje-director',
  templateUrl: './mostrar-miviaje-director.component.html',
  styleUrls: ['./mostrar-miviaje-director.component.css']
})
export class MostrarMiviajeDirectorComponent {

  constructor(private router:Router){}


  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado: PENDIENTE',
      showCancelButton: false,
      confirmButtonColor: 'purple'
    })
  }

  close()
  {
    let timerInterval = 0;

    Swal.fire({
      title: '¿Seguro de cerrar viaje?',
      text: 'Al cerrar viaje ya no podrás registrar y modificar ningun gasto.',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Cerrar viaje',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          iconColor: 'green',
          title: 'Cerrando viaje',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1850,
          timerProgressBar: true,
          willClose:() =>{
            clearInterval(timerInterval)
          }
        }).then((res) => {
          if(res.dismiss === Swal.DismissReason.timer)
          {
            this.router.navigate(['/Director/Home']);
          }
        })
      }
    })
  }
}
