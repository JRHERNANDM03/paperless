import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

import { SharedDataService } from 'src/app/shared-data.service';

import {ServiceService} from '../../Service/service.service'

interface UserData {
  PERNR: string;
  rol_id: number;
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

  pernr!: string;

  notifyDisplay = 'block'

  url: any;

  isLoading = true; 

  constructor(private router: Router, public auth: AuthService, private http: HttpClient, private sharedDataService: SharedDataService) {
}

ngOnInit(): void {

   this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    
    if(!isAuthenticate)
    {
      this.router.navigate(['login'])
    }
    else if(isAuthenticate)
    {
      const service = new ServiceService();
      this.url = service.url();
      
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
{ this.isLoading = false;
  this.http.get<UserData>(this.url+'USERS/' + nickname).subscribe(data => {

    if(data.rol_id != 1)
    {
      window.location.href='/access_error';
    }

  this.pernr = data.PERNR;

  const pernr_user = Number(data.PERNR);
  this.getEmailsV(pernr_user)

    this.http.get<PTRV_HEAD[]>(this.url+'PTRV_HEADS/find/' + data.PERNR).subscribe(info_PTRV_HEAD => {
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
  this.http.get<emailsV[]>(this.url+'EmailsV/' + pernr).subscribe(data => {
    
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

    this.http.get<PTRV_HEAD>(this.url+'PTRV_HEAD/' + reinr).subscribe(trip => {
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
        this.http.patch(this.url+'EmailV/update/' + idEmailV, this.updateEmailV).subscribe(upd => {
          if(upd)
          {
            //this.router.navigate(['/Viajero/Viaje'], {queryParams: {id: idHead}})
            
            const data = {id: idHead};
            
            this.sharedDataService.setData(data);
            
            localStorage.setItem('DataHome-Viajero', JSON.stringify(data)); // Guardar en localStorage
            
            // Navegar a la otra vista después de establecer los datos
            
            window.location.href="/Viajero/Viaje"

          }
        })

      }else if(result.isDismissed)
      {

        if(visibility != 1)
        {
          this.updateEmailV = {
            visibility: 1
          }
          this.http.patch(this.url+'EmailV/update/' + idEmailV, this.updateEmailV).subscribe(upd => {
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
      this.notifyDisplay = 'none'
      return 0;
    } else if (visibility === 1) {
      this.notifyDisplay = 'block' 
      return 1;
    } else {
      return -1; // O cualquier otro valor numérico que desees asignar para representar el estado desconocido
    }
  }
  


 user() 
{ 
  //this.router.navigate(['/Viajero/CambiarUsuaro']);
  window.location.href="/Viajero/CambiarUsuaro"
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

sendData(id: number)
{
   const data = {id: id};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHome-Viajero', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    this.router.navigate(['/Viajero/Viaje']);
}


deleteNotify(id: number, $event: any)
{
  $event.stopPropagation()
  
  try{

    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de querer eliminar esta notificación?',
      text: 'Se eliminará permanentemente',
      showCancelButton: true,
      cancelButtonColor: 'grey',
      showConfirmButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if(result.isConfirmed)
      {
        this.http.delete(this.url+'EmailV/delete/' + id).subscribe(data => {
          if(data)
          {
            Swal.fire({
              icon: 'success',
              title: 'Notificación eliminada con éxito',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'OK',
              confirmButtonColor: 'blue'
            }).then(res => {
              if(res.isConfirmed)
              {
                location.reload()
              }
            })
          }
        })
      }
    })

  }catch(error)
  {
    console.error(error)
  }
}

deleteAllNotify()
{

  Swal.fire({
    icon: 'warning',
    title: '¿Estás seguro de querer eliminar todas las notificaciones que ya fueron vistas?',
    text: 'Se eliminaran por completo',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: 'red',
    confirmButtonText: 'Eliminar'
  }).then(result => {

    if(result.isConfirmed){

    this.http.get<emailsV[]>(this.url+'EmailsV/' + this.pernr).subscribe(data => {

    if(data.length == 0)
    {
      Swal.fire({
        icon: 'info',
        title: 'No hay registro que eliminar'
      })
    }else if(data.length > 0){
      let x=0;
  
      for(x=0; x < data.length; x++)
      {
        if(data[x].visibility == 1)
        {
          this.http.delete(this.url+'EmailV/delete/' + data[x].id).subscribe()
        }
      }

      let timerInterval = 0;

      Swal.fire({
        title: 'Eliminando notificaciones vistas',
        html: '<div class="spinner-border text-primary" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
      '</div>',
        timer: 2500,
        timerProgressBar: false,
        showConfirmButton: false,
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if(result.dismiss === Swal.DismissReason.timer)
        {
          location.reload()
        }
      })

    }
    })
  }
  })

}


}