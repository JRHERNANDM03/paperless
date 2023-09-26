import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import { ServiceService } from 'src/app/Service/service.service';

interface dataMain{
  pernr: string;
  name: string;
  reinr: string;
  id: number;
  final_approval: number;
  auth: number;
}

interface dataExpenses{
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

interface ptrv_head {
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
  selector: 'app-mostrar-gastos-administrador',
  templateUrl: './mostrar-gastos-administrador.component.html',
  styleUrls: ['./mostrar-gastos-administrador.component.css']
})
export class MostrarGastosAdministradorComponent implements OnInit{

  constructor (private storage: Storage, private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe, private sharedDataService: SharedDataService){}

idHead!: number;
reinrHead!: string;

pernr!: string;
name!: string;
reinr!: string;
id!: number;
final_approvalHead!: number;
authHead!: number;

responseArray: dataExpenses[] = [];

authorized!: number[];

showFile = 'none'
changeApprovate = 'none'

amount = 0;
lenghtArray = 0;

comentario = '';

fechaActual!: string;
horaActual!: string;

upd_zfi_gv_paper_general: any = {}
emailV: any = {}
upd_ptrv_head: any = {}

complete_name!: string;

recivedData: any;

url:any;

  // Propiedad para almacenar el enlace de descarga del archivo
  fileDownloadURL: string | null = null;

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
        this.idHead = params['id'];
        this.reinrHead = params['reinr'];
        this.getDataTrip_and_User(params['reinr'])
      })*/

      this.recivedData = this.sharedDataService.getData()

      if(this.recivedData)
      {

        this.idHead = this.recivedData.id;
        this.reinrHead = this.recivedData.reinr;
        this.getDataTrip_and_User(this.recivedData.reinr)

      }else{
        const localStorageData = localStorage.getItem('DataMostrarViaje-Administrador');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      
      this.idHead = parsedData.id;
        this.reinrHead = parsedData.reinr;
        this.getDataTrip_and_User(parsedData.reinr)         

      }}

      this.auth.user$.subscribe(infoUser => {
        this.complete_name = String(infoUser?.name)
        
      })
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

getDataTrip_and_User(reinr: string)
{
  this.http.get<dataMain>(this.url+'getDataTip_User/' + reinr).subscribe(data => {
    this.pernr = data.pernr;
    this.reinr = data.reinr;
    this.name = data.name;
    this.id = data.id;
    this.final_approvalHead = data.final_approval;
    this.authHead = data.auth;

    this.getExpenses(data.reinr)
  })
}

getExpenses(reinr: string)
{
  this.http.get<dataExpenses[]>(this.url+'GENERAL/find/' + reinr).subscribe(data => {
    this.responseArray = data;
    this.authorized = data.map(item => item.auth);

    this.lenghtArray = this.responseArray.length;

    let x = 0;

    for(x; x<this.responseArray.length; x++){
      if(this.responseArray[x].auth == 1)
      {
        this.amount = this.amount + 1;
      }
    }
  })
}

getEstado(auth: number): string {
  if (auth === 0) {
    this.showFile = 'block'
    this.changeApprovate = 'block'
    return 'Pendiente';
  } else if (auth === 1) {
    this.showFile = 'none'
    this.changeApprovate = 'none'
    return 'Aprobado';
  } else if (auth === 2) {
    this.showFile = 'none'
    this.changeApprovate = 'none'
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
      '<p>Descargar documento es igual: <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/></svg></a></p>' +
      '<p>Cambiar estado es igual: <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-toggles2" viewBox="0 0 16 16"><path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z"/><path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z"/><path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/></svg></a></p>' +
      '<br>' +
      '<h2>Estado</h2>' +
      '<p>PENDIENTE: <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16"><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg></a></p>' +
      '<p>APROBADO: <a style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z"/></svg></a></p>' +
      '<p>RECHAZADO: <a style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z"/></svg></a></p>',
      showConfirmButton: true,
      confirmButtonColor: 'purple',
      
    })
  }

  documentError()
  {
    Swal.fire({
      icon: 'error',
      title: 'No hay documento adjunto',
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    })
  }

  downloadFile(uuid: string)
  {
    
    if(uuid === '')
    {
      this.documentError()
    }else{
      //console.log(fileName)
    const documentRef = ref(this.storage, 'files/');

    listAll(documentRef)
    .then(async response => {

      let x = 0;

      for(x=0; x < response.items.length; x++)
      {
        //console.log('\n' + response.items[x].name)
        if(uuid == response.items[x].name)
        {
          //console.log(fileName + ' -- ' + response.items[x].name)
          const url = await getDownloadURL(response.items[x])
          //console.log(url)
          this.fileDownloadURL = url;

          if(url.length > 0)
          {
            window.open(url);

          }else if(url.length <= 0)
          {
            this.documentError()
          }
        }
      }
    })
    .catch(error => { 
      console.log(error)
    })
    }

  }

  final_approval()
  { 
    if(this.final_approvalHead == 0)
    {
      if(this.authHead == 1)
      {if(this.amount === this.lenghtArray && this.amount > 0)
        {
          Swal.fire({
            icon: 'question',
            iconColor: 'gray',
            title: '¿Seguro de realizar está acción?',
            text: 'Esta acción realiza la devolución directamente del dinero registrado en todos los gastos del viaje seleccionado.',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: 'purple'
          }).then(result => {
            if(result.isConfirmed)
            {
              const titulo = 'Viaje aprobado completamente!'
              const subtitulo = 'Viaje: ' + this.reinr;
              const mensaje = 'Tu viaje ha concluido con el proceso de aprobación, FELICIDADES!!!!';
  
              this.emailV = {
                reinr: this.reinr,
                pernr: this.pernr,
                message: mensaje,
                title: titulo,
                subtitle: subtitulo
              }
  
              this.upd_ptrv_head = {
                final_approval: 1
              }
  
              this.http.post(this.url+'EmailV', this.emailV).subscribe(email_v => {
                if(email_v)
                {
                  this.http.patch(this.url+'PTRV_HEADS/' + this.id, this.upd_ptrv_head).subscribe(ptrv_head =>{
                    if(ptrv_head)
                    {
                      let timerInterval = 0;
                  Swal.fire({
                icon: 'success',
                iconColor: '#F25F29',
                title: 'Acción realizada con éxito!',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                if(result.dismiss === Swal.DismissReason.timer)
                {
                  location.reload()
                }
              }) 
                    }
                  })
                }
              })
            }
          })
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Todos los gastos aún no son aprobados.',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: 'purple'
          })
        }
      
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Este viaje aún no ha sido autorizado por el director a nivel cabecera',
          showConfirmButton: true,
          confirmButtonColor: 'purple'
        })
      }
      
    }else if(this.final_approvalHead == 1)
    {
      Swal.fire({
        icon: 'warning',
        title: 'Este Viaje ya reálizo está acción',
        showConfirmButton: true,
        confirmButtonColor: 'purple'
      }).then(result => {
        if(result.isConfirmed)
        {
          location.reload()
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Existe un error en el registro',
        showConfirmButton: true,
        confirmButtonColor: 'red'
      }).then(result => {
        if(result.isConfirmed)
        {
          location.reload()
        }
      })
    }
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

  notify(receiptno: number, reinr: string, pernr: string) {

    this.http.get<ptrv_head>(this.url+'PTRV_HEAD/' + reinr).subscribe(data => {
      if(data.auth == 1)
      {
        Swal.fire({
          icon: 'question',
          iconColor: 'F25F29',
          title: '¿Aprobar gasto?',
          showConfirmButton: true,
          confirmButtonText: 'Aprobar',
          confirmButtonColor: 'green',
          showDenyButton: true,
          denyButtonText: 'Rechazar',
          denyButtonColor: 'red',
          showCancelButton: true
        }).then(result => {
          if(result.isConfirmed)
          {
            this.approvate(receiptno, reinr, pernr)
          }else if(result.isDenied)
          {
            this.declain(receiptno, reinr, pernr)
          }
        })
      }else{
        Swal.fire({
          icon: 'warning',
          iconColor: '#F25F29',
          title: 'Esta acción no está permitida',
          showConfirmButton: true,
          confirmButtonColor: 'purple'
        })
      }
    })

  }

  approvate(receiptno: number, reinr: string, pernr: string)
  {
    const titulo = 'Nuevo gasto de viaje aprobado!';
    const subtitulo = 'Viaje: '+reinr;
    const mensaje = 'El administrador ha aprobado un gasto de tu viaje: ' + reinr;

    const fechaHoraActual = new Date();
    
    // Obtener fecha en formato "dd-MM-yyyy"
    this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
          
    // Obtener hora en formato "HH:mm:ss"
    this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));
        
    this.upd_zfi_gv_paper_general = {
      auth: 1,
      userAuth: this.complete_name,
      dateAuth: this.fechaActual,
      timeAuth: this.horaActual
    }

    this.emailV = {
      pernr: pernr,
      reinr: reinr,
      message: mensaje,
      title: titulo,
      subtitle: subtitulo
    }

    this.http.patch(this.url+'GENERAL/' + receiptno, this.upd_zfi_gv_paper_general).subscribe(upd_general => {
      if(upd_general)
      {
        this.http.post(this.url+'EmailV', this.emailV).subscribe(email_v => {
          if(email_v)
          {
            let timerInterval = 0;
            Swal.fire({
              icon: 'success',
              title: 'Gasto aprobado!',
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
        
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((res) => {
              if(res.dismiss === Swal.DismissReason.timer){
                location.reload()
              }
            })

          }else { console.log('ERROR en EMAIL_V') }
        })
      }else{ console.log('ERROR en UPD_GENERAL') }
    })

  }

  declain(receiptno: number, reinr: string, pernr: string)
  {
    Swal.fire({
      icon: 'info',
      title: 'Debes de enviar la justificación de la respuesta:',
      input: 'textarea',
      showConfirmButton: true,
      confirmButtonText: 'Notificar',
      confirmButtonColor: 'purple'
    }).then(respuesta => {
      this.comentario = respuesta.value;

      if(this.comentario == '')
      {
        Swal.fire({
          icon: 'error',
          title: 'Debes de enviar un comentario del porqué el gasto fue rechazado!',
          showConfirmButton: true,
          confirmButtonColor: '#F25F29'
        }).then(respuesta => {
          if(respuesta.isConfirmed)
          {
            location.reload()
          }
        })
      }
      else if(this.comentario != '')
      { 
    const titulo = 'Nuevo gasto de viaje rechazado!';
    const subtitulo = 'Viaje: '+reinr;
    const mensaje = 'El administrador ha rechazado un gasto de tu viaje: ' + reinr + ', valida los datos capturados.';

    const fechaHoraActual = new Date();
    
    // Obtener fecha en formato "dd-MM-yyyy"
    this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
          
    // Obtener hora en formato "HH:mm:ss"
    this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));
        
    this.upd_zfi_gv_paper_general = {
      auth: 2,
      userAuth: this.complete_name,
      dateAuth: this.fechaActual,
      timeAuth: this.horaActual,
      comentario: this.comentario
    }

    this.emailV = {
      pernr: pernr,
      reinr: reinr,
      message: mensaje,
      title: titulo,
      subtitle: subtitulo
    }

    this.http.patch(this.url+'GENERAL/' + receiptno, this.upd_zfi_gv_paper_general).subscribe(upd_general => {
      if(upd_general)
      {
        this.http.post(this.url+'EmailV', this.emailV).subscribe(email_v => {
          if(email_v)
          {
            let timerInterval=0;
        Swal.fire({
          icon: 'success',
          iconColor: 'red',
          title: 'Gasto rechazado!',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
    
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((res) => {
          if(res.dismiss === Swal.DismissReason.timer){
            location.reload()
          }
        })
          }else { console.log('ERROR en EMAIL_V') }
        })
      }else{ console.log('ERROR en UPD_GENERAL') }
    })
      }
    })
  }

  showExpense(id: number, reinrHead: string, receiptno: number)
  {
    const data = {idHead: id, reinr: reinrHead, receiptno: receiptno}

  this.sharedDataService.setData(data);
  //console.log('Datos establecidos en el servicio:', data);
        
  localStorage.setItem('DataMostrarGasto-Administrador', JSON.stringify(data)); // Guardar en localStorage
        
  // Navegar a la otra vista después de establecer los datos
  window.location.href='/Administrador/Detalles/Gastos';
  }


  }
