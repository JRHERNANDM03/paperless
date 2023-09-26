import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import { Storage, ref, listAll, getDownloadURL} from '@angular/fire/storage';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import { ServiceService } from 'src/app/Service/service.service';

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
  selector: 'app-mostrar-detalles-gastos-administrador',
  templateUrl: './mostrar-detalles-gastos-administrador.component.html',
  styleUrls: ['./mostrar-detalles-gastos-administrador.component.css']
})
export class MostrarDetallesGastosAdministradorComponent implements OnInit{

  constructor (private storage: Storage, private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe, private sharedDataService: SharedDataService){}

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
  exp_typeGeneral!: string;
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
  tax_codeGeneral!: string;
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

        /*this.route.queryParams.subscribe(params => {
          this.idHead = params['idHead'];
          this.reinrHead = params['reinr'];
          this.idReceiptno = params['receiptno'];

          this.getDataTrip(params['reinr'])
          this.getDataExpenses(params['receiptno'])

        })*/

        this.getDataUserLogg();

        this.recivedData = this.sharedDataService.getData()

      if(this.recivedData)
      {

        this.idHead = this.recivedData.idHead;
        this.reinrHead = this.recivedData.reinr;
        this.idReceiptno = this.recivedData.receiptno;

        this.getDataTrip(this.recivedData.reinr)
        this.getDataExpenses(this.recivedData.receiptno)

      }else{
        const localStorageData = localStorage.getItem('DataMostrarGasto-Administrador');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      
      this.idHead = parsedData.idHead;
        this.reinrHead = parsedData.reinr;
        this.idReceiptno = parsedData.receiptno;

        this.getDataTrip(parsedData.reinr)
        this.getDataExpenses(parsedData.receiptno)       

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

getDataTrip(reinr: string)
{
  this.http.get<ptrv_head>(this.url+'PTRV_HEAD/' + reinr).subscribe(data => {
    this.authHead = data.auth;
    this.pernrHead = data.pernr;

    this.getDataUser(data.pernr)
  })
}

getDataUser(pernr: string)
{
  this.http.get<info_user>(this.url+'User/' + pernr).subscribe(data => {
    this.nameCollaborator = data.name
  })
}

getDataExpenses(receiptno: number)
{
  this.http.get<info_expenses>(this.url+'GENERAL/' + receiptno).subscribe(data => {
  
  const fileName = data.uuid;

this.getDocument(fileName)
  
  this.authorized = data.auth;
    this.bus_purpo = data.bus_purpo;
    this.bus_reason = data.bus_reason;
    this.comentario = data.comentario;
    this.country = data.country;
    this.dateAuth = data.dateAuth;
    this.descript = data.descript;
    //this.exp_type = data.exp_type;
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
    //this.tax_code = data.tax_code;
    this.timeAuth = data.timeAuth;
    this.userAuth = data.userAuth;
    this.user_crea = data.user_crea;
    this.user_mod = data.user_mod;
    this.uuid = data.uuid;
    this.xml = data.xml;

    //this.exp_typeGeneral = data.exp_type;
    switch(data.exp_type){
      case 'ALID': 
        this.exp_typeGeneral = 'Alim Rest Liver P/Complementar';
        break;
      case 'ALIE':
        this.exp_typeGeneral = 'Alimento P/Empleado';
        break;
      case 'ALIL':
        this.exp_typeGeneral = 'Alimento P/ Lpc';
        break;
      case 'AVIP':
        this.exp_typeGeneral = 'Avion P/Empresa';
        break;
      case 'AVIR':
        this.exp_typeGeneral = 'Avion P/Empr.Reutilizado';
        break;
      case 'BUSE':
        this.exp_typeGeneral = 'Transp. P/Empleado';
        break;
      case 'BUSL':
        this.exp_typeGeneral = 'Transp. P/Lpc';
        break;
      case 'CABE':
        this.exp_typeGeneral = 'Cgo Canc/Camb Avion Empleado';
        break;
      case 'CABL':
        this.exp_typeGeneral = 'Cgo Canc/Camb Avion Lpc';
        break;
      case 'CASE':
        this.exp_typeGeneral = 'Caseta P/Empleado';
        break;
      case 'CASL':
        this.exp_typeGeneral = 'Caseta Pagada C/Lpc';
        break; 
      case 'CDEL':
        this.exp_typeGeneral = 'Comision X Disp Efvo Lpc';
        break;
      case 'ESTE':
        this.exp_typeGeneral = 'Estac. P/Empleado';
        break;
      case 'ESTL':
        this.exp_typeGeneral = 'Estac. P/Lpc';
        break;
      case 'EVEE':
        this.exp_typeGeneral = 'Evento P/Empleado';
        break;
      case 'EVEL':
        this.exp_typeGeneral = 'Evento P/Lpc';
        break;
      case 'EXPE':
        this.exp_typeGeneral = 'Expo P/Empleado';
        break;
      case 'EXPL':
        this.exp_typeGeneral = 'Expo P/Lpc';
        break;
      case 'FAK':
        this.exp_typeGeneral = 'Dieta Kilómetros';
        break;
      case 'GASE':
        this.exp_typeGeneral = 'Gasolina P/Empleado';
        break;
      case 'GASL':
        this.exp_typeGeneral = 'Gasolina P/Lpc';
        break;
      case 'GSCE':
        this.exp_typeGeneral = 'Gasto Sin Compr. P/Empleado';
        break;
      case 'GSCL':
        this.exp_typeGeneral = 'Gasto Sin Compr. P/Lpc';
        break;
      case 'HOTE':
        this.exp_typeGeneral = 'Hotel P/Empleado';
        break;
      case 'HOTL':
        this.exp_typeGeneral = 'Hotel P/Lpc';
        break;
      case 'IHOE':
        this.exp_typeGeneral = 'Imp. Hotel P/Empleado';
        break;
      case 'IHOL':
        this.exp_typeGeneral = 'Imp. Hotel P/Lpc';
        break;
      case 'IMIE':
        this.exp_typeGeneral = 'Imp. Migra P/Empleado';
        break;
      case 'IMIL':
        this.exp_typeGeneral = 'Imp. Migra Pagado Lpc';
        break;
      case 'MEDE':
        this.exp_typeGeneral = 'Medico P/Empleado';
        break;
      case 'MEDL':
        this.exp_typeGeneral = 'Medico P/Lpc';
        break;
      case 'MUEE':
        this.exp_typeGeneral = 'Muestra P/Empleado';
        break;
      case 'MUEL':
        this.exp_typeGeneral = 'Muestra P/Lpc';
        break;
      case 'PAPE':
        this.exp_typeGeneral = 'Papeleria P/Empleado';
        break;
      case 'PAPL':
        this.exp_typeGeneral = 'Papeleria P/Lpc';
        break;
      case 'PROE':
        this.exp_typeGeneral = 'Propina P/Empleado';
        break;
      case 'PROL':
        this.exp_typeGeneral = 'Propina P/Lpc';
        break;
      case 'RAUE':
        this.exp_typeGeneral = 'Renta Auto P/Empleado';
        break;
      case 'RAUL':
        this.exp_typeGeneral = 'Renta Auto P/Lpc';
        break;
      case 'TACE':
        this.exp_typeGeneral = 'Taxi C/Comp P/Empleado';
        break;
      case 'TASE':
        this.exp_typeGeneral = 'Taxi S/Comp P/Empleado';
        break;
      case 'TASL':
        this.exp_typeGeneral = 'Taxi S/Comp Pagado Lpc';
        break;
      case 'TELE':
        this.exp_typeGeneral = 'Telefono P/Empleado';
        break;
      case 'TELL':
        this.exp_typeGeneral = 'Telefono P/Lpc';
        break;
      case 'TINE':
        this.exp_typeGeneral = 'Tintoreria P/Empleado';
        break;
      case 'TINL':
        this.exp_typeGeneral = 'Tintoreria P/Lpc';
        break;
      case 'TUAP':
        this.exp_typeGeneral = 'Tua. Pagado Empresa';
        break;
      case 'TUAR':
        this.exp_typeGeneral = 'Der. Aer. P/Empr. Reutil';
        break;
      case 'UBPA':
        this.exp_typeGeneral = 'Dieta Alojamiento';
        break;
      case 'VERP':
        this.exp_typeGeneral = 'Dieta Manutención';
        break;
      case 'VORK':
        this.exp_typeGeneral = 'Adelanto Caja';
        break;
      case 'VORS':
        this.exp_typeGeneral = 'Anticipo';
        break;
      case 'ZALE':
        this.exp_typeGeneral = 'Zalim P/Emp No Ded Exc T.F.';
        break;
      case 'ZALL':
        this.exp_typeGeneral = 'Zalim P/Lpc No Ded Exc T.F.';
        break;
      case 'ZALP':
        this.exp_typeGeneral = 'Zalim P/Liv No Ded Exc T.F.';
        break;
      case 'ZAVN':
        this.exp_typeGeneral = 'Avion No Utilizado  P//Empresa';
        break;
      case 'ZAVU':
        this.exp_typeGeneral = 'Avion Utilizado. P/Empresa';
        break;
      case 'ZCOE':
        this.exp_typeGeneral = 'Z Costo Estimado';
        break;
      case 'ZGND':
        this.exp_typeGeneral = 'Zgdv No Deducible Exc T.F.';
        break;
      case 'ZGNL':
        this.exp_typeGeneral = 'Zgdv No Ded P/Lpc Exc T.F.';
        break;
      case 'ZGSD':
        this.exp_typeGeneral = 'Zgasto Sin Comprobante';
        break;
      case 'ZHET':
        this.exp_typeGeneral = 'Zhotel No Ded Exc T.F.';
        break;
      case 'ZPRE':
        this.exp_typeGeneral = 'Zgsto S/Comp Prop P/Empleado';
        break;
      case 'ZPRL':
        this.exp_typeGeneral = 'Zgsto S/Comp Prop P/Lpc';
        break;
      case 'ZSCL':
        this.exp_typeGeneral = 'Zgsto S/Comp P/Lpc';
        break;
      case 'ZTAE':
        this.exp_typeGeneral = 'Zgsto S/Comp Taxi P/Empleado';
        break;
      case 'ZTAL':
        this.exp_typeGeneral = 'Zgsto S/Comp Taxi P/Lpc';
        break;
      case 'ZTUN':
        this.exp_typeGeneral = 'Tua No Utilizado P/Empresa';
        break;
      case 'ZTUU':
        this.exp_typeGeneral = 'Tua Utiizado P/Empresa';
        break;

        default:
          this.exp_typeGeneral = 'UNDEFINED';
    }

    //this.tax_codeGeneral = data.tax_code;
  if(data.tax_code == 'F2')
  {
    this.tax_codeGeneral = 'IVA Acreditable 16%'
  }else if(data.tax_code == 'E3')
  {
    this.tax_codeGeneral = 'IVA Acreditable Exento'
  }else if(data.exp_type == 'E0')
  {
    this.tax_codeGeneral = 'IVA Acreditable 0%'
  }else{
    this.tax_codeGeneral = 'UNDEFINED'
  }

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

getDocument(fileName: string)
  {

    //console.log(fileName)
    const documentRef = ref(this.storage, 'files/');

    listAll(documentRef)
    .then(async response => {

      let x = 0;

      for(x=0; x < response.items.length; x++)
      {
        //console.log('\n' + response.items[x].name)
        if(fileName == response.items[x].name)
        {
          //console.log(fileName + ' -- ' + response.items[x].name)
          const url = await getDownloadURL(response.items[x])
          //console.log(url)
          this.fileDownloadURL = url;
        }
      }
    })
    .catch(error => { 
      console.log(error)
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
