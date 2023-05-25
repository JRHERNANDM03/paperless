import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-a-numero-viaje',
  templateUrl: './a-numero-viaje.component.html',
  styleUrls: ['./a-numero-viaje.component.css']
})
export class ANumeroViajeComponent {

  constructor(private router:Router){}

  styleDisplay = 'none';

  listar()
  {
    this.styleDisplay='block';
  }

}
