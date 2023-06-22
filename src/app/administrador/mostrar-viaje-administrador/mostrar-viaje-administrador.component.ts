import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje-administrador',
  templateUrl: './mostrar-viaje-administrador.component.html',
  styleUrls: ['./mostrar-viaje-administrador.component.css']
})
export class MostrarViajeAdministradorComponent implements OnInit {

  constructor (private router:Router, public auth: AuthService){}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthentica => {
    if(!isAuthentica)
    {
      this.errLog()
    }else if(isAuthentica){}
  })
}

  gastos()
  {
    this.router.navigate(["/Administrador/Gastos"])
  }

  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado: APROBADO',
      showCancelButton: false,
      confirmButtonColor: 'purple'
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
