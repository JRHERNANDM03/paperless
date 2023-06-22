import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-numero-viaje',
  templateUrl: './numero-viaje.component.html',
  styleUrls: ['./numero-viaje.component.css']
})
export class NumeroViajeComponent implements OnInit{

constructor(public auth:AuthService, private router: Router){}

styleDisplay = 'none';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAutenticate => {
      if(!isAutenticate)
      {
        this.router.navigate(['login'])
      }else if(isAutenticate)
      {

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

  listar()
  {
    this.styleDisplay='block'
  }

}
