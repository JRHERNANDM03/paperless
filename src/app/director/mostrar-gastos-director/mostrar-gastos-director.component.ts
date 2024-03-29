import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import { ServiceService } from 'src/app/Service/service.service';

interface info
{
  PERNR: number;
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
  uhrb1: string;
  uhrv1: string;
  uname: string;
  updated_at: string;
  zland: string;
  zort1: string;
  area: string;
}

interface zfi_gv_paper_general
{
  head: string;
  receiptno: number;
  exp_type: string;
  rec_amount: number;
  rec_curr: string;
  rec_rate: string;
  loc_amount: number;
  loc_curr: string;
  tax_code: string;
  rec_date: string;
  shorttxt: string;
  auth: number;
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
  selector: 'app-mostrar-gastos-director',
  templateUrl: './mostrar-gastos-director.component.html',
  styleUrls: ['./mostrar-gastos-director.component.css']
})
export class MostrarGastosDirectorComponent implements OnInit{

  PERNR!: number;
  area_id!: number;
  closeTrip!: number;
  created_at!: string;
  datb1!: string;
  date!: string;
  datv1!: string;
  hrgio!: string;
  idHead!: number;
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
  uhrb1!: string;
  uhrv1!: string;
  uname!: string;
  updated_at!: string;
  zland!: string;
  zort1!: string;
  area!: string;

recivedData: any;

url:any;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        /*this.route.queryParams.subscribe(params => {
          this.getInfoTrip(params['id'])
        })*/
        const service = new ServiceService();
        this.url = service.url();

        this.getDataUserLogg();

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.getInfoTrip(this.recivedData.id)           

        }else{
          const localStorageData = localStorage.getItem('DataViaje-Director');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.getInfoTrip(parsedData.id)           

        }}
      }
    })
  }

  getDataUserLogg()
{
  this.auth.user$.subscribe(dataUser => {
    const nickname = dataUser?.nickname;
    this.http.get<dataUser>(this.url+'USERS/'+nickname).subscribe(data => {
      if(data.rol_id != 2)
      {
        window.location.href='/access_error';
      }
    })
  })
}

  getInfoTrip(idHead: number)
  {
    this.http.get<info>(this.url+'PTRV_HEADS/mostra_viaje/' + idHead).subscribe(data => {
      this.PERNR = data.PERNR
      this.area_id = data.area_id
      this.closeTrip = data.closeTrip
      this.created_at = data.created_at
      this.datb1 = data.datb1
      this.date = data.date
      this.datv1 = data.datv1
      this.hrgio = data.hrgio
      this.idHead = data.id
      this.kunde = data.kunde
      this.lastname = data.lastname
      this.name = data.name
      this.nickname = data.nickname
      this.pernr = data.pernr
      this.puesto = data.puesto
      this.reinr = data.reinr
      this.rol_id = data.rol_id
      this.schem = data.schem
      this.times = data.times
      this.uhrb1 = data.uhrb1
      this.uhrv1 = data.uhrv1
      this.uname = data.uname
      this.updated_at = data.updated_at
      this.zland = data.zland
      this.zort1 = data.zort1
      this.area = data.area

      this.getDetails(data.reinr)
    })
  }

responseArray: zfi_gv_paper_general[] = [];
authorized!: number[];

getDetails(reinr: string)
{
  this.http.get<zfi_gv_paper_general[]>(this.url+'GENERAL/find/' + reinr).subscribe(data => {
    this.responseArray = data;
    this.authorized = data.map(item => item.auth); // Almacenar todos los valores de auth en authorized
   // console.log(this.responseArray)
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


  info()
  {
    Swal.fire({
      title: 'Información sobre iconos.',
      position: 'center',
      html: '<h1>Descripción</h1>' +
      '<br>'+
      '<p>Importe es igual: <a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16"><path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/></svg></a></p>' +
      '<p>Fecha de gasto es igual: <a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16"><path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"/></svg></a></p>' +
      '<p>Visualizar gasto es igual: <a style="color: #295bd9;"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></a></p>' +
      '<br>' +
      '<h2>Estado</h2>' +
      '<p>PENDIENTE: <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16"><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg></a></p>' +
      '<p>APROBADO: <a style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z"/></svg></a></p>' +
      '<p>RECHAZADO: <a style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z"/></svg></a></p>',
      showConfirmButton: true,
      confirmButtonColor: 'purple',
      
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

  showSpent(receiptno: number)
  {
    //this.router.navigate(['/Director/Detalles/Gastos'], {queryParams: {receiptno: receiptno, id: this.idHead}})

    const data = {receiptno: receiptno, id: this.idHead};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataMostrarViaje2-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Detalles/Gastos';
  }


}
