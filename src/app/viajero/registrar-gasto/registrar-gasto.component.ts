import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-gasto',
  templateUrl: './registrar-gasto.component.html',
  styleUrls: ['./registrar-gasto.component.css']
})
export class RegistrarGastoComponent implements OnInit {

  constructor (private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
        
      }
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
    this.router.navigate(["/Viajero/Gastos"])
  }
 })

}

logout()
{
  Swal.fire({
    title: 'Estás seguro de cerrar sesión',
    showConfirmButton: true,
    confirmButtonText: 'Cerrar Sesión',
    confirmButtonColor: 'purple',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: 'orange',
    showDenyButton: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false
  }).then((result) => {
    if(result.isConfirmed)
    {
        this.auth.logout()
    }
  })
}

}
