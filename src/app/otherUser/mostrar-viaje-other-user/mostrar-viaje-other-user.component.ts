import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje-other-user',
  templateUrl: './mostrar-viaje-other-user.component.html',
  styleUrls: ['./mostrar-viaje-other-user.component.css']
})
export class MostrarViajeOtherUserComponent {

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
    Swal.fire({
      title: '¿Seguro de cerrar viaje?',
      text: 'Al cerrar viaje ya no podrás registrar y modificar ningun gasto.',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Cerrar viaje'
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.router.navigate(['/otherUser/Home'], {skipLocationChange: true})
      }
    })
  }
  
}
