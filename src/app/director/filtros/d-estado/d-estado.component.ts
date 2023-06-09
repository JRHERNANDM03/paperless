import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-estado',
  templateUrl: './d-estado.component.html',
  styleUrls: ['./d-estado.component.css']
})
export class DEstadoComponent implements OnInit{

  constructor(public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){}
    })
  }

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

  errLog()
  {
    Swal.fire({
      icon: 'info',
      iconColor: 'orange',
      title: 'Cuenta no logeada',
      text: 'No hay registros de inicio de sesión',
      footer: 'Esta función permite la protección de rutas, podrá navegar en este módulo sin iniciar sesión durante el periodo de pruebas.',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'orange',
      position: 'bottom-end',
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }

  logout()
  {
    Swal.fire({
      title: 'Estás seguro de cerrar sesión',
      showConfirmButton: true,
      confirmButtonText: 'Cerrar Sesión',
      confirmButtonColor: 'purple',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'orange',
      showDenyButton: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if(result.isConfirmed)
      {
          this.auth.logout()
      }
    })
  }
}
