import { Component } from '@angular/core';

@Component({
  selector: 'app-other-numero-viaje',
  templateUrl: './other-numero-viaje.component.html',
  styleUrls: ['./other-numero-viaje.component.css']
})
export class OtherNumeroViajeComponent {

  styleDisplay = 'none';

  listar()
  {
    this.styleDisplay='block';
  }

  

}
