import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

interface travelExpenses{
  auth: number;
  bus_purpo: string;
  bus_reason: string;
  comentario: string;
  country: string;
  descript: string;
  exp_type: string;
  fec_crea: string;
  fec_mod: string;
  hora_crea: string;
  hora_mod: string;
  loc_amount: number;
  loc_curr: string;
  multipli: number;
  object_id: string;
  p_ctg: string;
  p_doc: string;
  p_prv: string;
  pdf: number;
  pernr: string;
  rec_amount: number;
  rec_curr: string;
  rec_date: string;
  receiptno: number;
  region: string;
  reinr: string;
  shorttxt: string;
  tax_code: string;
  user_crea: string;
  user_mod: string;
  uuid: string;
  xml: number;
}

interface ptrv_head
{
  id: number;
  pernr: string;
  reinr: string;
  closeTrip: number;
}

@Component({
  selector: 'app-mostrar-mis-gastos-administrador',
  templateUrl: './mostrar-mis-gastos-administrador.component.html',
  styleUrls: ['./mostrar-mis-gastos-administrador.component.css']
})
export class MostrarMisGastosAdministradorComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

idHead!: number;
reinrHead!: string;

responseArray: travelExpenses[] = [];
authorized!: number[];

styleCreate = 'none';
styleEdit = 'none';
styleDelete = 'none';

authCloseTrip!: number;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.idHead = params['id'];
          this.reinrHead = params['reinr']
          this.authCloseTrip = +params['authCloseTrip'] || 0;
          this.getTravelExpenses(params['reinr'])
          this.getData(params['id'])
        })
      }
    })
  }

  getTravelExpenses(reinr: string){

      this.http.get<travelExpenses[]>('http://localhost:3000/GENERAL/find/' + reinr).subscribe(travel_expenses => {
        this.responseArray = travel_expenses;
        this.authorized = travel_expenses.map(item => item.auth);  
    })
  }

  getData(id: number)
  {
    this.http.get<ptrv_head>('http://localhost:3000/PTRV_HEADS/' + id).subscribe(data => {

    if (data.closeTrip === 0) {
      this.styleCreate='block';
    }else{
      this.styleCreate='none';
    }
  });
  }

  getEstado(auth: number): string {
    if (auth === 0) {
      if (this.authCloseTrip === 0) {
        this.styleEdit = 'block';
        this.styleDelete = 'block';
      } else if (this.authCloseTrip === 1) {
        this.styleEdit = 'none';
        this.styleDelete = 'none';
      }
      return 'Pendiente';
    } else if (auth === 1) {
      this.styleEdit = 'none';
      this.styleDelete = 'none';
      return 'Aprobado';
    } else if (auth === 2) {
      this.styleEdit = 'block';
      this.styleDelete = 'block';
      return 'Rechazado';
    } else {
      this.styleEdit = 'none';
      this.styleDelete = 'none';
      return 'Desconocido';
    }
  }

  delete(receiptno: number, id_head: number){
    // this.router.navigate(["/ViajeroHome"])
    let timerInterval=0;
    Swal.fire({
     icon: 'info',
     title: '¿Estás seguro de eliminar el gasto seleccionado?',
     text: 'SE ELIMINARÁ POR COMPLETO',
     showConfirmButton: true,
     confirmButtonText: 'ELIMINAR',
     confirmButtonColor: '#E31212',
     showCancelButton: true,
     cancelButtonText: 'CANCELAR' ,
     cancelButtonColor: '123BE3'
    }).then((result) => {
     if(result.isConfirmed)
     { 
 
       //console.log(this.id_head)
       this.http.delete('http://localhost:3000/GENERAL/' + receiptno).subscribe(d => {
         Swal.fire(
           {
             icon: 'success',
             title: 'Gasto eliminado con exito',
             showConfirmButton: true,
             confirmButtonText: 'Aceptar',
             confirmButtonColor: 'purple'
           }
         ).then((result) => {
          if(result.isConfirmed)
          {
            location.reload()
          }
         })
       })
     }
    })
   
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

}
