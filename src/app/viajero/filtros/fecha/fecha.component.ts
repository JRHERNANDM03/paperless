import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

interface user
{
  PERNR: number;
}

interface ptrv_head 
{
  id: number;
  pernr: string;
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
}

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

nickname!: string;
pernrU!: number;

fechaActual!: string;
fechaPasada!: string;

data1!: string;
data2!: string;

id_head!: number;
pernr_head!: string;
reinr_head!: string;
schem_head!: string;
zort1_head!: string;
zland_head!: string;
hrgio_head!: string;
kunde_head!: string;
datv1_head!: string;
uhrv1_head!: string;
datb1_head!: string;
uhrb1_head!: string;
date_head!: string;
times_head!: string;
uname_head!: string;
authorized_head!: number;

  constructor(public auth: AuthService, private router: Router, private http: HttpClient, private route: ActivatedRoute){}

  styleDisplay = 'none';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
        this.auth.user$.subscribe(info => {
          this.nickname = String(info?.nickname);
          this.getPERNR(this.nickname)
          
          this.obtenerFecha()
          this.obtenerFechaHaceUnaSemana()
        })
      }
    })
  }


getPERNR(nickname: string)
{
  this.http.get<user>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
    this.pernrU = data.PERNR;
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

responseArray: ptrv_head[] = [];

  authorized!: number[];

submitForm() {
  this.http.get<ptrv_head[]>('http://localhost:3000/PTRV_HEADS/filter/' + this.data1 + '/' + this.data2 + '/' + this.pernrU).subscribe(data => {
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
        this.router.navigate(['/Viajero/Viaje'], {queryParams: {id: id} });
      }
}
