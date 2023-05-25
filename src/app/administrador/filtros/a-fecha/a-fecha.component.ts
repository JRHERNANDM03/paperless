import { Component } from '@angular/core';

@Component({
  selector: 'app-a-fecha',
  templateUrl: './a-fecha.component.html',
  styleUrls: ['./a-fecha.component.css']
})
export class AFechaComponent {

  styleDisplay = 'none';

  listar()
  {
    this.styleDisplay='block';
  }
  

}
