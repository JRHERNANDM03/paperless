import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

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

@Component({
  selector: 'app-editar-gasto-director',
  templateUrl: './editar-gasto-director.component.html',
  styleUrls: ['./editar-gasto-director.component.css']
})
export class EditarGastoDirectorComponent implements OnInit{

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

authCloseTrip!: number;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate) {
        this.route.queryParams.subscribe(params => {
          this.authCloseTrip = params['authCloseTrip'];
          this.receiptno = params['id'];
          this.getData(this.receiptno);
          this.head = params['head'];
        })

        this.auth.user$.subscribe(info => {
          this.nickname = String(info?.nickname);
        })
      }
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
      this.router.navigate(["/Director/Mis-Gastos"], {queryParams: {id: this.head}})
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

    this.http.patch('http://localhost:3000/GENERAL/' + this.receiptno, this.Updategastos).subscribe(res => {
    this.update()
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
