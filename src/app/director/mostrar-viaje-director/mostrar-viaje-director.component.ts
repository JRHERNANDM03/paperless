import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje-director',
  templateUrl: './mostrar-viaje-director.component.html',
  styleUrls: ['./mostrar-viaje-director.component.css']
})
export class MostrarViajeDirectorComponent implements OnInit{

  constructor (private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){}
    })
  }

  aprobar()
  {
    let timerInterval=0;
    Swal.fire({
      title: '¿Aprobar viaje?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Aprobar',
      cancelButtonText: 'Cancelar',
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
          showConfirmButton: false,
          
          willClose: () => {
            clearInterval(timerInterval)
          }
          }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(["/Director/Pendientes"])
          
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
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  gastos()
  {
    this.router.navigate(["/Director/Gastos"])
  }

  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado: PENDIENTE',
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
