import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-detalles-gastos-administrador',
  templateUrl: './mostrar-detalles-gastos-administrador.component.html',
  styleUrls: ['./mostrar-detalles-gastos-administrador.component.css']
})
export class MostrarDetallesGastosAdministradorComponent implements OnInit{

  constructor (private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){}
    })
  }
  
  estado()
  {
    Swal.fire({
      icon: 'info',
      title: 'Puedes enviar un comentario',
      input: 'textarea',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'green',
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true
    }).then((respuesta) => {
      if(respuesta.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Gasto Aprobado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: 'blue',
        }).then((res) => 
        {
          if(res)
          {
            this.router.navigate(["/Administrador/Gastos"])
          }
        })
      }
      else if(respuesta.isDenied)
      {
        Swal.fire({
          icon: 'success',
          iconColor: '#FF0000',
          title: 'Gasto Rechazado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: 'blue',
        }).then((res) => 
        {
          if(res)
          {
            this.router.navigate(["/Administrador/Gastos"])
          }
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
