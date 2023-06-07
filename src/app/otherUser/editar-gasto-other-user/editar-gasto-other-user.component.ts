import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-gasto-other-user',
  templateUrl: './editar-gasto-other-user.component.html',
  styleUrls: ['./editar-gasto-other-user.component.css']
})
export class EditarGastoOtherUserComponent implements OnInit {

  constructor (private router:Router, public auth:AuthService){}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthentica => {
    if(!isAuthentica)
    {
      this.router.navigate(['login'])
    }else if(isAuthentica){}
  })
}

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
