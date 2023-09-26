import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/shared-data.service';

import { ServiceService } from 'src/app/Service/service.service';

interface user
{
  name: string;
  lastname: string;
  nickname: string;
}

interface PTRV_HEADS
{
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
}

@Component({
  selector: 'app-home-other-user',
  templateUrl: './home-other-user.component.html',
  styleUrls: ['./home-other-user.component.css']
})
export class HomeOtherUserComponent implements OnInit {

pernr!: number;

name!: string;
lastname!: string;
nickname!: string;

recivedData: any;

url:any;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        const service = new ServiceService();
        this.url = service.url();
           
        /*this.route.queryParams.subscribe(params => {
          this.pernr = params['pernr'];
          this.getDataUser(this.pernr)
          this.getTrip(this.pernr)
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.pernr = this.recivedData.pernr;
          this.getDataUser(this.pernr)
          this.getTrip(this.pernr)

        }else{
          const localStorageData = localStorage.getItem('DataHomeChangeUser-Viajero');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        this.pernr = parsedData.pernr;
          this.getDataUser(this.pernr)
          this.getTrip(this.pernr)
        }}


      }
    })
  }


  getDataUser(pernr: number)
  {
    this.http.get<user>(this.url+'User/' + pernr).subscribe(data => {
      this.name = data.name;
      this.lastname = data.lastname;
      this.nickname = data.nickname;
    })
  }

  responseArray: PTRV_HEADS[] = [];
 
  authorized!: number[];
  
  getTrip(pernr: number)
  {
    this.http.get<PTRV_HEADS[]>(this.url+'PTRV_HEADS/find/' + pernr).subscribe(data => {
      this.responseArray = data;
      this.authorized = data.map(item => item.auth);
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

  tripDetail(id: number)
{
  //this.router.navigate(['/otherUser/Viaje'], {queryParams: {id: id, pernr: this.pernr} });

  const data = {id: id, pernr: this.pernr};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHome-otherUser', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    this.router.navigate(['/otherUser/Viaje']);
}

filter1(pernr: number)
{
  const data = {pernr: pernr};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomeFilter1-otherUser', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/otherUser/Filtros/NumeroViaje';
}

filter2(pernr: number)
{
  const data = {pernr: pernr};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomeFilter2-otherUser', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/otherUser/Filtros/Fecha';

}

filter3(pernr: number)
{
  const data = {pernr: pernr};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomeFilter3-otherUser', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/otherUser/Filtros/Estado';

}

}
