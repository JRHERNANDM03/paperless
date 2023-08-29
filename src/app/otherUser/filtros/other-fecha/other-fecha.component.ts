import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

interface user
{
  name: string;
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
  selector: 'app-other-fecha',
  templateUrl: './other-fecha.component.html',
  styleUrls: ['./other-fecha.component.css']
})
export class OtherFechaComponent implements OnInit {

  pernr!: number;
  name!: string;

  styleDisplay = 'none';

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

recivedData: any;

  constructor(private router: Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        /*this.route.queryParams.subscribe(params => {
          this.pernr = params['pernr'];
          this.getInfoUser(this.pernr)

          this.obtenerFecha()
          this.obtenerFechaHaceUnaSemana()
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.pernr = this.recivedData.pernr;
          this.getInfoUser(this.pernr)

          this.obtenerFecha()
          this.obtenerFechaHaceUnaSemana()

        }else{
          const localStorageData = localStorage.getItem('DataHomeFilter1-otherUser');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        this.pernr = parsedData.pernr;
          this.getInfoUser(this.pernr)

          this.obtenerFecha()
          this.obtenerFechaHaceUnaSemana()
        }}
      }
    })
  }

  getInfoUser(pernr: number)
  {
    this.http.get<user>('http://localhost:3000/User/' + pernr).subscribe(data => {
      this.name = data.name;
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
    this.http.get<ptrv_head[]>('http://localhost:3000/PTRV_HEADS/filter/' + this.data1 + '/' + this.data2 + '/' + this.pernr).subscribe(data => {
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
    //this.router.navigate(['/Viajero/Viaje'], {queryParams: {id: id} });

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
