import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

interface dataTrip{
  auth: number;
  closeTrip: number;
  created_at: string;
  datb1: string;
  date: string;
  datv1: string;
  hrgio: string;
  id: number;
  kunde: string;
  pernr: string;
  reinr: string;
  schem: string;
  times: string;
  uhrb1: string;
  uhrv1: string;
  uname: string;
  updated_at: string;
  zland: string;
  zort1: string;
}

interface amount{
  price_total: number;
}

interface dataAuth{
  date1: string;
  date2: string;
  id_auth: number;
  pernr: string;
  pernr_auth1: string;
  pernr_auth2: string;
  reinr: string;
  schem: string;
  time1: string;
  time2: string;
}

@Component({
  selector: 'app-mostrar-miviaje-administrador',
  templateUrl: './mostrar-miviaje-administrador.component.html',
  styleUrls: ['./mostrar-miviaje-administrador.component.css']
})
export class MostrarMiviajeAdministradorComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  closeTrip = 'block'

  authHead!: number;
  closeTripHead!: number;
  created_atHead!: string;
  datb1Head!: string;
  dateHead!: string;
  datv1Head!: string;
  hrgioHead!: string;
  idHead!: number;
  kundeHead!: string;
  pernrHead!: string;
  reinrHead!: string;
  schemHead!: string;
  timesHead!: string;
  uhrb1Head!: string;
  uhrv1Head!: string;
  unameHead!: string;
  updated_atHead!: string;
  zlandHead!: string;
  zort1Head!: string;

  amountHead!: number;

  complete_name!: string;

  emailD: any = {}
  updHead: any = {}

  recivedData: any;


  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
       /* this.route.queryParams.subscribe(params => {
          this.getDataTrip(params['id'])
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {

          this.getDataTrip(this.recivedData.id)

        }else{
          const localStorageData = localStorage.getItem('DataMisViajes-Administrador');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.getDataTrip(parsedData.id)           

        }}


        this.auth.user$.subscribe(dataUser => {
          this.complete_name = String(dataUser?.name)
        })
      }
    })
  }

  getDataTrip(idHead: number)
  {
    this.http.get<dataTrip>('http://localhost:3000/PTRV_HEADS/' + idHead).subscribe(data => {
      this.authHead = data.auth;
      this.closeTripHead = data.closeTrip;
      this.created_atHead = data.created_at;
      this.datb1Head = data.datb1;
      this.dateHead = data.date;
      this.datv1Head = data.datv1;
      this.hrgioHead = data.hrgio;
      this.idHead = data.id;
      this.kundeHead = data.kunde;
      this.pernrHead = data.pernr;
      this.reinrHead = data.reinr;
      this.schemHead = data.schem;
      this.timesHead = data.times;
      this.uhrb1Head = data.uhrb1;
      this.uhrv1Head = data.uhrv1;
      this.unameHead = data.uname;
      this.updated_atHead = data.updated_at;
      this.zlandHead = data.zland;
      this.zort1Head = data.zort1;

      this.getAmountTrip(data.reinr)

      if(data.closeTrip == 1){
        this.closeTrip = 'none'
      }

    })
  }

  getAmountTrip(reinr: string)
  {
    this.http.get<amount>('http://localhost:3000/getSUM_TRIP/' + reinr).subscribe(data => {
      this.amountHead = data.price_total;
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
      icon: 'question',
      iconColor: '#F25F29',
      title: '¿Cerrar Viaje?',
      text: 'Al cerrar el viaje ya no podrás agregar y/o editar gastos',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar Viaje',
      confirmButtonColor: '#F25F29'
    }).then((result) => {
      if(result.isConfirmed)
      {

      try{ 
        
        this.http.get<dataAuth>('http://localhost:3000/one_authorized/' + this.reinrHead).subscribe(dataAuth => {

        let typeTrip = '';

        if(this.schemHead == '01')
        {
          typeTrip = 'nacional';
        }else if(this.schemHead == '02')
        {
          typeTrip = 'internacional'
        }

        const titulo = 'Nuevo viaje ' + typeTrip + ' concluido!';
        const subtitulo = 'Viaje: ' + this.reinrHead;
        const messageD = 'El usuario ' + this.complete_name +' ha concluido con el proceso de captura del viaje: ' + this.reinrHead;
        
        this.emailD={
          pernr: this.pernrHead,
          reinr: this.reinrHead,
          message: messageD,
          title: titulo,
          subtitle: subtitulo,
          pernr_d: dataAuth.pernr_auth1
        }

        this.updHead={
          closeTrip: 1
        }

        this.http.post('http://localhost:3000/EmailD', this.emailD).subscribe(email_d => {
          if(email_d)
          {
            this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.updHead).subscribe(upd_head => {
              if(upd_head)
              {
                this.closeConfirmed()
              }else {this.failed()}
            })
          }else{this.failed()}
        })
      })

    }catch(err)
    {
      this.failed()
    }

      }
    })
  }


  closeConfirmed()
  {
    let intervalTimer = 0;
    Swal.fire({
      icon: 'success',
      title: 'Cerrando viaje',
      timer: 1800,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,

      willClose: () =>{
        clearInterval(intervalTimer)
      }
    }).then((result) => {
      if(result.dismiss === Swal.DismissReason.timer)
      {
        this.reload()
      }
    })
  }

  showExpense(id: number, reinr: string, authCloseTrip: number)
  {
    const data = {id: id, reinr: reinr, authCloseTrip: authCloseTrip}

    this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);
          
    localStorage.setItem('DataMiViaje-Administrador', JSON.stringify(data)); // Guardar en localStorage
          
    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Administrador/Mis-Gastos';
  }

  
  failed()
  {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrio un problema durante la carga de datos',
      text: 'Intentalo nuevamente.',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    }).then(res => {
      if(res.isConfirmed){
        this.reload()
      }
    })
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



  reload()
  {
    location.reload()
  }


}
