import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-error',
  templateUrl: './access-error.component.html',
  styleUrls: ['./access-error.component.css']
})
export class AccessErrorComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService){}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.router.navigate(['login'])
    }else if(isAuthenticate)
    {
      this.error_alert();
    }
  })
}

error_alert()
{
  Swal.fire({
    title: 'Error de Acceso',
    icon: 'error',
  padding: '3em',
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'Ok 👍',
  backdrop: 'rgba(201,159,205)',
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,
  confirmButtonColor: '#73246D'
  }).then(result => {
    if(result.isConfirmed)
    {
      this.auth.logout()
    }
  })
}
}
