import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-change-user',
  templateUrl: './home-change-user.component.html',
  styleUrls: ['./home-change-user.component.css']
})
export class HomeChangeUserComponent implements OnInit {

  constructor (private router:Router){}

  ngOnInit(): void {
    this.main();
  }

  main()
  {
    (async() => {
       await  Swal.fire({
        title: 'Cambio de usuario',
        
        html: '<form method="" action="/otherUser/Home">'+
        '<div class="form-floating mb-3 card border-dark">'+
        '<input type="text" class="form-control text-center" id="floatingInput" placeholder="name@example.com" required>'+
        '<label for="floatingInput">Número de empleado</label>'+
      '</div>'+
        '<br>'+
        ''+
        '<input type="submit" class="btn btn-outline-primary btn-lg" value="CAMBIAR">'+
        '</form> '+
        '<hr>'+
        '<a href="/Viajero/Home" class="btn btn-secondary">REGRESAR</a>',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,

      })
        
    })()
  }

}
