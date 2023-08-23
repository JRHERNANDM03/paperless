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
  selector: 'app-detalles-gasto',
  templateUrl: './detalles-gasto.component.html',
  styleUrls: ['./detalles-gasto.component.css']
})
export class DetallesGastoComponent implements OnInit {

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
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
       /* this.route.queryParams.subscribe(params => {
          const id = params['id'];
          this.authCloseTrip = params['authCloseTrip']
           this.getData(id);
           this.id_head = (params['head']);
        });*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          const id = this.recivedData.id;
          this.authCloseTrip = this.recivedData.authCloseTrip;
          this.id_head = this.recivedData.head;

          this.getData(id)
        }else
        {
          const localStorageData = localStorage.getItem('DataMostrarGasto-Viajero');
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            const id = parsedData.id;
            this.authCloseTrip = parsedData.authCloseTrip;
            this.id_head = parsedData.head;

            this.getData(id)
            }
        }

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
