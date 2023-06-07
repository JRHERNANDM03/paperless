import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-miviaje-administrador',
  templateUrl: './mostrar-miviaje-administrador.component.html',
  styleUrls: ['./mostrar-miviaje-administrador.component.css']
})
export class MostrarMiviajeAdministradorComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){}
    })
  }

  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado PENDIENTE',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    })
  }

  close()
  {
    Swal.fire({
      icon: 'question',
      iconColor: '#F25F29',
      title: '¿Cerrar Viaje?',
      text: 'Al cerrar el viaje ya no podrás agregar y/o editar gastos',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar Viaje',
      confirmButtonColor: '#F25F29'
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Cerrando viaje',
          timer: 1800,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false
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
