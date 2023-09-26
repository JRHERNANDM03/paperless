import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

interface ptrv_head{
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
  society: number;
  times: string;
  uhrb1: string;
  uhrv1: string;
  uname: string;
  updated_at: string;
  zlandv: string;
  zort1: string;
}

interface dataUser{
  PERNR: number;
  area: string;
  area_id: number;
  lastname: string;
  name: string;
  nickname: string;
  puesto: string;
  rol_id: number;
  society: number;

}

@Component({
  selector: 'app-respuesta-formulario-administrador',
  templateUrl: './respuesta-formulario-administrador.component.html',
  styleUrls: ['./respuesta-formulario-administrador.component.css']
})
export class RespuestaFormularioAdministradorComponent implements OnInit{

constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

n_empArray!: [];
name_empArray!: [];
n_viajeArray!: [];
sociedadArray!: [];
status!: string;
date1!: string;
date2!: string;
lengthPERNR!: number;
lengthREINR!: number;
lengthSOCIETY!: number;

fechaPasada!: string;
fechaActual!: string;

fecha1!: string;
fecha2!: string;

responseArray: ptrv_head[] = [];
authorized!: number[];

amountTrip!: number;

recivedData: any;

url:any;

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.auth.logout()
    }else if(isAuthenticate){
      const service = new ServiceService();
      this.url = service.url();

      this.getDataUserLogg();

      /*this.route.queryParams.subscribe(params => {
        this.n_empArray = params['n_empArray'];
        this.n_viajeArray = params['n_viajeArray'];
        this.sociedadArray = params['sociedadArray'];
        this.status = params['status'];
        this.date1 = params['date1'];
        this.date2 = params['date2'];
        this.lengthPERNR = params['lengthPERNR'];
        this.lengthREINR = params['lengthREINR'];
        this.lengthSOCIETY = params['lengthSOCIETY'];
      })*/

      this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {

          this.n_empArray = this.recivedData.n_empArray;
          this.n_viajeArray = this.recivedData.n_viajeArray;
          this.sociedadArray = this.recivedData.sociedadArray;
          this.status = this.recivedData.status;
          this.date1 = this.recivedData.date1;
          this.date2 = this.recivedData.date2;
          this.lengthPERNR = this.recivedData.lengthPERNR;
          this.lengthREINR = this.recivedData.lengthREINR;
          this.lengthSOCIETY = this.recivedData.lengthSOCIETY;

        }else{
          const localStorageData = localStorage.getItem('DataHomeAnswer-Administrador');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.n_empArray = parsedData.n_empArray;
          this.n_viajeArray = parsedData.n_viajeArray;
          this.sociedadArray = parsedData.sociedadArray;
          this.status = parsedData.status;
          this.date1 = parsedData.date1;
          this.date2 = parsedData.date2;
          this.lengthPERNR = parsedData.lengthPERNR;
          this.lengthREINR = parsedData.lengthREINR;
          this.lengthSOCIETY = parsedData.lengthSOCIETY;            

        }}


      this.obtenerFecha()
      this.obtenerFechaHaceUnaSemana()
      this.print()
    }
  })
}

getDataUserLogg()
{
  this.auth.user$.subscribe(user => {
    const nickname = user?.nickname;
    this.http.get<dataUser>(this.url+'USERS/' + nickname).subscribe(data => {
      if(data.rol_id != 3)
      {
        window.location.href='/access_error';
      }
    })
  })
}

print()
{ 
  
  if(this.date1 === '')
  {
    this.fecha1 = this.fechaPasada;
  }else{
    this.fecha1 = this.date1;
  }

  if(this.date2 === '')
  {
    this.fecha2 = this.fechaActual;
  }else{
    this.fecha2 = this.date2
  }

  try{


    if(this.lengthPERNR > 0 && this.lengthREINR > 0 && this.lengthSOCIETY > 0)
    {
        const queryParams_pernr = this.n_empArray.map(value => `n_empArray=${encodeURIComponent(value)}`).join('&');
        const queryParams_reinr = this.n_viajeArray.map(value => `n_viajeArray=${encodeURIComponent(value)}`).join('&');
        const queryParams_sociedad = this.sociedadArray.map(value => `sociedadArray=${encodeURIComponent(value)}`).join('&');
      const url = this.url+`get_info_filter_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_pernr}&${queryParams_reinr}&${queryParams_sociedad}`;
      
      //console.log('this ir url: '+url)
      this.http.get<ptrv_head[]>(url).subscribe(
        data => {
          //console.log(data);
          this.responseArray = data;
          this.authorized = data.map(item => item.auth);
          this.amountTrip = data.length;
        }
      );

      

      //console.log('----------------PRIMER IF DONDE TODOS LOS CAMPOS TIENEN UN VALOR-------------')
     
  
    }else if(this.lengthPERNR == 0 && this.lengthREINR > 0 && this.lengthSOCIETY > 0)
    {
      //console.log('Consultar viajes especificos de los usuarios dentro de las sociedades en especifico')
    
      const queryParams_reinr = this.n_viajeArray.map(value => `n_viajeArray=${encodeURIComponent(value)}`).join('&')
      const queryParams_sociedad = this.sociedadArray.map(value => `sociedadArray=${encodeURIComponent(value)}`).join('&')

      const url = this.url+`get_info_filter2_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_reinr}&${queryParams_sociedad}`;

      //console.log(url)

      this.http.get<ptrv_head[]>(url).subscribe(data => {
        //console.log(data);
        this.responseArray = data;
        this.authorized = data.map(item => item.auth);
        this.amountTrip = data.length;
      })


    }else if(this.lengthPERNR == 0 && this.lengthREINR == 0 && this.lengthSOCIETY > 0)
    {
      //console.log('Traer todos los viajes de los usuarios dentro de una sociedad en especifico')

      const queryParams_sociedad = this.sociedadArray.map(value => `sociedadArray=${encodeURIComponent(value)}`).join('&')

      const url = this.url+`get_info_filter3_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_sociedad}`;

      this.http.get<ptrv_head[]>(url).subscribe(data => {
        //console.log(data);
        this.responseArray = data;
        this.authorized = data.map(item => item.auth);
        this.amountTrip = data.length;
      })


    }else if(this.lengthPERNR == 0 && this.lengthREINR == 0 && this.lengthSOCIETY == 0)
    {
      //console.log('Traer todos los viajes con el status y fechas indicadas')

      const url = this.url+`get_info_filter4_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2;

      this.http.get<ptrv_head[]>(url).subscribe(data => {
        //console.log(data);
        this.responseArray = data;
        this.authorized = data.map(item => item.auth);
        this.amountTrip = data.length;
      })



    }else if(this.lengthPERNR > 0 && this.lengthREINR == 0 && this.lengthSOCIETY == 0)
    {
      //console.log('Traer todos los viajes de los usuarios proporcionados')

      const queryParams_pernr = this.n_empArray.map(value => `n_empArray=${encodeURIComponent(value)}`).join('&')

      const url = this.url+`get_info_filter5_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_pernr}`;

      this.http.get<ptrv_head[]>(url).subscribe(data => {
        //console.log(data);
        this.responseArray = data;
        this.authorized = data.map(item => item.auth);
        this.amountTrip = data.length;
      })


    }else if(this.lengthPERNR > 0 && this.lengthREINR > 0 && this.lengthSOCIETY == 0)
    {
      //console.log('Traer todos los viajes que coincidan con los usuarios y los numeros de viaje ingresados')
    
      const queryParams_pernr = this.n_empArray.map(value => `n_empArray=${encodeURIComponent(value)}`).join('&');
      const queryParams_reinr = this.n_viajeArray.map(value => `n_viajeArray=${encodeURIComponent(value)}`).join('&');

      const url = this.url+`get_info_filter6_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_pernr}&${queryParams_reinr}`;

      this.http.get<ptrv_head[]>(url).subscribe(data => {
        //console.log(data);
        this.responseArray = data;
        this.authorized = data.map(item => item.auth);
        this.amountTrip = data.length;
      })

    }else if(this.lengthPERNR > 0 && this.lengthREINR == 0 && this.lengthSOCIETY > 0)
    {
      //console.log('Traer todos los viajes de los usuarios indicados dentro de las sociedades indicadas')
    
    const queryParams_pernr = this.n_empArray.map(value => `n_empArray=${encodeURIComponent(value)}`).join('&');
    const queryParams_sociedad = this.sociedadArray.map(value => `sociedadArray=${encodeURIComponent(value)}`).join('&');

    const url = this.url+`get_info_filter7_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_pernr}&${queryParams_sociedad}`;

    this.http.get<ptrv_head[]>(url).subscribe(data => {
      //console.log(data);
      this.responseArray = data;
      this.authorized = data.map(item => item.auth);
      this.amountTrip = data.length;
    })
    
    }else if(this.lengthPERNR == 0 && this.lengthREINR > 0 && this.lengthSOCIETY == 0)
    {
      //console.log('Traer todos los viajes indicados')

      const queryParams_reinr = this.n_viajeArray.map(value => `n_viajeArray=${encodeURIComponent(value)}`).join('&');

      const url = this.url+`get_info_filter8_administrator/`+ this.status +`/`+ this.fecha1 +`/`+ this.fecha2 +`/arrays/?${queryParams_reinr}`;

      this.http.get<ptrv_head[]>(url).subscribe(data => {
        //console.log(data);
        this.responseArray = data;
        this.authorized = data.map(item => item.auth);
        this.amountTrip = data.length;
      })
    }
    
  }catch(error){
    Swal.fire({
      icon: 'warning',
      title: 'Ocurrio un error durante el proceso, valida ingresar solo numeros',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    }).then(result => {
      if(result.isConfirmed)
      {
        window.location.href="/Administrador/Home"
      }
    })
  }


}

formatDate(dateString: string): string {
  const date = new Date(dateString);
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth() + 1;
  const utcDay = date.getUTCDate();

  return `${utcMonth}/${utcDay}/${utcYear}`;
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
    console.log(fechaActual)
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

detailTrip(id: number)
{

  const data = {id: id}

  this.sharedDataService.setData(data);
  //console.log('Datos establecidos en el servicio:', data);
        
  localStorage.setItem('DataAnswer-Administrador', JSON.stringify(data)); // Guardar en localStorage
        
  // Navegar a la otra vista después de establecer los datos
  window.location.href='/Administrador/Viaje';
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
