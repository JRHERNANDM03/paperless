import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor (private router:Router){}

alerta(){
 // this.router.navigate(["/ViajeroHome"])
 let timerInterval=0;
 Swal.fire({
  icon: 'success',
  title: 'Acceso correcto!',
  text: 'Bienvenid@',
  timer: 2000,
timerProgressBar: true,
showConfirmButton: false,

willClose: () => {
  clearInterval(timerInterval)
}
}).then((result) => {
/* Read more about handling dismissals below */
if (result.dismiss === Swal.DismissReason.timer) {
  this.router.navigate(["Viajero/Home"])

}
})

}

}
