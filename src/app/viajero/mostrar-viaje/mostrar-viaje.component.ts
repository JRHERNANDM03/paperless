import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.css']
})
export class MostrarViajeComponent implements OnInit {

  constructor(private router:Router, public auth: AuthService){}

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

  status()
  {
    Swal.fire({
      icon: 'info',
      title: 'Estado: PENDIENTE',
      showCancelButton: false,
      confirmButtonColor: 'purple'
    })
  }

  close()
  {
    Swal.fire({
      title: '¿Seguro de cerrar viaje?',
      text: 'Al cerrar viaje ya no podrás registrar y modificar ningun gasto.',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Cerrar viaje'
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.router.navigate(['/Viajero/Home'], {skipLocationChange: true})
      }
    })
  }

  logout()
  {
    this.auth.logout()
  }
}
