import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

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

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.id = params['id'];
          this.pernr = params['pernr']
          this.getInfoUser(this.pernr)
          this.getTrip(this.id)

          this.auth.user$.subscribe(info => {
            this.nicknameG = String(info?.nickname);
          })
        })
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
      this.router.navigate(["/otherUser/Gastos"], {queryParams: {id:this.id, pernr: this.pernr}})
    }
   })
  
  }


  formValid(): boolean {
    // Verificar si los campos requeridos están llenados
    if (
      
      this.locAmount &&
      this.locCurr && 
      this.date &&
      this.taxCode &&
      this.multipli &&
      this.busPurpo &&
      this.descript &&
      this.documento
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
      this.documento = (this.selectedFile.name)
    } else if (this.selectedFile && this.selectedFile.name.endsWith('.xml')) {
      this.pdfN = 0;
      this.xmlN = 1;
      this.documento = (this.selectedFile.name)
    } else {
      console.log('No se seleccionó ningún archivo o el archivo no tiene una extensión permitida.');
      // Realizar acciones para otros tipos de archivo o cuando no se selecciona ningún archivo
    }
  
    this.gastos =
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
  
  this.http.post('http://localhost:3000/GENERAL', this.gastos).subscribe(res => {
  this.success()
  }) 
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  

}
