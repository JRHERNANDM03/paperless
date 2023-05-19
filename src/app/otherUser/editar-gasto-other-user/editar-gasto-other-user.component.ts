import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-gasto-other-user',
  templateUrl: './editar-gasto-other-user.component.html',
  styleUrls: ['./editar-gasto-other-user.component.css']
})
export class EditarGastoOtherUserComponent {

  constructor (private router:Router){}

  update(){
   // this.router.navigate(["/ViajeroHome"])
   let timerInterval=0;
   Swal.fire({
    icon: 'success',
    iconColor: '#E7EA1A',
    title: 'Registro actualizado con exito',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#2A46D7', 
   }).then((result) => {
    if(result.isConfirmed)
    {
      this.router.navigate(["/otherUser/Gastos"])
    }
   })
  
  }

}
