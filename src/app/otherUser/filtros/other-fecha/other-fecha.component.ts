import { Component } from '@angular/core';

@Component({
  selector: 'app-other-fecha',
  templateUrl: './other-fecha.component.html',
  styleUrls: ['./other-fecha.component.css']
})
export class OtherFechaComponent {

  styleDisplay = 'none';

  listar()
  {
    this.styleDisplay='block';
  }

}
