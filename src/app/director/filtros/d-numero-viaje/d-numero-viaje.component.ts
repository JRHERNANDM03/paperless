import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-d-numero-viaje',
  templateUrl: './d-numero-viaje.component.html',
  styleUrls: ['./d-numero-viaje.component.css']
})
export class DNumeroViajeComponent implements OnInit{

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

  listar()
  {
    this.styleDisplay='block';
  }

  aprovate()
  {
    let timerInterval = 0;

    Swal.fire({
      title: '¿Aprobar viaje?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'purple',
      showCloseButton: false,
      showDenyButton: true,
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red'
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Viaje aprobado',
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
          willClose:() => {
            clearInterval(timerInterval)
          }
        }).then((res) => {
          if(res.dismiss === Swal.DismissReason.timer)
          {

          }
        })
      }else if(result.isDenied)
      {
        Swal.fire({
          icon: 'info',
          iconColor: 'red',
          title: 'Viaje rechazado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: 'blue'
        })
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
    this.auth.logout()
  }
}
