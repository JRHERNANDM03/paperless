import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-gasto-other-user',
  templateUrl: './registrar-gasto-other-user.component.html',
  styleUrls: ['./registrar-gasto-other-user.component.css']
})
export class RegistrarGastoOtherUserComponent implements OnInit {


  constructor (private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){}
    })
  }

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
