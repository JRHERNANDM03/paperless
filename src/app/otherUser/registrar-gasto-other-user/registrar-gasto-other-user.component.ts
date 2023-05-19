import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-gasto-other-user',
  templateUrl: './registrar-gasto-other-user.component.html',
  styleUrls: ['./registrar-gasto-other-user.component.css']
})
export class RegistrarGastoOtherUserComponent {


  constructor (private router:Router){}

  success(){
   // this.router.navigate(["/ViajeroHome"])
   let timerInterval=0;
   Swal.fire({
    icon: 'success',
    title: 'Registro almacenado con exito',
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
