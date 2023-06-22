import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-a-estados',
  templateUrl: './a-estados.component.html',
  styleUrls: ['./a-estados.component.css']
})
export class AEstadosComponent implements OnInit {

  constructor(public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){}
    })
  }

  styleDisplay = 'none';
  styleDisplay2 = 'none';
  styleDisplay3 = 'none';

listarPendient()
{
  this.styleDisplay = 'block';
  this.styleDisplay2 = 'none';
  this.styleDisplay3 = 'none';
}
listarAprovate()
{
  this.styleDisplay2 = 'block';
  this.styleDisplay = 'none';
  this.styleDisplay3 = 'none';
}
listarDeclain()
{
  this.styleDisplay3 = 'block';
  this.styleDisplay = 'none';
  this.styleDisplay2 = 'none';
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
