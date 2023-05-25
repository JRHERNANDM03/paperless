import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-estado',
  templateUrl: './d-estado.component.html',
  styleUrls: ['./d-estado.component.css']
})
export class DEstadoComponent {

  styleDisplay = 'none';
  styleDisplay2 = 'none';
  styleDisplay3 = 'none';

  listarPendient()
  {
    var btnPendient = document.querySelector('.listarPendient');
      var titleList = document.querySelector('.titleList');
      var cardsP = document.querySelector('#cardsP');

    var htmlBtn = btnPendient?.textContent;
    console.log(htmlBtn);

    if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.styleDisplay='block';
    this.styleDisplay2='none';
    this.styleDisplay3='none';
  }

  listarAprovate()
  {
    var btnAprovate = document.querySelector('.listarAprovate');
      var titleList = document.querySelector('.titleList');

      var htmlBtn = btnAprovate?.textContent;
      console.log(htmlBtn);

      if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.styleDisplay2='block';
    this.styleDisplay='none';
    this.styleDisplay3='none';
  }

  listarDeclain()
  {
    var btnDeclain = document.querySelector('.listarDeclain');
      var titleList = document.querySelector('.titleList');

      var htmlBtn = btnDeclain?.textContent;
      console.log(htmlBtn);

      if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.styleDisplay3='block';
    this.styleDisplay='none';
    this.styleDisplay2='none';
  }

  aprobar()
  {
    let timerInterval=0;

    Swal.fire({
      title: '¿Aprobar Viaje?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'APROBAR',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: 'Rechazar',
      denyButtonColor: 'red'
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
            
          }
          })
      }else if(result.isDenied)
      {
        Swal.fire({
          icon: 'info',
          iconColor: 'red',
          title: 'Viaje rechazado',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: 'blue'
        })
      }
    })
  }

  change()
  {
    let timerInterval = 0;

    Swal.fire({
      icon: 'info',
      iconColor: 'orange',
      title: '¿Cambiar estado?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aprobar',
      confirmButtonColor: 'orange'
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire({
          icon: 'success',
          title: 'Viaje aprobado',
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
          willClose:() => {
            clearInterval(timerInterval)
          }
        }).then((res) => {
          if(res.dismiss === Swal.DismissReason.timer)
          {

          }
        })
      }
    })
  }
}
