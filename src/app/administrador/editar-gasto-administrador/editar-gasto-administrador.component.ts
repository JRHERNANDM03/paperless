import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

interface dataGeneral
{
  receiptno: number;
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
  comentario: string;
}

interface zfi_gv_paper_general
{
  pernr: string;
  reinr: string;
}

@Component({
  selector: 'app-editar-gasto-administrador',
  templateUrl: './editar-gasto-administrador.component.html',
  styleUrls: ['./editar-gasto-administrador.component.css']
})
export class EditarGastoAdministradorComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  idReceiptno!: number;
  idHead!: number;
  authCloseTrip!: number;
  reinrHead!: string;


  head!: number;

  receiptno!: number;
  reinr!: string;
  exp_type!: string;
  loc_amount!: number;
  loc_curr!: string;
  multipli!: number;
  rec_date!: string;
  tax_code!: string;
  bus_purpo!: string;
  descript!: string;
  uuid!: string;
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

  receiptnoGeneral!: number;

  selectedFile: File | undefined;

  Updategastos: any = {}

  Updategastos2: any = {};

sendEmailA: any = {};

authExpense!: number;

  recivedData: any;

  url:any;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        const service = new ServiceService();
        this.url = service.url();

        /*this.route.queryParams.subscribe(params => {
          this.idReceiptno = params['id'];
          this.idHead = params['idhead'];
          this.reinrHead = params['reinr'];
          this.authCloseTrip = params['authCloseTrip'];
          this.getData(params['id']);
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {

          this.idReceiptno = this.recivedData.id;
          this.idHead = this.recivedData.idHead;
          this.reinrHead = this.recivedData.reinr;
          this.authCloseTrip = this.recivedData.authCloseTrip;
          this.authExpense = this.recivedData.authExpense;
          
          this.getData(this.recivedData.id)

        }else{
          const localStorageData = localStorage.getItem('DataEditarGasto-Administrador');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.idReceiptno = parsedData.id;
          this.idHead = parsedData.idHead;
          this.reinrHead = parsedData.reinr;
          this.authCloseTrip = parsedData.authCloseTrip;
          this.authExpense = parsedData.authExpense;
          
          this.getData(parsedData.id)        

        }}

        this.auth.user$.subscribe(infoUser => {
          this.nickname = String(infoUser?.nickname);
        })
      }
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
      this.comentario = data.comentario;

      this.exp_typeN = this.exp_type;
      this.locAmountN = this.loc_amount;
      this.locCurrN = this.loc_curr;
      this.dateN = this.rec_date;
      this.taxCodeN = this.tax_code;
      this.multipliN = this.multipli;
      this.busPurpoN = this.bus_purpo;
      this.descriptN = this.descript;

      this.receiptnoGeneral = data.receiptno;
    })
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
       this.router.navigate(["/Administrador/Mis-Gastos"])
     }
    })
   
   }

   update2()
  {

    //console.log(this.receiptno)

    this.http.get<zfi_gv_paper_general>(this.url+'GENERAL/' + this.receiptno).subscribe(data => {
      
      
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

      this.http.post(this.url+'EmailA', this.sendEmailA).subscribe(emailA => {
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
              window.location.href='/Administrador/Mis-Gastos'
            }
          })
        }
      })

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
      user_mod:this.nickname,
      fec_mod:this.fechaActual,
      hora_mod:this.horaActual,
      auth: 0

    }

  /*  this.http.patch('http://localhost:3000/GENERAL/' + this.idReceiptno, this.Updategastos).subscribe(res => {
    this.update()
}) */

if(this.authExpense == 0)
{

  this.http.patch(this.url+'GENERAL/' + this.receiptnoGeneral, this.Updategastos).subscribe(res => {
this.update()
  })

}else if(this.authExpense == 2)
{

  this.http.patch(this.url+'GENERAL/' + this.receiptnoGeneral, this.Updategastos2).subscribe(res => {
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
      window.location.href="/Administrador/Mis-Gastos"
    }
  })

}
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
        const data = {id: this.receiptnoGeneral, head: this.head, authCloseTrip: this.authCloseTrip};

        this.sharedDataService.setData(data);

        localStorage.setItem('DataEditarDocumento-Administrador', JSON.stringify(data))

        this.router.navigate(['/Administrador/Editar/Documento']);
      }
    })
  }

  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
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
