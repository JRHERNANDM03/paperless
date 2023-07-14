import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

interface user 
{
  PERNR: number;
}

interface head 
{
  id: number;
  zort1: string;
  reinr: string;
  pernr: string;
  datv1: string;
  uhrv1: string;
  auth: number;
}

@Component({
  selector: 'app-numero-viaje',
  templateUrl: './numero-viaje.component.html',
  styleUrls: ['./numero-viaje.component.css']
})
export class NumeroViajeComponent implements OnInit{

nickname: string = '';
pernrUser!: number;

reinrN: string = '';

idH!: number;
zort1: string = '';
reinrH: string = '';
pernrH!: string;
datv1: string = '';
uhrv1: string = '';
authorized!: number;

constructor(public auth:AuthService, private router: Router, private http: HttpClient){}

styleDisplay = 'none';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAutenticate => {
      if(!isAutenticate)
      {
        this.router.navigate(['login'])
      }else if(isAutenticate)
      {
        this.auth.user$.subscribe(info => {
          this.nickname = String(info?.nickname);
          this.getPERNR(this.nickname)
        })
      }
    })
  }

  formValid(): boolean {
    // Verificar si los campos requeridos están llenados
    if (
      
      this.reinrN
    ) {
      return true; // Todos los campos están llenados
    } else {
      return false; // Al menos un campo requerido está vacío
    }
  }

getPERNR(nickname: string)
{
  this.http.get<user>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
    this.pernrUser = data.PERNR;
  })
}


submitForm() {
  this.http.get<head>('http://localhost:3000/PTRV_HEAD/' + this.reinrN).subscribe(
    data => {
      if (data) {
        this.idH = data.id;
        this.zort1 = data.zort1;
        this.reinrH = data.reinr;
        this.pernrH = data.pernr;
        this.datv1 = data.datv1;
        this.uhrv1 = data.uhrv1;
        this.authorized = data.auth;

        //console.log('ID', data.id)

        this.validate(data.pernr);
      } else {
        alert('No se encontraron registros.');
      }
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'No estás afiliado a este viaje'
      })
    }
  );
}

getEstado(auth: number): string {
  if (auth === 0) {
    return 'Pendiente';
  } else if (auth === 1) { 
    return 'Aprobado';
  } else if (auth === 2) {
    return 'Rechazado';
  } else {
    return 'Desconocido';
  }
}


validate(pernr: string)
{
  var new_pernr = Number(pernr);
  
  if(new_pernr === this.pernrUser)
  {
    this.listar()
  }
  else
  {
    Swal.fire({
      icon: 'error',
      title: 'No estás afiliado a este viaje'
    })
  }
}

detail(id: number)
{
  this.router.navigate(['/Viajero/Viaje'], {queryParams: {id:id}})
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
