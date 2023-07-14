import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

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
  constructor (private router:Router, public auth: AuthService, private http: HttpClient, private route: ActivatedRoute){}



  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {
        this.route.queryParams.subscribe(params => {
          const id_head = params['id'];
          this.id_head = params['id'];
          this.getData(id_head);

          this.auth.user$.subscribe(info => {
            this.nickname = String(info?.nickname);
          })
        })
      }
    })
  }


  getData(id_head: number)
  {
    this.http.get<data_PTRV_HEAD>('http://localhost:3000/PTRV_HEADS/' + id_head).subscribe(data => {
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
    this.router.navigate(["/Viajero/Gastos"], {queryParams: {id:this.id_head}})
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

  // Mostrar los datos en la consola
/*
  console.log('EXP_TYPE:', this.exp_type);
  console.log('Importe:', this.locAmount);
  console.log('Moneda:', this.locCurr);
  console.log('Fecha de gasto:', this.date);
  console.log('Indicador de impuestos:', this.taxCode);
  console.log('Cantidad:', this.multipli);
  console.log('Info:', this.busPurpo);
  console.log('Descripción:', this.descript);
  console.log('Justificación:', this.documento);
  console.log('NickName', this.nickname);
  console.log('Fecha actual', this.fechaActual);
  console.log('Hora Actual', this.horaActual);
*/

  this.gastos =
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

this.http.post('http://localhost:3000/GENERAL', this.gastos).subscribe(res => {
this.success()
}) 
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

}
