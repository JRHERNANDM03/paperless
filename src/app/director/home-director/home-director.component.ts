import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-director',
  templateUrl: './home-director.component.html',
  styleUrls: ['./home-director.component.css']
})
export class HomeDirectorComponent {

  constructor(private router:Router){}

  email()
  {
    const div1 = document.getElementById('div1');

    const title = document.querySelector('.title')?.textContent;
    const text = document.querySelector('.text')?.textContent;
    const detail = document.querySelector('.detail')?.textContent;

    const titleText = String(title);
    const textText = String(text);
    const detailText = String(detail);

    let timerInterval=0;

    Swal.fire({
      title: titleText,
      text: (textText && detailText),
      showConfirmButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'APROBAR',
      showDenyButton: true,
      denyButtonColor: 'blue',
      denyButtonText: 'Detalles',
      showCancelButton: false
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Viaje aprobado',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,

          willClose: () => {
            clearInterval(timerInterval)
          }
          }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            if(div1)
            {
            div1.style.backgroundColor='rgba(0, 0, 0, 0.192)';
            }
          }
          })
      }else if(result.isDenied)
      {
        this.router.navigate(["/Director/Viaje"])
      }
    })

  }

}
      
