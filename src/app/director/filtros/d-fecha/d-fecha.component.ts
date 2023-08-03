import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface user
{
  area_id: number;
}

interface ptrv_heads
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
  zort1: string;
}

@Component({
  selector: 'app-d-fecha',
  templateUrl: './d-fecha.component.html',
  styleUrls: ['./d-fecha.component.css']
})
export class DFechaComponent implements OnInit{

nickname!: string;

areaID!: number;

styleDisplay = 'none';

fechaActual!: string;
fechaPasada!: string;

data1!: string;
data2!: string;

responseArray: ptrv_heads[] = [];

  authorized!: number[];

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
        this.obtenerFecha()
        this.obtenerFechaHaceUnaSemana()
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
    if (this.data1 && this.data2) {
      const fecha1 = new Date(this.data1);
      const fecha2 = new Date(this.data2);
  
      // Comparar las fechas
      if (fecha1 < fecha2) {
        return true; // fecha1 es menor a fecha2
      } else {
        return false; // fecha1 es mayor a fecha2 o ambas fechas son iguales
      }
    } else {
      return false; // Al menos un campo requerido está vacío
    }
  }

submitForm()
{
  this.http.get<ptrv_heads[]>('http://localhost:3000/PTRV_HEADS/filterDATES/' + this.data1 +'/' + this.data2 +'/' + this.areaID).subscribe(data => {
    this.responseArray = data;
    this.authorized = data.map(item => item.auth);
    this.listar()
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

  obtenerFecha()
  {
    // yyyy-mm-dd
    
    const fechaActual = new Date();
    const day = fechaActual.getDate();
    const month = fechaActual.getMonth() + 1;
    const year = fechaActual.getFullYear();

    if(fechaActual)
    {
      this.fechaActual = `${year}-${this.agregarcerosizquierda(month)}-${this.agregarcerosizquierda(day)}`;
      //console.log(fechaActual)
    }

  }

  obtenerFechaHaceUnaSemana()
  {
    const fechaActual = new Date();
    const fechaPasada = new Date(fechaActual.getTime() - 7 * 24 * 60 * 60 * 1000)

    const day = fechaPasada.getDate();
    const month = fechaPasada.getMonth() + 1;
    const year = fechaPasada.getFullYear();

    this.fechaPasada = `${year}-${this.agregarcerosizquierda(month)}-${this.agregarcerosizquierda(day)}`;
    
  }

  agregarcerosizquierda(valor: number): string
  {
    return valor < 10 ? `0${valor}`: valor.toString();
  }

  tripDetail(id: number)
  {
    this.router.navigate(['/Director/Viaje'], {queryParams: {id: id} });
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
