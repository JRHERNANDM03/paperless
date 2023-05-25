import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-change-user',
  templateUrl: './home-change-user.component.html',
  styleUrls: ['./home-change-user.component.css']
})
export class HomeChangeUserComponent implements AfterViewInit {

  constructor (private router:Router){}

  ngAfterViewInit(): void {
    this.main();
  }

  main()
  {
    (async() => {
       await  Swal.fire({
        title: 'Cambio de usuario',
        input: 'number',
        inputLabel: 'Número de empleado',
        inputPlaceholder: 'Ingresa el numero de empleado',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'CAMBIAR',
        confirmButtonColor: '#73246D',
        denyButtonText: 'REGRESAR',
        denyButtonColor: '#e86513'
      }).then((result) => {
        if(result.isConfirmed)
        {
          this.router.navigate(['/otherUser/Home']);
        }else if(result.isDenied)
        {
          this.router.navigate(['/Viajero/Home']);
        }
      })
        
    })()
  }

}
