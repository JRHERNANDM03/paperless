import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-gasto-administrador',
  templateUrl: './registrar-gasto-administrador.component.html',
  styleUrls: ['./registrar-gasto-administrador.component.css']
})
export class RegistrarGastoAdministradorComponent {

  constructor(private router:Router){}

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
}
