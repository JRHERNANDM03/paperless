import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

interface dataUser
{
  PERNR: number;
}

interface ptrv_headP
{
  id: number;
  pernr: string;
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

interface ptrv_headA
{
  id: number;
  pernr: string;
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

interface ptrv_headR
{
  id: number;
  pernr: string;
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
  selector: 'app-a-estados',
  templateUrl: './a-estados.component.html',
  styleUrls: ['./a-estados.component.css']
})
export class AEstadosComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient){}

styleDisplay1 = 'none';
styleDisplay2 = 'none';
styleDisplay3 = 'none';

userNickname!: string;
pernrUser!: number;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.auth.user$.subscribe(user => {
          this.userNickname = String(user?.nickname)
         this.getData(this.userNickname)
        })
      }
    })
  }


  getData(userNickname: string)
  {
    this.http.get<dataUser>('http://localhost:3000/USERS/' + userNickname).subscribe(data => {
      this.pernrUser = data.PERNR;
    })
  }

  responseArray1: ptrv_headP[] = [];
  responseArray2: ptrv_headA[] = [];
  responseArray3: ptrv_headR[] = [];

  authorized!: number[];

  getTRIPP()
  {
    this.http.get<ptrv_headP[]>('http://localhost:3000/PTRV_HEADS/filter/authP/' + this.pernrUser).subscribe(pendientes => {
      this.responseArray1 = pendientes;
      this.authorized = pendientes.map(item => item.auth);
    })
    this.btnPendiente()
  }

  getTRIPA()
  {
    this.http.get<ptrv_headA[]>('http://localhost:3000/PTRV_HEADS/filter/authA/' + this.pernrUser).subscribe(autorizados => {
      this.responseArray2 = autorizados;
      this.authorized = autorizados.map(item => item.auth);
    })
    this.btnAprovado()
  }

  getTRIPR()
  {
    this.http.get<ptrv_headR[]>('http://localhost:3000/PTRV_HEADS/filter/authR/' + this.pernrUser).subscribe(rechazados => {
      this.responseArray3 = rechazados;
      this.authorized = rechazados.map(item => item.auth);
    })
    this.btnRechazado()
  }

  btnPendiente()
  {

    var text = document.querySelector('.pendiente');
    var title = document.querySelector('.title');
    

    var htmlBtn = text?.textContent;

    console.log(htmlBtn );

    if(title && htmlBtn)
    {
      title.textContent=htmlBtn;
    }

    this.styleDisplay1 = 'block';
    this.styleDisplay2 = 'none';
    this.styleDisplay3 = 'none';
  }

  btnAprovado()
  {

    var text = document.querySelector('.aprovado');
    var title = document.querySelector('.title');

    var htmlBtn = text?.textContent;

    if(title && htmlBtn)
    {
      title.textContent=htmlBtn;
    }

    this.styleDisplay1 = 'none';
    this.styleDisplay2 = 'block';
    this.styleDisplay3 = 'none';
  }

  btnRechazado()
  {

    var text = document.querySelector('.rechazado');
    var title = document.querySelector('.title');

    var htmlBtn = text?.textContent;

    if(title && htmlBtn)
    {
      title.textContent=htmlBtn;
    }

    this.styleDisplay1 = 'none';
    this.styleDisplay2 = 'none';
    this.styleDisplay3 = 'block';
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
        this.router.navigate(['/Director/Detalle/Viaje'], {queryParams: {id: id} });
      }

}
