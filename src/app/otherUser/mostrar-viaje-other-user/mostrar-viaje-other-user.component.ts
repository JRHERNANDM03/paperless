import { Component } from '@angular/core';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje-other-user',
  templateUrl: './mostrar-viaje-other-user.component.html',
  styleUrls: ['./mostrar-viaje-other-user.component.css']
})
export class MostrarViajeOtherUserComponent {


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
