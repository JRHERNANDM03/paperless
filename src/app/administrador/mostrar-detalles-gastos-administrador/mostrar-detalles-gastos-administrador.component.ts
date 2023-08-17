import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

interface ptrv_head{
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

interface info_expenses{
  auth: number;
  bus_purpo: string;
  bus_reason: string;
  comentario: string;
  country: string;
  dateAuth: string;
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
  timeAuth: string;
  userAuth: string;
  user_crea: string;
  user_mod: string;
  uuid: string;
  xml: number;
}

interface info_user{
  PERNR: number;
  area: string;
  area_id: number;
  lastname: string;
  name: string;
  nickname: string;
  puesto: string;
  rol_id: number;
}

@Component({
  selector: 'app-mostrar-detalles-gastos-administrador',
  templateUrl: './mostrar-detalles-gastos-administrador.component.html',
  styleUrls: ['./mostrar-detalles-gastos-administrador.component.css']
})
export class MostrarDetallesGastosAdministradorComponent implements OnInit{

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe){}

displayChange = 'block';

idHead!: number;
reinrHead!: string;
idReceiptno!: number;

authHead!: number;
pernrHead!: string;

nameCollaborator!: string;

complete_name!: string;

  authorized!: number;
  bus_purpo!: string;
  bus_reason!: string;
  comentario!: string;
  country!: string;
  dateAuth!: string;
  descript!: string;
  exp_type!: string;
  fec_crea!: string;
  fec_mod!: string;
  hora_crea!: string;
  hora_mod!: string;
  loc_amount!: number;
  loc_curr!: string;
  multipli!: number;
  object_id!: string;
  p_ctg!: string;
  p_doc!: string;
  p_prv!: string;
  pdf!: number;
  pernr!: string;
  rec_amount!: number;
  rec_curr!: string;
  rec_date!: string;
  receiptno!: number;
  region!: string;
  reinr!: string;
  shorttxt!: string;
  tax_code!: string;
  timeAuth!: string;
  userAuth!: string;
  user_crea!: string;
  user_mod!: string;
  uuid!: string;
  xml!: number;

  authGeneral!: string;

  fechaActual!: string;
  horaActual!: string;

  upd_zfi_gv_paper_general: any = {}
  emailV: any = {}


  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.idHead = params['idHead'];
          this.reinrHead = params['reinr'];
          this.idReceiptno = params['receiptno'];

          this.getDataTrip(params['reinr'])
          this.getDataExpenses(params['receiptno'])

        })

        this.auth.user$.subscribe(infoUser => {
          this.complete_name = String(infoUser?.name)
        })
      }
    })
  }

getDataTrip(reinr: string)
{
  this.http.get<ptrv_head>('http://localhost:3000/PTRV_HEAD/' + reinr).subscribe(data => {
    this.authHead = data.auth;
    this.pernrHead = data.pernr;

    this.getDataUser(data.pernr)
  })
}

getDataUser(pernr: string)
{
  this.http.get<info_user>('http://localhost:3000/User/' + pernr).subscribe(data => {
    this.nameCollaborator = data.name
  })
}

getDataExpenses(receiptno: number)
{
  this.http.get<info_expenses>('http://localhost:3000/GENERAL/' + receiptno).subscribe(data => {
    this.authorized = data.auth;
    this.bus_purpo = data.bus_purpo;
    this.bus_reason = data.bus_reason;
    this.comentario = data.comentario;
    this.country = data.country;
    this.dateAuth = data.dateAuth;
    this.descript = data.descript;
    this.exp_type = data.exp_type;
    this.fec_crea = data.fec_crea;
    this.fec_mod = data.fec_mod;
    this.hora_crea = data.hora_crea;
    this.hora_mod = data.hora_mod;
    this.loc_amount = data.loc_amount;
    this.loc_curr = data.loc_curr;
    this.multipli = data.multipli;
    this.object_id = data.object_id;
    this.p_ctg = data.p_ctg;
    this.p_doc = data.p_doc;
    this.p_prv = data.p_prv;
    this.pdf = data.pdf;
    this.pernr = data.pernr;
    this.rec_amount = data.rec_amount;
    this.rec_curr = data.rec_curr;
    this.rec_date = data.rec_date;
    this.receiptno = data.receiptno;
    this.region = data.region;
    this.reinr = data.reinr;
    this.shorttxt = data.shorttxt;
    this.tax_code = data.tax_code;
    this.timeAuth = data.timeAuth;
    this.userAuth = data.userAuth;
    this.user_crea = data.user_crea;
    this.user_mod = data.user_mod;
    this.uuid = data.uuid;
    this.xml = data.xml;

    if(data.auth == 1 || data.auth == 2){
      this.displayChange = 'none';
    }

    if(data.auth === 0)
      {
        this.authGeneral = 'PENDIENTE';
      }else if(data.auth === 1)
      {
        this.authGeneral = 'APROBADO';
      }else if(data.auth === 2)
      {
        this.authGeneral = 'RECHAZADO';
      }else
      {
        this.authGeneral = 'UNDEFINED'
      }
  })
}

  
notify(receiptno: number, reinr: string, pernr: string) {

  this.http.get<ptrv_head>('http://localhost:3000/PTRV_HEAD/' + reinr).subscribe(data => {
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

  this.http.patch('http://localhost:3000/GENERAL/' + receiptno, this.upd_zfi_gv_paper_general).subscribe(upd_general => {
    if(upd_general)
    {
      this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
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

  this.http.patch('http://localhost:3000/GENERAL/' + receiptno, this.upd_zfi_gv_paper_general).subscribe(upd_general => {
    if(upd_general)
    {
      this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
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



  documentError()
  {
    Swal.fire({
      icon: 'error',
      title: 'No hay documento adjunto',
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    })
  }

  showFile(uuid: string)
  {
    if(uuid.length > 0)
    {
      window.open('../../assets/files/testFile.pdf');
    }else if(uuid.length <=0){
      this.documentError()
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

}
