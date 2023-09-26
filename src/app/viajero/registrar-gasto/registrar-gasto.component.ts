import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import { Storage, ref, uploadBytes} from '@angular/fire/storage';

import { ServiceService } from 'src/app/Service/service.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

interface data_PTRV_HEAD
{
  id: number;
  pernr: string;
  reinr: string;
  zland: string;
}

@Component({
  selector: 'app-registrar-gasto',
  templateUrl: './registrar-gasto.component.html',
  styleUrls: ['./registrar-gasto.component.css']
})
export class RegistrarGastoComponent implements OnInit {
archivoSeleccionado!: File;


id_head!: number;
pernrG!: string;
reinrG!: string;
zlandG!: string;



exp_type!: string;
locAmount!: number;
locCurr!: string;
date!: string;
taxCode!: string;
multipli!: number;
busPurpo!: string;
descript!: string;
documento!: string;
pdfN!: number;
xmlN!: number;

nickname!: string;

fechaActual!: string;
horaActual!: string;

selectedFile: File | undefined;

gastos:any =
{
  pernr:this.pernrG,
  reinr:this.reinrG,
  country:this.zlandG,
  region:'...',
  multipli:this.multipli,
  descript:this.descript,
  bus_purpo:this.busPurpo,
  bus_reason:'...',
  p_ctg:'...',
  p_prv:'...',
  p_doc:'...',
  exp_type:this.exp_type,
  rec_amount:this.locAmount,
  rec_curr:this.locCurr,
  rec_date:this.date,
  loc_amount:this.locAmount,
  loc_curr:this.locCurr,
  tax_code:this.taxCode,
  shorttxt:'...',
  uuid:this.documento,
  xml:'...',
  pdf:'...',
  comentario:'...',
  object_id:'...',
  user_crea:this.nickname,
  fec_crea:this.fechaActual,
  hora_crea:this.horaActual,
  user_mod:'...',
  fec_mod:'...',
  hora_mod:'...',
  auth:0
}

authCloseTrip!: number;

recivedData: any;

url: any;
  constructor (private router:Router, public auth: AuthService, private http: HttpClient, private route: ActivatedRoute, private sharedDataService: SharedDataService, private storage: Storage){}



  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
        const service = new ServiceService();
        this.url = service.url();
        
        /*this.route.queryParams.subscribe(params => {
          const id_head = params['id'];
          this.id_head = params['id'];
          this.authCloseTrip = params['authCloseTrip'];
          this.getData(id_head);
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          const id_head = this.recivedData.id;

          this.getData(id_head)

        }else{

          const localStorageData = localStorage.getItem('DataCrearGasto-Viajero');

          if(localStorageData)
          {
            const parsedData = JSON.parse(localStorageData);

            const id_head = parsedData.id;

            this.getData(id_head)
          }


        }

          this.auth.user$.subscribe(info => {
            this.nickname = String(info?.nickname);
          })

      }
    })
  }


  getData(id_head: number)
  {
    this.http.get<data_PTRV_HEAD>(this.url+'PTRV_HEADS/' + id_head).subscribe(data => {
      this.pernrG = data.pernr;
      this.reinrG = data.reinr;
      this.zlandG = data.zland;
    })
  }


  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }


success(){
 // this.router.navigate(["/ViajeroHome"])
 let timerInterval=0;
 Swal.fire({
  icon: 'success',
  title: 'Registro almacenado con exito',
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'Aceptar',
  confirmButtonColor: '#2A46D7', 
 }).then((result) => {
  if(result.isConfirmed)
  {
    this.router.navigate(["/Viajero/Gastos"])
  }
 })

}


formValid(): boolean {
  // Verificar si los campos requeridos están llenados
  if (
    
    this.locAmount &&
    this.locCurr && 
    this.date &&
    this.multipli &&
    this.busPurpo &&
    this.descript
    ) {
      return true; // Todos los campos están llenados
  } else {
    return false; // Al menos un campo requerido está vacío
  }
}


submitForm() {
  if (!this.selectedFile) {
    // console.error('Ningún archivo seleccionado.');
    // Puedes mostrar una notificación al usuario para informar que no se ha seleccionado ningún archivo.
    
    Swal.fire({
      icon: 'warning',
      title: 'Aviso!',
      text: 'No adjuntaste ningún documento, quieres continuar?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'CONTINUAR',
      cancelButtonText: 'CANCELAR',
      confirmButtonColor: '#F25F29'
    }).then(res => {
      if(res.isConfirmed)
      {
        
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

    // Validaciones para indicador de impuestos en base a el gasto seleccionado

    if(this.exp_type == 'ALID'  || this.exp_type == 'ALIE'  || this.exp_type == 'ALIL'  || this.exp_type == 'AVIP'  || this.exp_type == 'AVIR'  || 
    this.exp_type == 'CABE'  || this.exp_type == 'CABL'  || this.exp_type == 'CASE'  || this.exp_type == 'CASL'  || this.exp_type == 'CDEL'  || this.exp_type == 'ESTE'  || this.exp_type == 'ESTL'  || this.exp_type == 'EVEE'  || this.exp_type == 'EVEL'  || this.exp_type == 'EXPE'  || this.exp_type == 'EXPL'  ||
    this.exp_type == 'GASE'  || this.exp_type == 'GASL'  ||
    this.exp_type == 'HOTE'  || this.exp_type == 'HOTL'  ||
    this.exp_type == 'MEDE'  || this.exp_type == 'MEDL'  || this.exp_type == 'MUEE'  || this.exp_type == 'MUEL'  || this.exp_type == 'PAPE'  || this.exp_type == 'PAPL'  ||
    this.exp_type == 'RAUE'  || this.exp_type == 'RAUL'  ||
    this.exp_type == 'TELE'  || this.exp_type == 'TELL'  || this.exp_type == 'TINE'  || this.exp_type == 'TINL'  ||
    this.exp_type == 'ZAVN'  || this.exp_type == 'ZAVU'  )
    {
      this.taxCode = 'F2';
    }
    else if(this.exp_type == 'BUSE'  || this.exp_type == 'BUSL'  ||
    this.exp_type == 'GSCE'  || this.exp_type == 'GSCL'  ||
    this.exp_type == 'IHOE'  || this.exp_type == 'IHOL'  || this.exp_type == 'IMIE'  || this.exp_type == 'IMIL'  ||
    this.exp_type == 'PROE'  || this.exp_type == 'PROL'  ||
    this.exp_type == 'TACE'  || this.exp_type == 'TASE'  || this.exp_type == 'TASL'  ||
    this.exp_type == 'TUAP'  || this.exp_type == 'TUAR'  ||
    this.exp_type == 'ZALE'  || this.exp_type == 'ZALL'  || this.exp_type == 'ZALP'  ||
    this.exp_type == 'ZCOE'  || this.exp_type == 'ZGND'  || this.exp_type == 'ZGNL'  || this.exp_type == 'ZGSD'  || this.exp_type == 'ZHET'  || this.exp_type == 'ZPRE'  || this.exp_type == 'ZPRL'  || this.exp_type == 'ZSCL'  || this.exp_type == 'ZTAE'  || this.exp_type == 'ZTAL'  || this.exp_type == 'ZTUN'  || this.exp_type == 'ZTUU' )
    {
      this.taxCode = 'E3';
    }
    else if(this.exp_type == 'FAK'  ||
    this.exp_type == 'UBPA'  || this.exp_type == 'VERP'  || this.exp_type == 'VORK'  || this.exp_type == 'VORS' )
    {
      this.taxCode = 'E0';
    }

    this.gastos = {
      pernr: this.pernrG,
      reinr: this.reinrG,
      country: this.zlandG,
      region: '...',
      multipli: this.multipli,
      descript: this.descript,
      bus_purpo: this.busPurpo,
      bus_reason: '...',
      p_ctg: '...',
      p_prv: '...',
      p_doc: '...',
      exp_type: this.exp_type,
      rec_amount: this.locAmount,
      rec_curr: this.locCurr,
      rec_date: this.date,
      loc_amount: this.locAmount,
      loc_curr: this.locCurr,
      tax_code: this.taxCode,
      shorttxt: '...',
      uuid: '',
      xml: '',
      pdf: '',
      comentario: '',
      object_id: '',
      user_crea: this.nickname,
      fec_crea: this.fechaActual,
      hora_crea: this.horaActual,
      user_mod: '',
      fec_mod: '',
      hora_mod: '',
      auth: 0
    };

    //console.log(this.gastos)

    this.http.post(this.url+'GENERAL', this.gastos).subscribe(res => {
      this.success();
    });
  
      }
    })
    
    return;
  } 

  const numberRandom = this.generateRandom5DigitNumber();
  
  const file = this.selectedFile;
  const fileName = file.name;
  const fileNameComplete = fileName + numberRandom;
  const documentoRef = ref(this.storage, `files/${fileNameComplete}`);
  

  uploadBytes(documentoRef, file)
    .then(response => { 

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

      // Validaciones para indicador de impuestos en base a el gasto seleccionado

    if(this.exp_type == 'ALID'  || this.exp_type == 'ALIE'  || this.exp_type == 'ALIL'  || this.exp_type == 'AVIP'  || this.exp_type == 'AVIR'  || 
    this.exp_type == 'CABE'  || this.exp_type == 'CABL'  || this.exp_type == 'CASE'  || this.exp_type == 'CASL'  || this.exp_type == 'CDEL'  || this.exp_type == 'ESTE'  || this.exp_type == 'ESTL'  || this.exp_type == 'EVEE'  || this.exp_type == 'EVEL'  || this.exp_type == 'EXPE'  || this.exp_type == 'EXPL'  ||
    this.exp_type == 'GASE'  || this.exp_type == 'GASL'  ||
    this.exp_type == 'HOTE'  || this.exp_type == 'HOTL'  ||
    this.exp_type == 'MEDE'  || this.exp_type == 'MEDL'  || this.exp_type == 'MUEE'  || this.exp_type == 'MUEL'  || this.exp_type == 'PAPE'  || this.exp_type == 'PAPL'  ||
    this.exp_type == 'RAUE'  || this.exp_type == 'RAUL'  ||
    this.exp_type == 'TELE'  || this.exp_type == 'TELL'  || this.exp_type == 'TINE'  || this.exp_type == 'TINL'  ||
    this.exp_type == 'ZAVN'  || this.exp_type == 'ZAVU'  )
    {
      this.taxCode = 'F2';
    }
    else if(this.exp_type == 'BUSE'  || this.exp_type == 'BUSL'  ||
    this.exp_type == 'GSCE'  || this.exp_type == 'GSCL'  ||
    this.exp_type == 'IHOE'  || this.exp_type == 'IHOL'  || this.exp_type == 'IMIE'  || this.exp_type == 'IMIL'  ||
    this.exp_type == 'PROE'  || this.exp_type == 'PROL'  ||
    this.exp_type == 'TACE'  || this.exp_type == 'TASE'  || this.exp_type == 'TASL'  ||
    this.exp_type == 'TUAP'  || this.exp_type == 'TUAR'  ||
    this.exp_type == 'ZALE'  || this.exp_type == 'ZALL'  || this.exp_type == 'ZALP'  ||
    this.exp_type == 'ZCOE'  || this.exp_type == 'ZGND'  || this.exp_type == 'ZGNL'  || this.exp_type == 'ZGSD'  || this.exp_type == 'ZHET'  || this.exp_type == 'ZPRE'  || this.exp_type == 'ZPRL'  || this.exp_type == 'ZSCL'  || this.exp_type == 'ZTAE'  || this.exp_type == 'ZTAL'  || this.exp_type == 'ZTUN'  || this.exp_type == 'ZTUU' )
    {
      this.taxCode = 'E3';
    }
    else if(this.exp_type == 'FAK'  ||
    this.exp_type == 'UBPA'  || this.exp_type == 'VERP'  || this.exp_type == 'VORK'  || this.exp_type == 'VORS' )
    {
      this.taxCode = 'E0';
    }

      this.gastos = {
        pernr: this.pernrG,
        reinr: this.reinrG,
        country: this.zlandG,
        region: '...',
        multipli: this.multipli,
        descript: this.descript,
        bus_purpo: this.busPurpo,
        bus_reason: '...',
        p_ctg: '...',
        p_prv: '...',
        p_doc: '...',
        exp_type: this.exp_type,
        rec_amount: this.locAmount,
        rec_curr: this.locCurr,
        rec_date: this.date,
        loc_amount: this.locAmount,
        loc_curr: this.locCurr,
        tax_code: this.taxCode,
        shorttxt: '...',
        uuid: response.metadata.name,
        xml: '',
        pdf: '',
        comentario: '',
        object_id: response.metadata.name,
        user_crea: this.nickname,
        fec_crea: this.fechaActual,
        hora_crea: this.horaActual,
        user_mod: '',
        fec_mod: '',
        hora_mod: '',
        auth: 0
      };

      this.http.post(this.url+'GENERAL', this.gastos).subscribe(res => {
        this.success();
      });
    })
    .catch(error => {
      console.log(error);
      // Puedes mostrar una notificación al usuario para informar sobre el error en la carga del archivo.
    });
}


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadDocument($event: any)
{
  const file = $event.target.files[0];
  console.log(file);
  
  const documentoRef = ref(this.storage, `files/${file.name}`);
  
  uploadBytes(documentoRef, file)
  .then(response => console.log(response.metadata))
    .catch(error => console.log(error))
}

generateRandom5DigitNumber(): string {
  const min = 0;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Rellena con ceros a la izquierda para asegurarte de que tenga 5 dígitos
  const random5DigitNumber = randomNumber.toString().padStart(5, '0');

  return random5DigitNumber;
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
