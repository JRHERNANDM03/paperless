import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router){}

  styleDisplay = 'none';

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
    this.styleDisplay='block';
  }

}
