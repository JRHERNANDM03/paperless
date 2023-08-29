import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

interface trip
{
  reinr: string
}

interface user
{
  name: string;
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
  selector: 'app-detalle-gasto-other-user',
  templateUrl: './detalle-gasto-other-user.component.html',
  styleUrls: ['./detalle-gasto-other-user.component.css']
})
export class DetalleGastoOtherUserComponent implements OnInit {

idGeneral!: number;
head!: number;
pernr!: number;

reinr!: string;
name!: string;

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

recivedData: any;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){

        document.querySelector('#contenerdorCentrador')?.scrollIntoView()
        /*this.route.queryParams.subscribe(params => {
          this.idGeneral = params['id'];
          this.head = params['head'];
          this.pernr = params['pernr'];
          this.getDataTrip(this.head)
          this.getDataUser(this.pernr)
          this.getData(this.idGeneral);
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.idGeneral = this.recivedData.id;
          this.head = this.recivedData.head;
          this.pernr = this.recivedData.pernr;

          this.getDataTrip(this.head)
          this.getDataUser(this.pernr)
          this.getData(this.idGeneral)
        }else{
          const localStorageData = localStorage.getItem('DataMostrarGasto-otherUser');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.idGeneral = parsedData.id;
          this.head = parsedData.head;
          this.pernr = parsedData.pernr;

          this.getDataTrip(this.head)
          this.getDataUser(this.pernr)
          this.getData(this.idGeneral)
        
        }}

      }
    })
  }

  getDataTrip(id: number)
  {
    this.http.get<trip>('http://localhost:3000/PTRV_HEADS/ '+ id).subscribe(data => {
      this.reinr = data.reinr;
    })
  }

  getDataUser(pernr: number)
  {
    this.http.get<user>('http://localhost:3000/User/' + pernr).subscribe(data => {
      this.name = data.name;
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
  viewFile()
  {
    this.router.navigate(['/showFile'])
  }

}
