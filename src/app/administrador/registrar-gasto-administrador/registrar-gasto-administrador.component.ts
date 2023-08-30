import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

interface data_PTRV_HEAD
{
  id: number;
  pernr: string;
  reinr: string;
  zland: string;
}

@Component({
  selector: 'app-registrar-gasto-administrador',
  templateUrl: './registrar-gasto-administrador.component.html',
  styleUrls: ['./registrar-gasto-administrador.component.css']
})
export class RegistrarGastoAdministradorComponent implements OnInit{

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

idHead!: number;
reinrHead!: string;
authCloseTripHead!: number;

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

gastos: any = {}

recivedData: any;

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.auth.logout()
    }else if(isAuthenticate){
     /* this.route.queryParams.subscribe(params => {
        this.idHead = params['id'];
        this.reinrHead = params['reinr'];
        this.authCloseTripHead = params['authCloseTrip'];
        this.getData(params['id'])
      })*/

      this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {

          this.idHead = this.recivedData.id;
          this.reinrHead = this.recivedData.reinr;
          this.authCloseTripHead = this.recivedData.authCloseTrip;
          this.getData(this.recivedData.id)

        }else{
          const localStorageData = localStorage.getItem('DataCrearGasto-Administrador');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        
        this.idHead = parsedData.id;
          this.reinrHead = parsedData.reinr;
          this.authCloseTripHead = parsedData.authCloseTrip;
          this.getData(parsedData.id)          

        }}

      this.auth.user$.subscribe(dataUser => {
        this.nickname = String(dataUser?.nickname)
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

success()
{
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
      this.router.navigate(['/Administrador/Mis-Gastos'])
    }
  })
}

onArchivoSeleccionado(event: any) {
  this.archivoSeleccionado = event.target.files[0];
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
//console.log('------------------------------------------------')
//console.log(this.gastos)
this.http.post('http://localhost:3000/GENERAL', this.gastos).subscribe(res => {
this.success()
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
