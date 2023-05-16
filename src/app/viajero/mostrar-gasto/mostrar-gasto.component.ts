import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mostrar-gasto',
  templateUrl: './mostrar-gasto.component.html',
  styleUrls: ['./mostrar-gasto.component.css']
})
export class MostrarGastoComponent {

  constructor (private router:Router){}

  delete(){
   // this.router.navigate(["/ViajeroHome"])
   let timerInterval=0;
   Swal.fire({
    icon: 'info',
    title: '¿Estás seguro de eliminar el gasto seleccionado?',
    text: 'SE ELIMINARÁ POR COMPLETO',
    showConfirmButton: true,
    confirmButtonText: 'ELIMINAR',
    confirmButtonColor: '#E31212',
    showCancelButton: true,
    cancelButtonText: 'CANCELAR' ,
    cancelButtonColor: '123BE3'
   }).then((result) => {
    if(result.isConfirmed)
    {
      Swal.fire(
        {
          icon: 'success',
          title: 'Gasto eliminado con exito',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
        }
      ).then((result) => {
        this.router.navigate(["/Viajero/Gastos"])
      })
    }
   })
  
  }

}
