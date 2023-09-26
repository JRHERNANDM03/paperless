import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

interface user
{
  PERNR: number;
  area_id: number;
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
  closeTrip: number;
}

interface count
{
  TOTAL: number;
}

interface authorize
{
  id_auth: number;
  pernr: number;
  reinr: number,
  schem: string;
  pernr_auth1: number;
  date1: string;
  time1: string;
  pernr_auth2: number;
  date2: string;
  time2: string;
}


@Component({
  selector: 'app-mostrar-miviaje-director',
  templateUrl: './mostrar-miviaje-director.component.html',
  styleUrls: ['./mostrar-miviaje-director.component.css']
})
export class MostrarMiviajeDirectorComponent implements OnInit {

  idHead!: number;
  pernrUser!: string;

  id!: number;
  pernr!: string;
  reinr!: string;
  schem!: string;
  zort1!: string;
  zland!: string;
  hrgio!: string;
  kunde!: string;
  datv1!: string;
  uhrv1!: string;
  datb1!: string;
  uhrb1!: string;
  date!: string;
  times!: string;
  uname!: string;
  authorized!: number;
  authCloseTrip!: number;

  total!: number;

  styleClose='none';

  emailV: any = {}
  emailD: any = {}
  emailA: any = {}

  ptrv_head: any = {}
  authorizedPatch: any = {} 

  id_auth!: number;
  pernr_auth!: number;
  reinr_auth!: number;
  schem_auth!: string;
  pernr_auth1!: number;
  date1_auth!: string;
  time1_auth!: string;
  pernr_auth2!: number;
  date2_auth!: string;
  time2_auth!: string;

  completeName!: string;

  fechaActual!: string;
  horaActual!: string;

  recivedData: any;

  url:any;

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        
        /*this.route.queryParams.subscribe(params => {
          this.idHead = params['id'];
        })*/

        const service = new ServiceService();
        this.url = service.url();

        this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.idHead = this.recivedData.id;

        }else{
          const localStorageData = localStorage.getItem('DataHome-Director');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        this.idHead = parsedData.id;
        }}

        this.auth.user$.subscribe(infoUser => {
          this.completeName = String(infoUser?.name)
          this.http.get<user>(this.url+'USERS/' + infoUser?.nickname).subscribe(data => {
            this.pernrUser = String(data.PERNR);
            this.getTrip()
          })
        })

      }
    })
  }


  getTrip()
  {
    this.http.get<PTRV_HEAD>(this.url+'PTRV_HEADS/' + this.idHead).subscribe(data => {
      this.id = data.id;
      this.pernr = data.pernr;
      this.reinr = data.reinr;
      this.schem = data.schem;
      this.zort1 = data.zort1;
      this.zland = data.zland;
      this.hrgio = data.hrgio;
      this.kunde = data.kunde;
      this.datv1 = data.datv1;
      this.uhrv1 = data.uhrv1;
      this.datb1 = data.datb1;
      this.uhrb1 = data.uhrb1;
      this.date = data.date;
      this.times = data.times;
      this.uname = data.uname;
      this.authorized = data.auth;
      this.authCloseTrip = data.closeTrip;

      this.getAccountTrip(data.reinr)

      this.getAuthorized(data.reinr)

      if(data.closeTrip === 0)
    {
      this.styleClose='block'
    }
    })
  }

  getAccountTrip(reinr: string)
  {
    this.http.get<count>(this.url+'GENERAL/account/' + reinr).subscribe(sum => {
      if(sum.TOTAL === null)
      {
        this.total = 0;
      }else
      {
        this.total = sum.TOTAL;
      }
    })
  }

  getAuthorized(reinr: string)
  {
    this.http.get<authorize>(this.url+'one_authorized/' + reinr).subscribe(data => {
      this.id_auth = data.id_auth;
      this.pernr_auth = data.pernr;
      this.reinr_auth = data.reinr;
      this.schem_auth = data.schem;
      this.pernr_auth1 = data.pernr_auth1;
      this.date1_auth = data.date1;
      this.time1_auth = data.time1;
      this.pernr_auth2 = data.pernr_auth2;
      this.date2_auth = data.date2;
      this.time2_auth = data.time2;
  })
  }

  getColor(authorized: number): string {
    if (authorized === 0) {
      return 'grey';
    } else if (authorized === 1) {
      return 'green';
    } else if (authorized === 2) {
      return 'red';
    } else {
      return 'black'; // Color predeterminado si el valor no coincide
    }
  }

  getTitle(authorized: number): string {
    if (authorized === 0) {
      return 'PENDIENTE';
    } else if (authorized === 1) {
      return 'APROBADO';
    } else if (authorized === 2) {
      return 'RECHAZADO';
    } else {
      return 'Desconocido'; // Texto predeterminado si el valor no coincide
    }
  }

  status(authorized: number)
  {
    if(authorized === 0)
    {
    Swal.fire({
      icon: 'info',
      title: 'Estado: PENDIENTE',
      showCancelButton: false,
      confirmButtonColor: 'purple'
    });
    }else if(authorized === 1)
    {
      Swal.fire({
        icon: 'info',
        title: 'Estado: APROBADO',
        showCancelButton: false,
        confirmButtonColor: 'purple'
      });
    }else if(authorized === 2)
    {
      Swal.fire({
        icon: 'info',
        title: 'Estado: RECHAZADO',
        showCancelButton: false,
        confirmButtonColor: 'purple'
      });
    }
  }

  close()
  {
    Swal.fire({
      title: '¿Seguro de cerrar viaje?',
      text: 'Al cerrar viaje ya no podrás registrar y modificar ningun gasto.',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Cerrar viaje'
    }).then((result) => {
      if(result.isConfirmed)
      {
        /**/
        if(this.pernr_auth == this.pernr_auth1)
        {
          if(this.schem_auth == '01')
          {
            //console.log('Aprobar directamente actualizando los campos necesarios dentro del viaje en la table ptrv_heads y redactar msj al usuario administrador')
            
            const messageV = 'El viaje ' + this.reinr + ' fue aprobado por tu persona y se encuentra en espera de aprobación en gastos de viaje.'
            const messageA = 'El viaje ' + this.reinr + ' del usuario ' + this.completeName + ' ya fue aprobado a nivel cabezera y ahora puedes aprobar sus gastos de viaje.';

            this.ptrv_head = {
              auth: 1,
              closeTrip: 1
            }

            this.emailV = {
              pernr: this.pernr,
              reinr: this.reinr,
              message: messageV
            }

            this.emailA = {
              pernr: this.pernr,
              reinr: this.reinr,
              message: messageA
            }

            const fechaHoraActual = new Date();
    
            // Obtener fecha en formato "dd-MM-yyyy"
            this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
            
            // Obtener hora en formato "HH:mm:ss"
            this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));
          
            this.authorizedPatch = 
            {
              date1: this.fechaActual,
              time1: this.horaActual
            }
            
            try{
            this.http.patch(this.url+'PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
              if(head)
              {

                this.http.post(this.url+'EmailV', this.emailV).subscribe(email_v => {
                  if(email_v)
                  {

                    this.http.post(this.url+'EmailA', this.emailA).subscribe(email_a =>{
                      if(email_a)
                      {

                        this.http.patch(this.url+'authorized/' + this.id_auth, this.authorizedPatch).subscribe(auth_patch => {
                          if(auth_patch)
                          {

                            Swal.fire({
                              icon: 'success',
                              title: 'Petición correcta',
                              text: 'Tu viaje fue cerrado y aprobado por tu persona.',
                              showCancelButton: false,
                              showConfirmButton: true,
                              confirmButtonColor: 'purple'
                            }).then(res =>{
                              if(res.isConfirmed)
                              {
                                this.reload()
                              }
                            })

                          }else { console.log('ERROR en AUTH_PATCH') }
                        })

                      }else { console.log('ERROR en EMAIL_A') }
                    })

                  }else { console.log('ERROR en EMAIL_V') }
                })

              }else { console.log('ERROR en HEAD') }
            })

          }catch(err)
          {
            this.failed()
          }

          }else
          if(this.schem_auth == '02')
          {
            //console.log('Llenar los campos requeridos dentro de la tabla authorized y redactar msj para la segunda aprobación')
            
            const messageD = 'El viaje internacional: ' + this.reinr + ' del usuario: ' + this.pernr + ' fue aprobado en la primera autorización, ahora el viaje se encuentra en espera de la segunda aprobación.';

            this.ptrv_head = {
              closeTrip: 1
            }

            this.emailD = {
              pernr: this.pernr,
              reinr: this.reinr,
              message: messageD,
              pernr_d: this.pernr_auth2
            }


            const fechaHoraActual = new Date();
    
            // Obtener fecha en formato "dd-MM-yyyy"
            this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
            
            // Obtener hora en formato "HH:mm:ss"
            this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));
          
            this.authorizedPatch = 
            {
              date1: this.fechaActual,
              time1: this.horaActual
            }

            try{

              this.http.patch(this.url+'PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head =>{
                if(head)
                {

                  this.http.post(this.url+'EmailD', this.emailD).subscribe(email_d => {
                    if(email_d)
                    {

                      this.http.patch(this.url+'authorized/' + this.id_auth, this.authorizedPatch).subscribe(auth_patch => {
                        if(auth_patch)
                        {

                          Swal.fire({
                            icon: 'success',
                            title: 'Petición correcta',
                            text: 'Tu viaje internacional ya fue cerrado y aprobado en la primera autorización por tu persona, (en espera de la segunda aprobación).',
                            showCancelButton: false,
                            showConfirmButton: true,
                            confirmButtonColor: 'purple'
                          }).then(res => {
                            if(res.isConfirmed)
                            {
                              this.reload()
                            }
                          })

                        }else { console.log('ERROR en AUTH_PATCH') }
                      })

                    }else { console.log('ERROr en EMAIL_D') }
                  })

                }else { console.log('ERROR en HEAD') }
              })

            }catch(err)
            {
              this.failed()
            }

          }
          else
          {
            alert("Ocurrio un error dentro la validacion de viaje")
          }
        }
        else
        {
          //console.log('Redactar msj para el director asignado en la autorización')

          const messageD = 'El viaje ' + this.reinr + ' del usuario ' + this.completeName + ' ya fue cerrado y se encuentre en proceso de aprobación.'
          
          this.ptrv_head = {
            closeTrip: 1
          }

          this.emailD = {
            pernr: this.pernr,
            reinr: this.reinr,
            message: messageD,
            pernr_d: this.pernr_auth1
          }

          try{

            this.http.patch(this.url+'PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
              if(head)
              {

                this.http.post(this.url+'EmailD', this.emailD).subscribe(email_d => {
                  if(email_d)
                  {

                    Swal.fire({
                      icon: 'success',
                      title: 'Petición correcta',
                      text: 'Tu viaje ya fue cerrado y notificado a tu director para aprobación',
                      showCancelButton: false,
                      showConfirmButton: true,
                      confirmButtonColor: 'purple'
                    }).then(res => {
                      if(res.isConfirmed)
                      {
                        this.reload()
                      }
                    })

                  }else { console.log('ERROR en EMAIL_D') }
                })

              }else { console.log('ERROR en HEAD') }
            })

          }catch(err)
          {
            this.failed()
          }

        }
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

  details(id: number, authCloseTrip: number)
{
  //this.router.navigate(['/Director/Mis-Gastos'], {queryParams: {id: id, authCloseTrip: authCloseTrip} });

  const data = {id: id, authCloseTrip: authCloseTrip};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataMiViaje-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Mis-Gastos';
}

failed()
  {
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos, ocurrio un error durante el proceso de aprobación, vuelve a intentar'
    })
  }

  reload()
  {
    location.reload()
  }

}
