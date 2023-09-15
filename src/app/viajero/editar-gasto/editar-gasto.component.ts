import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


interface dataGeneral
{
  pernr: string;
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
  auth: number;
}


@Component({
  selector: 'app-editar-gasto',
  templateUrl: './editar-gasto.component.html',
  styleUrls: ['./editar-gasto.component.css']
})
export class EditarGastoComponent implements OnInit {

  head!: number;

  pernr!: string;
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
  authExpense!: number;
  comentario: string = '';

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

UpdateGastos2: any = {}

sendEmailA: any = {}

authCloseTrip!: number;

recivedData: any;

  constructor (private router:Router, public auth: AuthService, private http: HttpClient, private route: ActivatedRoute, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
       /* this.route.queryParams.subscribe(params => {
          this.receiptno = params['id'];
          this.getData(this.receiptno);
          this.head = params['head'];
          this.authCloseTrip = params['authCloseTrip'];
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.receiptno = this.recivedData.id;
          this.getData(this.receiptno);
          this.head = this.recivedData.head;
          this.authCloseTrip = this.recivedData.authCloseTrip;
        }else{
          const localStorageData = localStorage.getItem('DataEditarGasto-Viajero');
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);

            this.receiptno = parsedData.id;
            this.getData(this.receiptno);
            this.head = parsedData.head;
            this.authCloseTrip = parsedData.authCloseTrip;
        }
      }


        this.auth.user$.subscribe(info => {
          this.nickname = String(info?.nickname);
        })
      }
    })
  }


  getData(receiptno: number)
  {
    this.http.get<dataGeneral>('http://localhost:3000/GENERAL/' + receiptno).subscribe(data => {

      this.pernr = data.pernr;
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

      this.authExpense = data.auth;
    })
  }

  update(){
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
      window.location.href='/Viajero/Gastos'
    }
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
    this.UpdateGastos2=
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
      auth:0
 
    }
    //Validar el status del gasto

   if(this.authExpense == 0)
   {
      /*Cuándo el status del gasto sea igual a 0 'PENDIENTE' se hace un update sencillo exclusivamente 
      para los campos seleccionados*/

      
       this.http.patch('http://localhost:3000/GENERAL/' + this.receiptno, this.Updategastos).subscribe(res => {
       this.update()
   })

    }else if(this.authExpense == 1)
    {
      /* Cuándo el status del gasto sea igual a 1 'ACEPTADO', la acción de actualizar no será permitida */

      Swal.fire({
        icon: 'error',
        title: 'Este gasto no puede ser editado',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: 'purple'
      }).then(result => {
        if(result.isConfirmed)
        {
          window.location.href='Viajero/Gastos'
        }
      })

    }else if(this.authExpense == 2)
    {
      /* Cuándo el status del gasto sea igual a 2 'RECHAZADO' 
      Actualizamos los campos correspondientes más un cambio en el status, lo igualaremos a 0 'PENDIENTE'
      para que el usuario Administrador lo pueda aprobar.
      
      Se envia un msj de notificacion al usuario Administrador para una nueva validacion
      */


      this.http.patch('http://localhost:3000/GENERAL/' + this.receiptno, this.UpdateGastos2).subscribe(res => {
       if(res)
       {
        const titleA = 'Nuevo gasto actualizado.';
        const subtitleA = 'Viaje: '+ this.reinr;
        const messageA = 'El usuario '+ this.nickname +' ha actualizado un gasto que se encontraba como rechazado para una nueva aprobación.';
      
        this.sendEmailA = {
        pernr: this.pernr,
        reinr: this.reinr,
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
            timer: 3500,
            timerProgressBar: true,

            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if(result.dismiss === Swal.DismissReason.timer)
            {
              window.location.href='/Viajero/Gastos'
            }
          })
        }
      })

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
        const data = {id: this.receiptno, head: this.head, authCloseTrip: this.authCloseTrip};

        this.sharedDataService.setData(data);

        localStorage.setItem('DataEditarDocumento-Viajero', JSON.stringify(data))

        this.router.navigate(['/Viajero/Editar/Documento']);
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
