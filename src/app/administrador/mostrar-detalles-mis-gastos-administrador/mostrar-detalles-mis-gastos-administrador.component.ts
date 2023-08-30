import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

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

@Component({
  selector: 'app-mostrar-detalles-mis-gastos-administrador',
  templateUrl: './mostrar-detalles-mis-gastos-administrador.component.html',
  styleUrls: ['./mostrar-detalles-mis-gastos-administrador.component.css']
})
export class MostrarDetallesMisGastosAdministradorComponent implements OnInit{

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

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
  receiptno!: string;
  region!: string;
  reinr!: string;
  shorttxt!: string;
  tax_code!: string;
  user_crea!: string;
  user_mod!: string;
  uuid!: string;
  xml!: number;

  authGeneral: string = '';

  recivedData: any;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
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

  getDataExpenses(receiptno: number)
  {
    this.http.get<tripExpenses>('http://localhost:3000/GENERAL/' + receiptno).subscribe(expenses => {
      this.authorized = expenses.auth;
      this.bus_purpo = expenses.bus_purpo;
      this.bus_reason = expenses.bus_reason;
      this.comentario = expenses.comentario;
      this.country = expenses.country;
      this.descript = expenses.descript;
      this.exp_type = expenses.exp_type;
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
      this.tax_code = expenses.tax_code;
      this.user_crea = expenses.user_crea;
      this.user_mod = expenses.user_mod;
      this.uuid = expenses.uuid;
      this.xml = expenses.xml;

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
