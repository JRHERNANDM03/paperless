import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import { Storage, ref, uploadBytes } from '@angular/fire/storage';

interface user
{
  name: string;
  lastname: string;
  nickname: string;
}

interface trip
{
  reinr: string;
  zland: string;
}

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-gasto-other-user',
  templateUrl: './registrar-gasto-other-user.component.html',
  styleUrls: ['./registrar-gasto-other-user.component.css']
})
export class RegistrarGastoOtherUserComponent implements OnInit {

archivoSeleccionado!: File;

nicknameG!: string;

id!: number;
pernr!: number;

name!: string;
lastname!: string;
nickname!: string;

reinr!: string;
zland!: string;

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

fechaActual!: string;
horaActual!: string;

selectedFile: File | undefined;

gastos:any =
{
  pernr:this.pernr,
  reinr:this.reinr,
  country:this.zland,
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
  user_crea:this.nicknameG,
  fec_crea:this.fechaActual,
  hora_crea:this.horaActual,
  user_mod:'...',
  fec_mod:'...',
  hora_mod:'...',
  auth:0
}

recivedData: any;

  constructor (private storage: Storage, private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        
        
        /*this.route.queryParams.subscribe(params => {
          this.id = params['id'];
          this.pernr = params['pernr']
          this.getInfoUser(this.pernr)
          this.getTrip(this.id)

          this.auth.user$.subscribe(info => {
            this.nicknameG = String(info?.nickname);
          })
        })*/

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.id = this.recivedData.id;
          this.pernr = this.recivedData.pernr;

          this.getInfoUser(this.pernr)
          this.getTrip(this.id)

          this.auth.user$.subscribe(info => {
            this.nicknameG = String(info?.nickname)
          })

        }else{
          const localStorageData = localStorage.getItem('DataCrearGasto-otherUser');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.id = parsedData.id;
          this.pernr = parsedData.pernr;

          this.getInfoUser(this.pernr)
          this.getTrip(this.id)

          this.auth.user$.subscribe(info => {
            this.nicknameG = String(info?.nickname)
          })
        
        }}

      }
    })
  }

getInfoUser(pernr: number)
{
  this.http.get<user>('http://localhost:3000/User/' + pernr).subscribe(data => {
    this.name = data['name'];
    this.lastname = data['lastname'];
    this.nickname = data['nickname'];
  })
}

getTrip(id: number)
{
  this.http.get<trip>('http://localhost:3000/PTRV_HEADS/' + id).subscribe(data => {
    this.reinr = data.reinr;
    this.zland = data.zland;
  })
}


onArchivoSeleccionado(event: any) {
  this.archivoSeleccionado = event.target.files[0];
}


  success(){
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
      this.router.navigate(["/otherUser/Gastos"])
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
        pernr: this.pernr,
        reinr: this.reinr,
        country: this.zland,
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
  
      this.http.post('http://localhost:3000/GENERAL', this.gastos).subscribe(res => {
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
          pernr: this.pernr,
          reinr: this.reinr,
          country: this.zland,
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
  
        this.http.post('http://localhost:3000/GENERAL', this.gastos).subscribe(res => {
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
  

  generateRandom5DigitNumber(): string {
    const min = 0;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Rellena con ceros a la izquierda para asegurarte de que tenga 5 dígitos
    const random5DigitNumber = randomNumber.toString().padStart(5, '0');
  
    return random5DigitNumber;
  }

}
