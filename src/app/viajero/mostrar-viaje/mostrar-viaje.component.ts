import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

interface user
{
  area_id: number;
}

interface saveData{
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
  TOTAL: number;
  closeTrip: number;
}


@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.css']
})
export class MostrarViajeComponent implements OnInit {

  id!: number;
  reinr!: string;
  pernr!: string;
  schem!: string;
  zort1!: string;
  zland!: string;
  hrgio!: string;
  kunde!: string;
  datv1!: string;
  uhrv1!: string;
  datb1!: string;
  uhrb1!: string;
  date!: string;
  times!: string;
  uname!: string;
  authorized!: number;

  TOTAL!: number;

email:any = {}

ptrv_head:any = {}

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}
  
  styleClose='none'

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
        this.route.queryParams.subscribe(params => {
          const id = params['id'];
          this.getDetail(id)
        })
      }
    })
  }

  getDetail(id: number)
  {
    this.http.get<saveData>('http://localhost:3000/PTRV_HEADS/' + id).subscribe(data => {
    this.id = data.id;
    this.reinr = data.reinr;
    this.pernr = data.pernr;
    this.schem = data.schem;
    this.zort1 = data.zort1;
    this.zland = data.zland;   
    this. hrgio = data.hrgio;
    this. kunde = data.kunde;
    this. datv1 = data.datv1;
    this. uhrv1 = data.uhrv1;
    this. datb1 = data.datb1;
    this. uhrb1 = data.uhrb1;
    this.date = data.date;
    this.times = data.times;
    this.uname = data.uname;
    this.authorized = data.auth;
    this.getAccount(this.reinr);

    if(data.closeTrip === 0)
    {
      this.styleClose='block'
    }

    })
  }

  getAccount(reinr: string)
  {
    this.http.get<saveData>('http://localhost:3000/GENERAL/account/' + reinr).subscribe(data => {
      if(data.TOTAL === null)
      {
        this.TOTAL = 0;
      }else
      {
      this.TOTAL = data.TOTAL;
      }
    })
  }

  getColor(authorized: number): string {
    if (authorized === 0) {
      return 'grey';
    } else if (authorized === 1) {
      return 'green';
    } else if (authorized === 2) {
      return 'red';
    } else {
      return 'black'; // Color predeterminado si el valor no coincide
    }
  }

  getTitle(authorized: number): string {
    if (authorized === 0) {
      return 'PENDIENTE';
    } else if (authorized === 1) {
      return 'APROBADO';
    } else if (authorized === 2) {
      return 'RECHAZADO';
    } else {
      return 'Desconocido'; // Texto predeterminado si el valor no coincide
    }
  }

  status(authorized: number)
  {
    if(authorized === 0)
    {
    Swal.fire({
      icon: 'info',
      title: 'Estado: PENDIENTE',
      showCancelButton: false,
      confirmButtonColor: 'purple'
    });
    }else if(authorized === 1)
    {
      Swal.fire({
        icon: 'info',
        title: 'Estado: APROBADO',
        showCancelButton: false,
        confirmButtonColor: 'purple'
      });
    }else if(authorized === 2)
    {
      Swal.fire({
        icon: 'info',
        title: 'Estado: RECHAZADO',
        showCancelButton: false,
        confirmButtonColor: 'purple'
      });
    }
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
        /**/
        this.closeTrip()
      }
    })
  }

closeTrip()
{
  this.http.get<user>('http://localhost:3000/User/' + this.pernr).subscribe(data =>
  {
    this.createEmail(data.area_id)
  })
}

createEmail(area: number)
{
  console.log(area)
  this.email =
  {
    pernr: this.pernr,
    reinr: this.reinr,
    area: area
  }
  this.http.post('http://localhost:3000/Email', this.email).subscribe(res => {
   
  if(res)
  {
    this.updatePTRV_HEAD()
  }
  }) 
}

updatePTRV_HEAD()
{
  this.ptrv_head = 
  {
    closeTrip: 1
  }
  this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.id, this.ptrv_head).subscribe(res => {
    this.router.navigate(['/Viajero/Home'], {skipLocationChange: true})
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

details(id: number)
{
  this.router.navigate(['/Viajero/Gastos'], {queryParams: {id: id} });
}


}

