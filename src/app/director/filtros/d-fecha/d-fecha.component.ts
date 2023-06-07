import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-fecha',
  templateUrl: './d-fecha.component.html',
  styleUrls: ['./d-fecha.component.css']
})
export class DFechaComponent implements OnInit{

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
      showConfirmButton: true,
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'purple',
      showDenyButton: true,
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Viaje aprobado',
          timer: 2000,
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
