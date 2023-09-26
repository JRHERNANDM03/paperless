import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import { SharedDataService } from 'src/app/shared-data.service';

import { ServiceService } from 'src/app/Service/service.service';

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

interface authorize
{
  date1: string;
  date2: string;
  id_auth: number;
  pernr: number;
  pernr_auth1: number;
  pernr_auth2: number;
  reinr: number;
  schem: string;
  time1: string;
  time2: string;
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
  authCloseTrip!: number;
  TOTAL!: number;

emailD:any = {}

ptrv_head:any = {}

complete_name!: string;

recivedData: any;
idParams: any;

url: any;

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}
  
  styleClose='none'

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
        const service = new ServiceService();
        this.url = service.url();

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.idParams = this.recivedData.id;

        }else{
          // Si no hay datos en el servicio, intenta recuperar desde localStorage
      const localStorageData = localStorage.getItem('DataHome-Viajero');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        this.idParams = parsedData.id;
        }
      }
        //console.log('Datos recibidos'+ this.sharedDataService.getData())

        /*this.route.queryParams.subscribe(params => {
          const id = params['id'];
          this.getDetail(id)
        })*/

        this.getDetail()

        this.auth.user$.subscribe(info => {
            this.complete_name = String(info?.name);
        })

      }
    })
  }


  getDetail()
  {
     const id = this.idParams;

    this.http.get<saveData>(this.url+'PTRV_HEADS/' + id).subscribe(data => {
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
    this.authCloseTrip = data.closeTrip;

    this.getAccount(this.reinr);

    if(data.closeTrip === 0)
    {
      this.styleClose='block'
    }

    })
  }

  getAccount(reinr: string)
  {
    this.http.get<saveData>(this.url+'GENERAL/account/' + reinr).subscribe(data => {
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
  this.http.get<authorize>(this.url+'one_authorized/' + this.reinr).subscribe(data => {
    this.createEmail(data.pernr_auth1)
  })
}

createEmail(pernr_auth1: number)
{

  let typeTrip = '';

  if(this.schem == '01')
  {
    typeTrip = 'nacional';
  }else if(this.schem == '02')
  {
    typeTrip = 'internacional'
  }

  const titulo = 'Nuevo viaje ' + typeTrip + ' concluido!';
  const subtitulo = 'Viaje: ' + this.reinr;
  const messageD = 'El usuario ' + this.complete_name +' ha concluido con el proceso de captura del viaje: ' + this.reinr;

  this.emailD =
  {
    pernr: this.pernr,
    reinr: this.reinr,
    message: messageD,
    pernr_d: pernr_auth1,
    title: titulo,
    subtitle: subtitulo
  }

  //console.log(this.emailD)
  this.http.post(this.url+'EmailD', this.emailD).subscribe(res => {
   
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
  this.http.patch(this.url+'PTRV_HEADS/' + this.id, this.ptrv_head).subscribe(res => {
    this.successCloseTrip()
  })
}


successCloseTrip()
{

  let timerInterval = 0;

  Swal.fire({
    icon: 'success',
    iconColor: 'green',
    title: 'Cerrando Viaje',
    text: 'Informando al director correspondiente....',
    showCancelButton: false,
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,

    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then(result => {
    if(result.dismiss === Swal.DismissReason.timer)
    {
      location.reload()
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

details(id: number, authCloseTrip: number)
{
  const data = {id: id, authCloseTrip: authCloseTrip};

  this.sharedDataService.setData(data);

  localStorage.setItem('DataMostrarViaje-Viajero', JSON.stringify(data));

  //this.router.navigate(['/Viajero/Gastos'], {queryParams: {id: id, authCloseTrip: authCloseTrip} });
  this.router.navigate(['/Viajero/Gastos'])
}


}

