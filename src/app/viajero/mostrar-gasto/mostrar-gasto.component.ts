import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage, ref, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';
import { ServiceService } from 'src/app/Service/service.service';


// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

interface ptrv_head
{
  id: number;
  pernr: string;
  reinr: string;
  closeTrip: number;
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
  uuid: string;
  object_id: string;
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
  selector: 'app-mostrar-gasto',
  templateUrl: './mostrar-gasto.component.html',
  styleUrls: ['./mostrar-gasto.component.css']
})
export class MostrarGastoComponent implements OnInit {

  id_head!: number;
  pernr_head!: string;
  reinr_head!: string;

  receiptno_general!: string;
  exp_type_general!: string;
  rec_amount_general!: number;
  rec_curr_general!: string;
  rec_rate_general!: string;
  loc_amount_general!: number;
  loc_curr_general!: string;
  tax_code_general!: string;
  rec_date_general!: string;
  shorttxt_general!: string;
  auth_general!: string;
  uuid_general!: string;
  object_id_general!: string;

  authCloseTrip!: number;

  recivedData: any;

  url: any;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService, private storage: Storage){}

  styleCreate = 'none';
  styleEdit = 'none';
  styleDelete = 'none';

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.router.navigate(['login'])
    }else if(isAuthenticate)
    {
      const service = new ServiceService();
      this.url = service.url();

      this.getDataUserLogg();
      
      /*this.route.queryParams.subscribe(params => {
        const idHead = params['id'];
        const id = idHead;
        this.authCloseTrip = +params['authCloseTrip'] || 0;
        this.getData(id)
        //console.log(params['id'])
      })*/

      this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          const id = this.recivedData.id;
          this.getData(id)

          this.authCloseTrip = +this.recivedData.authCloseTrip || 0;


        }else{
          // Si no hay datos en el servicio, intenta recuperar desde localStorage
      const localStorageData = localStorage.getItem('DataMostrarViaje-Viajero');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        const id = parsedData.id;
        this.getData(id)

        this.authCloseTrip = +parsedData.authCloseTrip || 0;


        }
      }

    }
  })
}

getDataUserLogg()
  {
    this.auth.user$.subscribe(dataUser => {
      const nickname = dataUser?.nickname;
      this.http.get<dataUser>(this.url+'USERS/'+nickname).subscribe(data => {
        if(data.rol_id != 1)
        {
          window.location.href='/access_error';
        }
      })
    })
  }

getData(id: number)
{
  

  this.http.get<ptrv_head>(this.url+'PTRV_HEADS/' + id).subscribe(data => {
    this.id_head = data.id;
    this.pernr_head = data.pernr;
    this.reinr_head = data.reinr;

    this.getDetails(this.reinr_head);

    if (data.closeTrip === 0) {
      this.styleCreate='block';
    }else{
      this.styleCreate='none';
    }
  });
}

responseArray: zfi_gv_paper_general[] = [];

authorized!: number[];

getDetails(reinr_head: string)
{
  this.http.get<zfi_gv_paper_general[]>(this.url+'GENERAL/find/' + reinr_head).subscribe(data => {
   
  this.responseArray = data;
    this.authorized = data.map(item => item.auth); // Almacenar todos los valores de auth en authorized
  })
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


createExpenses(idHead: number, authCloseTrip: number)
{
  const data = {id: idHead};

  this.sharedDataService.setData(data);

  localStorage.setItem('DataCrearGasto-Viajero', JSON.stringify(data))

  this.router.navigate(['/Viajero/Registrar/Gasto'])
}


showExpenses(receiptno: number, id_head: number, authCloseTrip: number)
{
   const data = {id: receiptno, head: id_head, authCloseTrip: authCloseTrip};

   this.sharedDataService.setData(data);

   localStorage.setItem('DataMostrarGasto-Viajero', JSON.stringify(data))

   this.router.navigate(['/Viajero/Detalles/Gasto']);
}

editeExpenses(receiptno: number, id_head: number, authCloseTrip: number)
{
  const data = {id: receiptno, head: id_head, authCloseTrip: authCloseTrip};

  this.sharedDataService.setData(data);

  localStorage.setItem('DataEditarGasto-Viajero', JSON.stringify(data))

  this.router.navigate(['/Viajero/Editar/Gasto'])
}


  delete(receiptno: number, id_head: number, uuid: string){
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

      const desertRef = ref(this.storage, `files/${uuid}`);

      deleteObject(desertRef)
      .then(response => {
        //console.log(this.id_head)
        this.http.delete(this.url+'GENERAL/' + receiptno).subscribe(d => {
          Swal.fire(
            {
              icon: 'success',
              title: 'Gasto eliminado con exito',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
            }
          ).then((result) => {
            location.reload()
          })
        })
        
      })
      .catch(error => { console.log(error)} )
      
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