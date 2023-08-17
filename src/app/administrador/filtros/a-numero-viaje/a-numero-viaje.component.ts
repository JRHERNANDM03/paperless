import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface dataUser{
  PERNR: number;
  area: string;
  area_id: number;
  lastname: string;
  name: string;
  nickname: string;
  puesto: string;
  rol_id: number;
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
  selector: 'app-a-numero-viaje',
  templateUrl: './a-numero-viaje.component.html',
  styleUrls: ['./a-numero-viaje.component.css']
})
export class ANumeroViajeComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService, private http: HttpClient){}
  
  styleDisplay = 'none';
  pernrUser!: number;

  reinrN: string = '';

  idH!: number;
zort1: string = '';
reinrH: string = '';
pernrH!: string;
datv1: string = '';
uhrv1: string = '';
authorized!: number;
  
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.auth.user$.subscribe(dataUser => {
          const nickname = String(dataUser?.nickname);
          this.getDataUser(nickname)
        })
      }
    })
  }

getDataUser(nickname: string)
{
  this.http.get<dataUser>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
    this.pernrUser = data.PERNR;
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

  listar()
  {
    this.styleDisplay='block';
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

  detail(id: number)
{
  this.router.navigate(['/Administrador/Detalle/Viaje'], {queryParams: {id:id}})
}


}
