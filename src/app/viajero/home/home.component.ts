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

interface emailsV{
  id: number;
  message: string;
  pernr: number;
  reinr: number;
  visibility: number;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  @ViewChild('inicio', { static: true }) inicioElement?: ElementRef;

  updateEmailV: any = {}
  selectedEmailIndex: number = -1;
  backgroundColor: string = 'rgba(0, 0, 0, 0.477)';

  emailsAmount: number = 0;

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
  
}

responseArray: PTRV_HEAD[] = [];
 
  authorized!: number[];

getData(nickname: String)
{
  this.http.get<UserData>('http://localhost:3000/USERS/' + nickname).subscribe(data => {

  const pernr_user = Number(data.PERNR);
  this.getEmailsV(pernr_user)

    this.http.get<PTRV_HEAD[]>('http://localhost:3000/PTRV_HEADS/find/' + data.PERNR).subscribe(info_PTRV_HEAD => {
      this.responseArray = info_PTRV_HEAD;
      this.authorized = info_PTRV_HEAD.map(item => item.auth); // Almacenar todos los valores de auth en authorized
      //console.log(info_PTRV_HEAD.map(item => item.auth))
  })
  });

}

responseArrayEmails: emailsV[] = [];
 
  visibility_auth!: number[];

getEmailsV(pernr: number)
{
  this.http.get<emailsV[]>('http://localhost:3000/EmailsV/' + pernr).subscribe(data => {
    
    this.responseArrayEmails = data;
    this.visibility_auth = data.map(item => Number(item.visibility))

    let x = 0;

    for(x=0; x<data.length; x++ )
    {
      if(this.responseArrayEmails[x].visibility == 0)
      {
        this.emailsAmount = this.emailsAmount + 1;
      }
    }
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



  
  getEmailsVRequest(idEmailV: number, message: string, reinr: number, visibility: number)
  {

    this.http.get<PTRV_HEAD>('http://localhost:3000/PTRV_HEAD/' + reinr).subscribe(trip => {
  const idHead = trip.id;

    Swal.fire({
      text: message,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Ver viaje',
      showCancelButton: true,
      cancelButtonText: 'OK',
      cancelButtonColor: 'oragne'
    }).then((result) => {
      if(result.isConfirmed)
      {

        this.updateEmailV = {
          visibility: 1
        }
        this.http.patch('http://localhost:3000/EmailV/update/' + idEmailV, this.updateEmailV).subscribe(upd => {
          if(upd)
          {
            this.router.navigate(['/Viajero/Viaje'], {queryParams: {id: idHead}})
          }
        })

      }else if(result.isDismissed)
      {

        if(visibility != 1)
        {
          this.updateEmailV = {
            visibility: 1
          }
          this.http.patch('http://localhost:3000/EmailV/update/' + idEmailV, this.updateEmailV).subscribe(upd => {
            if(upd)
            {
              location.reload()
            }
          })
        }
       
      }
    })
 

})

  }

  getVisibility(visibility: number): number {
    if (visibility === 0) {
      return 0;
    } else if (visibility === 1) { 
      return 1;
    } else {
      return -1; // O cualquier otro valor numérico que desees asignar para representar el estado desconocido
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