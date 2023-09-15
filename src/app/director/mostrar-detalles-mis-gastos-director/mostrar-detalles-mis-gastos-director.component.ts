import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';

import Swal from 'sweetalert2';

interface zfi_gv_paper_general
{
  pernr: string;
  reinr: string;
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
  multipli: string;
  descript: string;
  bus_purpo: string;
  comentario: string;
  uuid: string;
  auth: number; 
}

@Component({
  selector: 'app-mostrar-detalles-mis-gastos-director',
  templateUrl: './mostrar-detalles-mis-gastos-director.component.html',
  styleUrls: ['./mostrar-detalles-mis-gastos-director.component.css']
})
export class MostrarDetallesMisGastosDirectorComponent implements OnInit{


  pernrGeneral!: string;
  reinrGeneral!: string;
  receiptnoGeneral!: number;
  exp_typeGeneral!: string;
  rec_amountGeneral!: number;
  rec_currGeneral!: string;
  rec_rateGeneral!: string;
  loc_amountGeneral!: number;
  loc_currGeneral!: string;
  tax_codeGeneral!: string;
  rec_dateGeneral!: string;
  shorttxtGeneral!: string;
  multipli_General!: string;
  description_General!: string;
  bus_purpoGeneral!: string;
  comentarioGeneral!: string;
  uuidGeneral!: string;
  authGeneral!: string;

  id_head!: number;

  authCloseTrip!: number;

  recivedData: any;

    // Propiedad para almacenar el enlace de descarga del archivo
    fileDownloadURL: string | null = null;

  constructor(private storage: Storage, public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
       /* this.route.queryParams.subscribe(params => {
          this.authCloseTrip = params['authCloseTrip'];
          const id = params['id'];
          //console.log(params['head'])
           this.getData(id);
           this.id_head = (params['head']);
        });*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.authCloseTrip = this.recivedData.autCloseTrip;
          const id = this.recivedData.id;
          this.getData(id);
          this.id_head = this.recivedData.head;

        }else{
          const localStorageData = localStorage.getItem('DataMostrarGasto-Director');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.authCloseTrip = parsedData.autCloseTrip;
          const id = parsedData.id;
          this.getData(id);
          this.id_head = parsedData.head;
        }}
      }
    })
  }

  getData(id: number)
  {
    this.http.get<zfi_gv_paper_general>('http://localhost:3000/GENERAL/' + id).subscribe(data => {
      
    //console.log(data);
    const fileName = data.uuid;

this.getDocument(fileName)

      this.pernrGeneral = data.pernr;
      this.reinrGeneral = data.reinr;
      this.receiptnoGeneral = data.receiptno;
      //this.exp_typeGeneral = data.exp_type;
      this.rec_amountGeneral = data. rec_amount;
      this.rec_currGeneral = data.rec_curr;
      this.rec_rateGeneral = data.rec_rate;
      this.loc_amountGeneral = data.loc_amount;
      this.loc_currGeneral = data.loc_curr;
      //this.tax_codeGeneral = data.tax_code;
      this.rec_dateGeneral = data.rec_date;
      this.shorttxtGeneral = data.shorttxt;
      this.multipli_General = data.multipli;
      this.description_General = data.descript;
      this.bus_purpoGeneral = data.bus_purpo;
      this.comentarioGeneral = data.comentario;
      this.uuidGeneral = data.uuid;

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
