import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import { Storage, ref, listAll, getDownloadURL} from '@angular/fire/storage';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

interface tripExpenses{
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
  receiptno: string;
  region: string;
  reinr: string;
  shorttxt: string;
  tax_code: string;
  user_crea: string;
  user_mod: string;
  uuid: string;
  xml: number;
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
  selector: 'app-mostrar-detalles-mis-gastos-administrador',
  templateUrl: './mostrar-detalles-mis-gastos-administrador.component.html',
  styleUrls: ['./mostrar-detalles-mis-gastos-administrador.component.css']
})
export class MostrarDetallesMisGastosAdministradorComponent implements OnInit{

  constructor(private storage: Storage, public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  idReceiptno!: number;
  idHead!: number;
  reinrHead!: string;
  authCloseTrip!: number;


  authorized!: number;
  bus_purpo!: string;
  bus_reason!: string;
  comentario!: string;
  country!: string;
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
  receiptno!: string;
  region!: string;
  reinr!: string;
  shorttxt!: string;
  tax_codeGeneral!: string;
  user_crea!: string;
  user_mod!: string;
  uuid!: string;
  xml!: number;

  authGeneral: string = '';

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

       /* this.route.queryParams.subscribe(params => {
          this.idReceiptno = params['id'];
          this.idHead = params['idHead'];
          this.reinrHead = params['reinr'];
          this.authCloseTrip = params['authCloseTrip'];

          this.getDataExpenses(params['id'])
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {

          this.idReceiptno = this.recivedData.id;
          this.idHead = this.recivedData.idHead;
          this.reinrHead = this.recivedData.reinr;
          this.authCloseTrip = this.recivedData.authCloseTrip;

          this.getDataExpenses(this.recivedData.id)

        }else{
          const localStorageData = localStorage.getItem('DataMostrarGasto-Administrador');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.idReceiptno = parsedData.id;
          this.idHead = parsedData.idHead;
          this.reinrHead = parsedData.reinr;
          this.authCloseTrip = parsedData.authCloseTrip;

          this.getDataExpenses(parsedData.id)           

        }}
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

  getDataExpenses(receiptno: number)
  {
    this.http.get<tripExpenses>(this.url+'GENERAL/' + receiptno).subscribe(expenses => {
    
    const fileName = expenses.uuid;

this.getDocument(fileName)
    
    this.authorized = expenses.auth;
      this.bus_purpo = expenses.bus_purpo;
      this.bus_reason = expenses.bus_reason;
      this.comentario = expenses.comentario;
      this.country = expenses.country;
      this.descript = expenses.descript;
      //this.exp_type = expenses.exp_type;
      this.fec_crea = expenses.fec_crea;
      this.fec_mod = expenses.fec_mod;
      this.hora_crea = expenses.hora_crea;
      this.hora_mod = expenses.hora_mod;
      this.loc_amount = expenses.loc_amount;
      this.loc_curr = expenses.loc_curr;
      this.multipli = expenses.multipli;
      this.object_id = expenses.object_id;
      this.p_ctg = expenses.p_ctg;
      this.p_doc = expenses.p_doc;
      this.p_prv = expenses.p_prv;
      this.pdf = expenses.pdf;
      this.pernr = expenses.pernr;
      this.rec_amount = expenses.rec_amount;
      this.rec_curr = expenses.rec_curr;
      this.rec_date = expenses.rec_date;
      this.receiptno = expenses.receiptno;
      this.region = expenses.region;
      this.reinr = expenses.reinr;
      this.shorttxt = expenses.shorttxt;
      //this.tax_code = expenses.tax_code;
      this.user_crea = expenses.user_crea;
      this.user_mod = expenses.user_mod;
      this.uuid = expenses.uuid;
      this.xml = expenses.xml;

      //this.exp_typeGeneral = data.exp_type;
      switch(expenses.exp_type){
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
    if(expenses.tax_code == 'F2')
    {
      this.tax_codeGeneral = 'IVA Acreditable 16%'
    }else if(expenses.tax_code == 'E3')
    {
      this.tax_codeGeneral = 'IVA Acreditable Exento'
    }else if(expenses.exp_type == 'E0')
    {
      this.tax_codeGeneral = 'IVA Acreditable 0%'
    }else{
      this.tax_codeGeneral = 'UNDEFINED'
    }

      if(expenses.auth === 0)
      {
        this.authGeneral = 'PENDIENTE';
      }else if(expenses.auth === 1)
      {
        this.authGeneral = 'APROBADO';
      }else if(expenses.auth === 2)
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
