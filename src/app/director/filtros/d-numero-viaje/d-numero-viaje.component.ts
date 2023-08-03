import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface user
{
  area_id: number;
}

interface ptrv_head
{
  PERNR: number;
  area: string;
  area_id: number;
  auth: number;
  closeTrip: number;
  created_at: string;
  datb1: string;
  date: string;
  datv1: string;
  hrgio: string;
  id: number;
  kunde: string;
  lastname: string;
  name: string;
  nickname: string;
  pernr: string;
  puesto: string;
  reinr: string;
  rol_id: number;
  schem: string;
  times: string;
  total_loc_amount: number;
  uhrb1: string;
  uhrv1: string;
  uname: string;
  updated_at: string;
  zland: string;
  zort1: string

}

@Component({
  selector: 'app-d-numero-viaje',
  templateUrl: './d-numero-viaje.component.html',
  styleUrls: ['./d-numero-viaje.component.css']
})
export class DNumeroViajeComponent implements OnInit{

nickname!: string;

reinr!: string;

areaID!: number;

styleDisplay = 'none';

  PERNR!: number;
  area!: string;
  area_id!: number;
  authorized!: number;
  closeTrip!: number;
  created_at!: string;
  datb1!: string;
  date!: string;
  datv1!: string;
  hrgio!: string;
  id!: number;
  kunde!: string;
  lastname!: string;
  name!: string;
  pernr!: string;
  puesto!: string;
  rol_id!: number;
  schem!: string;
  times!: string;
  total_loc_amount!: number;
  uhrb1!: string;
  uhrv1!: string;
  uname!: string;
  updated_at!: string;
  zland!: string;
  zort1!: string;

constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){
        this.auth.user$.subscribe(infoUser =>{
          this.nickname = String(infoUser?.nickname)
          this.getInfoUser(this.nickname)
        })
        
      }
    })  
  }

  getInfoUser(nickname: string)
  {
    this.http.get<user>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
      this.areaID = data.area_id;
    })
  }

  formValid(): boolean {
    // Verificar si los campos requeridos están llenados
    if (
      this.reinr
    ) {
      return true; // Todos los campos están llenados
    } else {
      return false; // Al menos un campo requerido está vacío
    }
  }

  submitForm()
  {
    this.http.get<ptrv_head>('http://localhost:3000/PTRV_HEADS/filterreinr/' + this.reinr +'/' + this.areaID).subscribe(data => {
      if(data === null)
      {
        this.alertError()
      }else
      {
        this.PERNR = data.PERNR
        this.area = data.area
        this.area_id = data.area_id
        this.authorized = data.auth
        this.closeTrip = data.closeTrip
        this.created_at = data.created_at
        this.datb1 = data.datb1
        this.date = data.date
        this.datv1 = data.datv1
        this.hrgio = data.hrgio
        this.id = data.id
        this.kunde = data.kunde
        this.lastname = data.lastname
        this.name = data.name
        this.pernr = data.pernr
        this.puesto = data.puesto
        this.rol_id = data.rol_id
        this.schem = data.schem
        this.times = data.times
        this.total_loc_amount = data.total_loc_amount
        this.uhrb1 = data.uhrv1
        this.uhrv1 = data.uhrb1
        this.uname = data.uname
        this.updated_at = data.updated_at
        this.zland = data.zland
        this.zort1 = data.zort1

        this.listar()
      }
    })
  }

  listar()
  {
    this.styleDisplay='block';
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

alertError()
{
  Swal.fire({
    icon: 'info',
    iconColor: 'purple',
    title: 'No hay registros',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: 'orange'
  })
}

}
