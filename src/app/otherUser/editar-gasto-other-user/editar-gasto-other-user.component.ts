import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

interface user
{
  name: string;
}

interface head
{
  reinr: string;
}

interface dataGeneral
{
  reinr: string;
  exp_type: string;
  loc_amount: number;
  loc_curr: string;
  multipli: number;
  rec_date: string;
  tax_code: string;
  bus_purpo: string;
  descript: string;
  uuid: string;
}

interface zfi_gv_paper_general
{
  pernr: string;
  reinr: string;
}

@Component({
  selector: 'app-editar-gasto-other-user',
  templateUrl: './editar-gasto-other-user.component.html',
  styleUrls: ['./editar-gasto-other-user.component.css']
})
export class EditarGastoOtherUserComponent implements OnInit {

idHead!: number;
pernr!: number;

name!: string;
reinr!: string;

receiptno!: number;
exp_type!: string;
loc_amount!: number;
loc_curr!: string;
multipli!: number;
rec_date!: string;
tax_code!: string;
bus_purpo!: string;
descript!: string;
uuid!: string;

nickname!: string;
fechaActual!: string;
horaActual!: string;

exp_typeN: string = '';
locAmountN: number = 0;
locCurrN: string = '';
dateN: string = '';
taxCodeN: string = '';
multipliN: number = 0;
busPurpoN: string = '';
descriptN: string = '';
documentoN: string = '';
pdfN: number = 0;
xmlN: number = 0;

selectedFile: File | undefined;

Updategastos:any =
{
  multipli:this.multipliN,
  descript:this.descriptN,
  bus_purpo:this.busPurpoN,
  exp_type:this.exp_typeN,
  rec_date:this.dateN,
  loc_amount:this.locAmountN,
  loc_curr:this.locCurrN,
  tax_code:this.taxCodeN,
  uuid:this.documentoN,
  pdf:'...',
  xml:'...',
  user_mod:this.nickname,
  fec_mod:this.fechaActual,
  hora_mod:this.horaActual
}

Updategastos2: any = {};

sendEmailA: any = {}

authExpense!: number;

recivedData: any;
  constructor (private router:Router, public auth:AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthentica => {
    if(!isAuthentica)
    {
      this.router.navigate(['login'])
    }else if(isAuthentica){

      document.querySelector('#contenerdorCentrador')?.scrollIntoView()
      /*this.route.queryParams.subscribe(params => {
          this.receiptno = params['id'];
          this.idHead = params['head'];
          this.pernr = params['pernr'];
          this.getInfoUser(this.pernr)
          this.getInfoHead(this.idHead)
          this.getData(this.receiptno)

          this.auth.user$.subscribe(user => {
            this.nickname = String(user?.nickname);
          })
      })*/

      this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.receiptno = this.recivedData.id;
          this.idHead = this.recivedData.head;
          this.pernr = this.recivedData.pernr;
          this.authExpense = this.recivedData.authExpense;

          this.getInfoUser(this.pernr)
          this.getInfoHead(this.idHead)
          this.getData(this.receiptno)

          this.auth.user$.subscribe(user => {
            this.nickname = String(user?.nickname)
          })

        }else{
          const localStorageData = localStorage.getItem('DataEditarGasto-otherUser');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.receiptno = parsedData.id;
          this.idHead = parsedData.head;
          this.pernr = parsedData.pernr;
          this.authExpense = parsedData.authExpense;

          this.getInfoUser(this.pernr)
          this.getInfoHead(this.idHead)
          this.getData(this.receiptno)

          this.auth.user$.subscribe(user => {
            this.nickname = String(user?.nickname)
          })
        
        }
        }
    }
  })
}

getInfoUser(pernr: number)
{
  this.http.get<user>('http://localhost:3000/User/' + pernr).subscribe(data => {
    this.name = data.name;
  })
}

getInfoHead(id: number)
{
  this.http.get<head>('http://localhost:3000/PTRV_HEADS/' + id).subscribe(data => {
    this.reinr = data.reinr;
  })
}


getData(receiptno: number)
{
  this.http.get<dataGeneral>('http://localhost:3000/GENERAL/' + receiptno).subscribe(data => {
    this.reinr = data.reinr;
    this.exp_type = data.exp_type;
    this.loc_amount = data.loc_amount;
    this.loc_curr = data.loc_curr;
    this.multipli = data.multipli;
    this.rec_date = data.rec_date;
    this.tax_code = data.tax_code;
    this.bus_purpo = data.bus_purpo;
    this.descript = data.descript;
    this.uuid = data.uuid;

    this.exp_typeN = this.exp_type;
    this.locAmountN = this.loc_amount;
    this.locCurrN = this.loc_curr;
    this.dateN = this.rec_date;
    this.taxCodeN = this.tax_code;
    this.multipliN = this.multipli;
    this.busPurpoN = this.bus_purpo;
    this.descriptN = this.descript;
  })
}
  formValid(): boolean {
    // Verificar si los campos requeridos están llenados
    if (
      this.exp_typeN &&
      this.locAmountN &&
      this.locCurrN &&
      this.dateN &&
      this.taxCodeN &&
      this.multipliN &&
      this.busPurpoN &&
      this.descriptN &&
      this.documentoN
    ) {
      return true; // Todos los campos están llenados
    } else {
      return false; // Al menos un campo requerido está vacío
    }
  }

  submitForm() {

    const fecha = new Date();
  
    // Obtener la fecha actual en formato dd/mm/yyyy
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    this.fechaActual = `${dia}/${mes}/${anio}`;
          
    // Obtener la hora actual en formato hh:mm:ss
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    this.horaActual = `${hora}:${minutos}:${segundos}`;
  
    if (this.selectedFile && this.selectedFile.name.endsWith('.pdf')) {
      this.pdfN = 1;
      this.xmlN = 0;
      this.documentoN = (this.selectedFile.name)
    } else if (this.selectedFile && this.selectedFile.name.endsWith('.xml')) {
      this.pdfN = 0;
      this.xmlN = 1;
      this.documentoN = (this.selectedFile.name)
    } else {
      console.log('No se seleccionó ningún archivo o el archivo no tiene una extensión permitida.');
      // Realizar acciones para otros tipos de archivo o cuando no se selecciona ningún archivo
    }

    this.Updategastos=
    {
      multipli:this.multipliN,
      descript:this.descriptN,
      bus_purpo:this.busPurpoN,
      exp_type:this.exp_typeN,
      rec_date:this.dateN,
      loc_amount:this.locAmountN,
      loc_curr:this.locCurrN,
      tax_code:this.taxCodeN,
      pdf:this.pdfN,
      xml:this.xmlN,
      uuid:this.documentoN,
      user_mod:this.nickname,
      fec_mod:this.fechaActual,
      hora_mod:this.horaActual

    }

  /*  this.http.patch('http://localhost:3000/GENERAL/' + this.receiptno, this.Updategastos).subscribe(res => {
    this.update()
}) */

this.Updategastos2=
    {
      multipli:this.multipliN,
      descript:this.descriptN,
      bus_purpo:this.busPurpoN,
      exp_type:this.exp_typeN,
      rec_date:this.dateN,
      loc_amount:this.locAmountN,
      loc_curr:this.locCurrN,
      tax_code:this.taxCodeN,
      pdf:this.pdfN,
      xml:this.xmlN,
      uuid:this.documentoN,
      user_mod:this.nickname,
      fec_mod:this.fechaActual,
      hora_mod:this.horaActual,
      auth: 0

    }

    /* */

    if(this.authExpense == 0)
    {

      this.http.patch('http://localhost:3000/GENERAL/' + this.receiptno, this.Updategastos).subscribe(res => {
    this.update()
      })

    }else if(this.authExpense == 2)
    {

      this.http.patch('http://localhost:3000/GENERAL/' + this.receiptno, this.Updategastos2).subscribe(res => {
    this.update2()
      })

    }else{

      Swal.fire({
        icon: 'warning',
        iconColor: 'purple',
        title: 'Ocurrio un error durante el proceso, contacta a soporte',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: 'orange'
      }).then(result => {
        if(result.isConfirmed)
        {
          window.location.href="/otherUser/Gastos"
        }
      })

    }
  }

  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    update(){
      // this.router.navigate(["/ViajeroHome"])
      let timerInterval=0;
      Swal.fire({
       icon: 'success',
       iconColor: '#E7EA1A',
       title: 'Registro actualizado con exito',
       showCancelButton: false,
       showConfirmButton: true,
       confirmButtonText: 'Aceptar',
       confirmButtonColor: '#2A46D7', 
      }).then((result) => {
       if(result.isConfirmed)
       {
         this.router.navigate(["/otherUser/Gastos"])
       }
      })
     
     }

     update2()
  {

    //console.log(this.receiptno)

    this.http.get<zfi_gv_paper_general>('http://localhost:3000/GENERAL/' + this.receiptno).subscribe(data => {
      
      
      const titleA = 'Nuevo gasto actualizado.';
      const subtitleA = 'Viaje: '+ data.reinr;
      const messageA = 'El usuario '+ this.nickname +' ha actualizado un gasto que se encontraba como rechazado para una nueva aprobación.';
      
      this.sendEmailA = {
        pernr: data.pernr,
        reinr: data.reinr,
        message: messageA,
        title: titleA,
        subtitle: subtitleA
      }

      this.http.post('http://localhost:3000/EmailA', this.sendEmailA).subscribe(emailA => {
        if(emailA)
        {
          let timerInterval = 0;

          Swal.fire({
            icon: 'success',
            iconColor: 'yellow',
            title: 'Gasto actualizado',
            text: 'Informando al administrador de tu cambio',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,

            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if(result.dismiss === Swal.DismissReason.timer)
            {
              window.location.href='/otherUser/Gastos'
            }
          })
        }
      })

    })
  }

}
