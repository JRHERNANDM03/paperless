import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

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

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

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
