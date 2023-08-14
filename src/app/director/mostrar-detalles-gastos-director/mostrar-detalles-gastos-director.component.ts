import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface info
{
  name: string;
  pernr: string;
  reinr: string;
}

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
  selector: 'app-mostrar-detalles-gastos-director',
  templateUrl: './mostrar-detalles-gastos-director.component.html',
  styleUrls: ['./mostrar-detalles-gastos-director.component.css']
})
export class MostrarDetallesGastosDirectorComponent implements OnInit{


  name!: string;
  pernr!: string;
  reinr!: string;

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

  idHead!: number;
constructor(public auth:AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.idHead = params['id']
          this.getDataTrip(params['id'])
          this.getDataSpent(params['receiptno'])
        })
      }
    })
  }

  getDataTrip(idHead: number)
  {
    this.http.get<info>('http://localhost:3000/PTRV_HEADS/mostra_viaje/' + idHead).subscribe(data => {
      this.reinr = data.reinr
      this.name = data.name
      this.pernr = data.pernr
    })
  }

  getDataSpent(receiptno: number)
  {
    this.http.get<zfi_gv_paper_general>('http://localhost:3000/GENERAL/' + receiptno).subscribe(data => {
      
    //console.log(data);

      this.pernrGeneral = data.pernr;
      this.reinrGeneral = data.reinr;
      this.receiptnoGeneral = data.receiptno;
      this.exp_typeGeneral = data.exp_type;
      this.rec_amountGeneral = data. rec_amount;
      this.rec_currGeneral = data.rec_curr;
      this.rec_rateGeneral = data.rec_rate;
      this.loc_amountGeneral = data.loc_amount;
      this.loc_currGeneral = data.loc_curr;
      this.tax_codeGeneral = data.tax_code;
      this.rec_dateGeneral = data.rec_date;
      this.shorttxtGeneral = data.shorttxt;
      this.multipli_General = data.multipli;
      this.description_General = data.descript;
      this.bus_purpoGeneral = data.bus_purpo;
      this.comentarioGeneral = data.comentario;
      this.uuidGeneral = data.uuid;

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
