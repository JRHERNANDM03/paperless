import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-gasto-administrador',
  templateUrl: './editar-gasto-administrador.component.html',
  styleUrls: ['./editar-gasto-administrador.component.css']
})
export class EditarGastoAdministradorComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){}
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
       this.router.navigate(["/Administrador/Mis-Gastos"])
     }
    })
   
   }

   errLog()
  {
    Swal.fire({
      icon: 'info',
      iconColor: 'orange',
      title: 'Cuenta no logeada',
      text: 'No hay registros de inicio de sesión',
      footer: 'Esta función permite la protección de rutas, podrá navegar en este módulo sin iniciar sesión durante el periodo de pruebas.',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'orange',
      position: 'bottom-end',
      allowOutsideClick: false,
      allowEscapeKey: false
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
