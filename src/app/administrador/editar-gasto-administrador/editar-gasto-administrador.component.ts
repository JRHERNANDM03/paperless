import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-gasto-administrador',
  templateUrl: './editar-gasto-administrador.component.html',
  styleUrls: ['./editar-gasto-administrador.component.css']
})
export class EditarGastoAdministradorComponent {

  constructor(private router:Router){}

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
}
