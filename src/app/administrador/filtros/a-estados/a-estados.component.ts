import { Component } from '@angular/core';

@Component({
  selector: 'app-a-estados',
  templateUrl: './a-estados.component.html',
  styleUrls: ['./a-estados.component.css']
})
export class AEstadosComponent {

  styleDisplay = 'none';
  styleDisplay2 = 'none';
  styleDisplay3 = 'none';

listarPendient()
{
  this.styleDisplay = 'block';
  this.styleDisplay2 = 'none';
  this.styleDisplay3 = 'none';
}
listarAprovate()
{
  this.styleDisplay2 = 'block';
  this.styleDisplay = 'none';
  this.styleDisplay3 = 'none';
}
listarDeclain()
{
  this.styleDisplay3 = 'block';
  this.styleDisplay = 'none';
  this.styleDisplay2 = 'none';
}


}
