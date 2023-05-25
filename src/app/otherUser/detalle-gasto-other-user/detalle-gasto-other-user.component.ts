import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-gasto-other-user',
  templateUrl: './detalle-gasto-other-user.component.html',
  styleUrls: ['./detalle-gasto-other-user.component.css']
})
export class DetalleGastoOtherUserComponent {

  constructor (private router:Router){}

  viewFile()
  {
    this.router.navigate(['/showFile'])
  }

}
