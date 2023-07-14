import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

interface UserData {
  PERNR: string;
  // Otros campos que esperas en los datos de respuesta
}

interface PTRV_HEAD{
  id: number;
  pernr: string
  reinr: string;
  schem: string;
  zort1: string;
  zland: string;
  hrgrio: string;
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  @ViewChild('inicio', { static: true }) inicioElement?: ElementRef;

  constructor(private router: Router, public auth: AuthService, private http: HttpClient) {
}

ngOnInit(): void {

   this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.router.navigate(['login'])
    }
    else if(isAuthenticate)
    {
      this.auth.user$.subscribe(user => {
        const nickname = String(user?.nickname);
        this.getData(nickname);     
      })
    }
  });

  const userName = document.getElementById('userName');
  const userNameString = userName?.textContent;
  console.log(userNameString);
  
}

responseArray: PTRV_HEAD[] = [];
 
  authorized!: number[];

getData(nickname: String)
{
  this.http.get<UserData>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
    this.http.get<PTRV_HEAD[]>('http://localhost:3000/PTRV_HEADS/find/' + data.PERNR).subscribe(info_PTRV_HEAD => {
      this.responseArray = info_PTRV_HEAD;
      this.authorized = info_PTRV_HEAD.map(item => item.auth); // Almacenar todos los valores de auth en authorized
      //console.log(info_PTRV_HEAD.map(item => item.auth))
  })
  });

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



  getEmail()
  {
    const textEmail = document.querySelector('.textEmail')?.textContent;
    const titlestring = String(textEmail);

    const textDetail = document.querySelector('.textDetail')?.textContent;
    const textstring = String(textDetail);

    

   
    Swal.fire({
      title: titlestring,
      text: textstring,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    })
  
  }

  getEmailRequest2()
  {
    const divChange2 = document.getElementById('divChange2');

    const textEmail2 = document.querySelector('.textEmail2')?.textContent;
    const titlestring2 = String(textEmail2);

    const textDetail2 = document.querySelector('.textDetail2')?.textContent;
    const textstring2 = String(textDetail2);

    if(divChange2)
    {

    Swal.fire({
      title: titlestring2,
      text: textstring2,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    }).then((result) => {
      if(result.isConfirmed)
      {
        divChange2.style.backgroundColor='rgba(0, 0, 0, 0.192)';
      }
    })
  }else
  {
    console.log("ERR");
  }

  }


  getEmailRequest3()
  {
    const divChange3 = document.getElementById('divChange3');

    const textEmail3 = document.querySelector('.textEmail3')?.textContent;
    const titlestring3 = String(textEmail3);

    const textDetail3 = document.querySelector('.textDetail3')?.textContent;
    const textstring3 = String(textDetail3);

    if(divChange3)
    {

    Swal.fire({
      title: titlestring3,
      text: textstring3,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    }).then((result) => {
      if(result.isConfirmed)
      {
        divChange3.style.backgroundColor='rgba(0, 0, 0, 0.192)';
      }
    })
  }else
  {
    console.log("ERR");
  }
  }

  getEmailRequest4()
  {
    const divChange4 = document.getElementById('divChange4');

    const textEmail4 = document.querySelector('.textEmail4')?.textContent;
    const titlestring4 = String(textEmail4);

    const textDetail4 = document.querySelector('.textDetail4')?.textContent;
    const textstring4 = String(textDetail4);

    if(divChange4)
    {

    Swal.fire({
      title: titlestring4,
      text: textstring4,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    }).then((result) => {
      if(result.isConfirmed)
      {
        divChange4.style.backgroundColor='rgba(0, 0, 0, 0.192)';
      }
    })
  }else
  {
    console.log("ERR");
  }
  }


 user() 
{ 
  this.router.navigate(['/Viajero/CambiarUsuaro']);
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
  this.router.navigate(['/Viajero/Viaje'], {queryParams: {id: id} });
}



}