import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

interface dataTrip{
  PERNR: number;
  area: string;
  area_id: number;
  auth: number;
  closeTrip: number;
  created_at: string;
  datb1: string;
  date: string;
  datv1: string;
  final_approval: number;
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
  selector: 'app-mostrar-viaje-administrador',
  templateUrl: './mostrar-viaje-administrador.component.html',
  styleUrls: ['./mostrar-viaje-administrador.component.css']
})
export class MostrarViajeAdministradorComponent implements OnInit {

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

idHead!: number;

  PERNR!: number;
  area!: string;
  area_id!: number;
  authorized!: number;
  closeTrip!: number;
  created_at!: string;
  datb1!: string;
  date!: string;
  datv1!: string;
  final_approval!: number;
  hrgio!: string;
  id!: number;
  kunde!: string;
  lastname!: string;
  name!: string;
  nickname!: string;
  pernr!: string;
  puesto!: string;
  reinr!: string;
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

  reloadParam!: number;
  idHeadParam!: number;

  recivedData: any;

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthentica => {
    if(!isAuthentica)
    {
      this.auth.logout()
    }else if(isAuthentica){

      /*this.route.queryParams.subscribe(params => {
        this.idHeadParam = params['id']
        this.getDataTrip(params['id'])
      })*/

      this.recivedData = this.sharedDataService.getData()

      if(this.recivedData)
      {

        this.idHeadParam = this.recivedData.id;
        this.getDataTrip(this.recivedData.id)

      }else{
        const localStorageData = localStorage.getItem('DataAnswer-Administrador');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      
      this.idHeadParam = parsedData.id;
        this.getDataTrip(parsedData.id)          

      }}
    }
  })
}


getDataTrip(idHead: number)
{
  this.http.get<dataTrip>('http://localhost:3000/getOneTrip_allInf/' + idHead).subscribe(data => {

    this.PERNR = data.PERNR;
    this.area = data.area;
    this.area_id = data.area_id;
    this.authorized = data.auth;
    this.closeTrip = data.closeTrip;
    this.created_at = data.created_at;
    this.datb1 = data.datb1;
    this.date = data.date;
    this.datv1 = data.datv1;
    this.final_approval = data.final_approval;
    this.hrgio = data.hrgio;
    this.id = data.id;
    this.kunde = data.kunde;
    this.lastname = data.lastname;
    this.name = data.name;
    this.nickname = data.nickname;
    this.pernr = data.pernr;
    this.puesto = data.puesto;
    this.reinr = data.reinr;
    this.rol_id = data.rol_id;
    this.schem = data.schem;
    this.times = data.times;
    this.total_loc_amount = data.total_loc_amount;
    this.uhrb1 = data.uhrb1;
    this.uhrv1 = data.uhrv1;
    this.uname = data.uname;
    this.updated_at = data.updated_at;
    this.zland = data.zland;
    this.zort1 = data.zort1;
  
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

  gastos()
  {
    //this.router.navigate(["/Administrador/Gastos"], {queryParams: {idHead: this.id, reinr: this.reinr}})
    
    const data = {idHead: this.id, reinr: this.reinr}

  this.sharedDataService.setData(data);
  //console.log('Datos establecidos en el servicio:', data);
        
  localStorage.setItem('DataMostrarViaje-Administrador', JSON.stringify(data)); // Guardar en localStorage
        
  // Navegar a la otra vista después de establecer los datos
  window.location.href='/Administrador/Gastos';
  
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
