import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

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
  auth: number;
  comentario: string;
}

interface dataUserLog
{
  pernr: number;
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
authGeneral!: number;
comentario!: string;

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

Updategastos2: any = {}

emailA: any = {}

recivedData: any;

pernrUserLog!: number;

url:any;

  constructor (private router:Router, public auth:AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthentica => {
    if(!isAuthentica)
    {
      this.router.navigate(['login'])
    }else if(isAuthentica){
      const service = new ServiceService();
      this.url = service.url();

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
  this.http.get<user>(this.url+'User/' + pernr).subscribe(data => {
    this.name = data.name;
  })
}

getInfoHead(id: number)
{
  this.http.get<head>(this.url+'PTRV_HEADS/' + id).subscribe(data => {
    this.reinr = data.reinr;
  })
}


getData(receiptno: number)
{
  this.http.get<dataGeneral>(this.url+'GENERAL/' + receiptno).subscribe(data => {
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
    this.authGeneral = data.auth;
    this.comentario = data.comentario;

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
      this.multipliN &&
      this.busPurpoN &&
      this.descriptN 
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

    if(this.exp_typeN == 'ALID'  || this.exp_typeN == 'ALIE'  || this.exp_typeN == 'ALIL'  || this.exp_typeN == 'AVIP'  || this.exp_typeN == 'AVIR'  || 
    this.exp_typeN == 'CABE'  || this.exp_typeN == 'CABL'  || this.exp_typeN == 'CASE'  || this.exp_typeN == 'CASL'  || this.exp_typeN == 'CDEL'  || this.exp_typeN == 'ESTE'  || this.exp_typeN == 'ESTL'  || this.exp_typeN == 'EVEE'  || this.exp_typeN == 'EVEL'  || this.exp_typeN == 'EXPE'  || this.exp_typeN == 'EXPL'  ||
    this.exp_typeN == 'GASE'  || this.exp_typeN == 'GASL'  ||
    this.exp_typeN == 'HOTE'  || this.exp_typeN == 'HOTL'  ||
    this.exp_typeN == 'MEDE'  || this.exp_typeN == 'MEDL'  || this.exp_typeN == 'MUEE'  || this.exp_typeN == 'MUEL'  || this.exp_typeN == 'PAPE'  || this.exp_typeN == 'PAPL'  ||
    this.exp_typeN == 'RAUE'  || this.exp_typeN == 'RAUL'  ||
    this.exp_typeN == 'TELE'  || this.exp_typeN == 'TELL'  || this.exp_typeN == 'TINE'  || this.exp_typeN == 'TINL'  ||
    this.exp_typeN == 'ZAVN'  || this.exp_typeN == 'ZAVU'  )
    {
      this.taxCodeN = 'F2';
    }
    else if(this.exp_typeN == 'BUSE'  || this.exp_typeN == 'BUSL'  ||
    this.exp_typeN == 'GSCE'  || this.exp_typeN == 'GSCL'  ||
    this.exp_typeN == 'IHOE'  || this.exp_typeN == 'IHOL'  || this.exp_typeN == 'IMIE'  || this.exp_typeN == 'IMIL'  ||
    this.exp_typeN == 'PROE'  || this.exp_typeN == 'PROL'  ||
    this.exp_typeN == 'TACE'  || this.exp_typeN == 'TASE'  || this.exp_typeN == 'TASL'  ||
    this.exp_typeN == 'TUAP'  || this.exp_typeN == 'TUAR'  ||
    this.exp_typeN == 'ZALE'  || this.exp_typeN == 'ZALL'  || this.exp_typeN == 'ZALP'  ||
    this.exp_typeN == 'ZCOE'  || this.exp_typeN == 'ZGND'  || this.exp_typeN == 'ZGNL'  || this.exp_typeN == 'ZGSD'  || this.exp_typeN == 'ZHET'  || this.exp_typeN == 'ZPRE'  || this.exp_typeN == 'ZPRL'  || this.exp_typeN == 'ZSCL'  || this.exp_typeN == 'ZTAE'  || this.exp_typeN == 'ZTAL'  || this.exp_typeN == 'ZTUN'  || this.exp_typeN == 'ZTUU' )
    {
      this.taxCodeN = 'E3';
    }
    else if(this.exp_typeN == 'FAK'  ||
    this.exp_typeN == 'UBPA'  || this.exp_typeN == 'VERP'  || this.exp_typeN == 'VORK'  || this.exp_typeN == 'VORS' )
    {
      this.taxCodeN = 'E0';
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
      user_mod:this.nickname,
      fec_mod:this.fechaActual,
      hora_mod:this.horaActual

    }

    this.Updategastos2 = 
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
      user_mod:this.nickname,
      fec_mod:this.fechaActual,
      hora_mod:this.horaActual,
      auth: 0
    }

    if(this.authGeneral == 0)
    {
      this.http.patch(this.url+'GENERAL/' + this.receiptno, this.Updategastos).subscribe(res => {
    this.update()
}) 
    }else if(this.authGeneral == 1)
    {
      Swal.fire({
        icon: 'error',
        title: 'Esta acción no puede ser procesada',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: 'purple'
      }).then(resul => {
        if(resul.isConfirmed)
        {
          location.reload()
        }
      })
    }else if(this.authGeneral == 2)
    {
      this.http.get<dataUserLog>(this.url+'USERS/' + this.nickname).subscribe(dataUserLog => {
        this.pernrUserLog = dataUserLog.pernr;
      })

      const titleA = 'Nuevo gasto actualizado';

      const subtitleA = 'Viaje: '+ this.reinr;

      const messageA = 'El usuario ' + this.nickname + ' con numero de empleado '+ this.pernrUserLog + ' ha actualizado un gasto que se encontraba como rechazado para una nueva aprobación dentro del viaje perteneciente al usuario '+ this.pernr;
    
      this.emailA={
        pernr: this.pernr,
        reinr: this.reinr,
        title: titleA,
        subtitle: subtitleA,
        message: messageA
      }

      this.http.post(this.url+'EmailA', this.emailA).subscribe(postSuccess => {
        if(postSuccess)
        {
           this.http.patch(this.url+'GENERAL/' + this.receiptno, this.Updategastos2).subscribe(res => {
           if(res)
           {
            let timerInterval = 0;

            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Informando al administrador el informe de tu cambio...',
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,

              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((response) => {
              if(response.dismiss === Swal.DismissReason.timer)
              {
                window.location.href='/otherUser/Gastos'
              }
            })
           }
       }) 

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
         location.reload()
       }
      })
     
     }

     editFile()
     {
       Swal.fire({
         icon: 'info',
         title: 'Editar archivo',
         text: 'Esta función solo sirve para modificar el archivo registrado, deseas continuar?',
         showCancelButton: true,
         showConfirmButton: true,
         confirmButtonColor: '#F25F29'
       }).then(res => {
         if(res.isConfirmed)
         {
           //console.log(this.receiptno, this.head, this.authCloseTrip)
           const data = {id: this.receiptno, head: this.idHead};
   
           this.sharedDataService.setData(data);
   
           localStorage.setItem('DataEditarDocumento-OtherUser', JSON.stringify(data))
   
           this.router.navigate(['/otherUser/Editar/Documento']);
         }
       })
     }

}
