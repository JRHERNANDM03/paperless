import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface user
{
  PERNR: number;
}

interface PTRV_HEAD{
  id: number;
  pernr: string
  reinr: string;
  schem: string;
  zort1: string;
  zland: string;
  hrgio: string;
  kunde: string;
  datv1: string;
  uhrv1: string;
  datb1: string;
  uhrb1: string;
  date: string;
  times: string;
  uname: string;
  auth: number;
}

interface search{
  id: number;
  pernr: string
  reinr: string;
  schem: string;
  zort1: string;
  zland: string;
  hrgio: string;
  kunde: string;
  datv1: string;
  uhrv1: string;
  datb1: string;
  uhrb1: string;
  date: string;
  times: string;
  uname: string;
  auth: number;
}


@Component({
  selector: 'app-home-director',
  templateUrl: './home-director.component.html',
  styleUrls: ['./home-director.component.css']
})
export class HomeDirectorComponent implements OnInit {
 
  
nickname!: string;
pernr!: number;

todosMisViajes = 'block';

findTrip = 'none'

date!: string;

  constructor(private router:Router, public auth: AuthService, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){
        this.auth.user$.subscribe(user => {
          this.nickname = String(user?.nickname);
          this.getPernr(this.nickname)
        })
      }
    })
  }

  getPernr(nickname: string)
  {
    this.http.get<user>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
      this.pernr = data.PERNR;
      this.getHead(this.pernr)
    })
  }

  responseArray: PTRV_HEAD[] = [];
 
  authorized!: number[];

  getHead(pernr: number)
  {
    this.http.get<PTRV_HEAD[]>('http://localhost:3000/PTRV_HEADS/find/' + pernr).subscribe(data => {
      this.responseArray = data;
      this.authorized = data.map(item => item.auth);
    })
  }


  getEstado(auth: number): string {
    if (auth === 0) {
      return 'Pendiente';
    } else if (auth === 1) { 
      return 'Aprobado';
    } else if (auth === 2) {
      return 'Rechazado';
    } else {
      return 'Desconocido';
    }
  }

  formValid(): boolean {
    // Verificar si los campos requeridos están llenados
    if (
      
      this.date
    ) {
      return true; // Todos los campos están llenados
    } else {
      return false; // Al menos un campo requerido está vacío
    }
  }

  responseArray2: search[] = [];
 
  authorized2!: number[];

  submitForm()
  {
    const newPernr = String(this.pernr);

    this.http.get<search[]>('http://localhost:3000/PTRV_HEAD/find/datv1/' + this.date + '/pernr/' + newPernr).subscribe(data => {
      this.todosMisViajes = 'none';
      this.findTrip = 'block';
      this.responseArray2 = data;
      this.authorized2 = data.map(item2 => item2.auth);
    })
  }

  getEstado2(auth: number): string {
    if (auth === 0) {
      return 'Pendiente';
    } else if (auth === 1) { 
      return 'Aprobado';
    } else if (auth === 2) {
      return 'Rechazado';
    } else {
      return 'Desconocido';
    }
  }

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


  tripDetail(id: number)
{
  this.router.navigate(['/Director/Mi-Viaje'], {queryParams: {id: id} });
}

}
      
