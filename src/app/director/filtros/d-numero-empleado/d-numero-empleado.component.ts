import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface validate
{
  TOTAL: number;
}

interface PTRV_HEAD{
  id: number;
  pernr: string
  reinr: string;
  schem: string;
  zort1: string;
  zland: string;
  hrgio: string;
  kunde: string;
  datv1: string;
  uhrv1: string;
  datb1: string;
  uhrb1: string;
  date: string;
  times: string;
  uname: string;
  auth: number;
  closeTrip: number;
  total_loc_amount: number;
}

interface user
{
  area_id: number;
}

@Component({
  selector: 'app-d-numero-empleado',
  templateUrl: './d-numero-empleado.component.html',
  styleUrls: ['./d-numero-empleado.component.css']
})
export class DNumeroEmpleadoComponent implements OnInit {
  
  styleDisplay = 'none';

  pernr!: string;

  nickname!: string;
  area_id!: number;

constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient){}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.errLog()
    }else if(isAuthenticate){
      this.auth.user$.subscribe(infoUser => {
        this.nickname = String(infoUser?.nickname)
        this.getInfoUser(this.nickname)
      })
    }
  })
}

getInfoUser(nickname: string)
{
  this.http.get<user>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
    this.area_id = data.area_id
  })
}

formValid(): boolean {
  // Verificar si los campos requeridos están llenados
  if (
    this.pernr
  ) {
    return true; // Todos los campos están llenados
  } else {
    return false; // Al menos un campo requerido está vacío
  }
}

responseArray: PTRV_HEAD[] = [];
 
  authorized!: number[];

submitForm()
{
  this.http.get<validate>('http://localhost:3000/User/Validate/' + this.pernr).subscribe(data => {
    if(data.TOTAL === 0)
    {

      Swal.fire({
        icon: 'warning',
        iconColor: 'orange',
        title: 'Usuario no registrado',
        showConfirmButton: true,
        confirmButtonColor: 'purple'
      })

    }else
    {
      this.http.get<PTRV_HEAD[]>('http://localhost:3000/PTRV_HEAD/and/count/' + this.area_id +'/' + this.pernr).subscribe(data => {
            
      if(data.length === 0)
        {
          this.error_area()
        }
        else
        {
          this.responseArray = data;
          this.authorized = data.map(item => item.auth);
    
          this.listar()
        }
      })
    }
  })
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


  listar()
  {
    this.styleDisplay='block';
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

error_area()
{
  Swal.fire({
    icon: 'error',
    iconColor: 'orange',
    title: 'Este usuario no pertenece al mismo departamento',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: 'purple'
  })
}

}
