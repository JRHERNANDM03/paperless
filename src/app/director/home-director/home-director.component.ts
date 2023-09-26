import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

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
  closeTrip: number;
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

interface emailsD{
  id: number;
  message: string;
  pernr: number;
  reinr: number;
  visibility: number;
  title: string;
  subtitle: string;
}

interface getSum{
  price_total: number;
}

interface authorized{
  date1: string;
  date2: string;
  id_auth: number;
  pernr: number;
  pernr_auth1: number;
  pernr_auth2: number;
  reinr: string;
  schem: string;
  time1: string;
  time2: string;

}
@Component({
  selector: 'app-home-director',
  templateUrl: './home-director.component.html',
  styleUrls: ['./home-director.component.css']
})
export class HomeDirectorComponent implements OnInit {
 
nickname!: string;
nameDirector!: string;
pernr!: number;

todosMisViajes = 'block';
findTrip = 'none';

date!: string;

updateEmailD: any = {}

updateAuthorized: any = {}

updateHead: any = {}

emailV: any = {}

emailD: any = {}

emailA: any = {}

fechaActual!: string;
horaActual!: string;

emailsAmount: number = 0;

pernrDirector!: number;

notifyDisplay = 'block'

url:any;

  constructor(private router:Router, public auth: AuthService, private http: HttpClient, private datePipe: DatePipe, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        const service = new ServiceService();
        this.url = service.url();
        
        this.auth.user$.subscribe(user => {
          this.nameDirector = String(user?.name)
          this.nickname = String(user?.nickname);
          this.getPernr(this.nickname)
          
        })

      }
    })
  }

  getPernr(nickname: string)
  {
    this.http.get<user>(this.url+'USERS/' + nickname).subscribe(data => {
      this.pernr = data.PERNR;
      this.pernrDirector = data.PERNR;
      this.getHead(this.pernr)
      this.getEmailsD(this.pernr)
    })
  }

  responseArray: PTRV_HEAD[] = [];
 
  authorized!: number[];

  getHead(pernr: number)
  {
    this.http.get<PTRV_HEAD[]>(this.url+'PTRV_HEADS/find/' + pernr).subscribe(data => {
      
      this.responseArray = data;
      this.authorized = data.map(item => item.auth);
    })
  }

responseArrayEmails: emailsD[] = [];
 
visibility_auth!: number[];

getEmailsD(pernr: number)
{
  this.http.get<emailsD[]>(this.url+'EmailsD/' + pernr).subscribe(data => {

    console.log(data)
    
    this.responseArrayEmails = data;
    this.visibility_auth = data.map(item => Number(item.visibility))

    let x = 0;
    for(x=0; x < data.length; x++)
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

    this.http.get<search[]>(this.url+'PTRV_HEAD/find/datv1/' + this.date + '/pernr/' + newPernr).subscribe(data => {
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


  getEmailsDRequest(idEmailD: number, message: string, reinr: number, visibility: number, titulo: string, pernrV: number)
  {
    
     this.http.get<getSum>(this.url+'getSUM_trip/' + reinr).subscribe(data => {
      this.http.get<PTRV_HEAD>(this.url+'PTRV_HEAD/' + reinr).subscribe(trip => {
        const idHead = trip.id;
        
        Swal.fire({
          title: titulo,
          html: message +
          '<hr>' +
          'Precio final del viaje: <p style="color: green;">$' + data.price_total +'</p>',
          showConfirmButton: true,
          confirmButtonColor: 'green',
          confirmButtonText: 'Aprobar viaje',
          showDenyButton: true,
          denyButtonColor: 'purple',
          denyButtonText: 'Ver viaje',
          showCancelButton: true,
          cancelButtonText: 'OK',
          cancelButtonColor: '#e86513'
        }).then(result => {
          if(result.isConfirmed)
          {
            if(trip.schem == '01')
            {
              
              Swal.fire({
                icon: 'question',
                iconColor: 'gray',
                title: '¿Aprobar viaje nacional?',
                showConfirmButton: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'Aprobar',
                showDenyButton: true,
                denyButtonColor: 'red',
                denyButtonText: 'Rechazar',
                showCancelButton: true
              }).then(resultNacional => {
                if(resultNacional.isConfirmed)
                {

                  if(trip.auth == 0 && trip.closeTrip == 1)
                  {

                  this.http.get<authorized>(this.url+'one_authorized/' + reinr).subscribe(infAuth => {
              
                  const tituloA = 'Nuevo viaje NACIONAL aprobado por el director correspondiente';
                  const subtituloA = 'Viaje: ' + reinr;
                  const messageA = 'El viaje nacional ' + reinr + ' ya fue aprobado por el director del area correspondiente. Ya puedes aprobar sus gastos de viaje';

                this.emailA = {
                    pernr: this.pernr,
                    reinr: reinr,
                    message: messageA,
                    title: tituloA,
                    subtitle: subtituloA
                      }
                
                  const titulo = 'Viaje aprobado!';
                  const subtitulo = 'Viaje: ' + reinr;
                  const messageV = 'Tu viaje ' + reinr +' fue aprobado a nivel cabecera por ' + this.nameDirector + ', ahora tu viaje se encuentra en proceso de autorización de gastos de viaje.';
                  
                  const fechaHoraActual = new Date();
    
              // Obtener fecha en formato "dd-MM-yyyy"
              this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
              
              // Obtener hora en formato "HH:mm:ss"
              this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));

              this.updateHead = {
                auth: 1
              }

              this.updateAuthorized = {
                date1: this.fechaActual,
                time1: this.horaActual
              }

              this.emailV = {
                pernr: trip.pernr,
                reinr: reinr,
                message: messageV,
                title: titulo,
                subtitle: subtitulo
              }

              this.updateEmailD = {
                visibility: 1
              }

           try{

            this.http.post(this.url+'EmailA', this.emailA).subscribe(emailAdm => {

            if(emailAdm){

                this.http.patch(this.url+'PTRV_HEADS/' + idHead, this.updateHead).subscribe(head => {
                  if(head)
                  {
                    this.http.patch(this.url+'authorized/' + infAuth.id_auth, this.updateAuthorized).subscribe(upAuth => {
                      if(upAuth)
                      {
                        this.http.post(this.url+'EmailV', this.emailV).subscribe(email_v => {
                          if(email_v)
                          {

                            if(visibility == 0)
                            {
                              this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe(email_d => {
                                if(email_d)
                                {
                                  this.authorizedTrip01()
                                }else { console.log('ERROR en EMAIL_D') }
                              })
                            }else if(visibility == 1)
                            {
                              this.authorizedTrip01()
                            }

                          }else { console.log('ERROR en EMAIL_V') }
                        })
                      }else { console.log('ERROR en UPAUTH') }
                    })
                  }else { console.log("ERROR en HEAD") }
                })
               } else { console.log('ERROR en EMAILADM') }
              })

              }catch(err)
              {
                this.failed()
              }

            })
          }else{
            Swal.fire({
              icon: 'warning',
              title: 'Este viaje ya fue aprobado o no se encuentra disponible para autorizar',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonColor: 'purple'
            })
          }

            }else if(resultNacional.isDenied)
            {

              // Solo Se crea el mensaje al usuario Viajero indicando que su viaje fue rechazado
              // Se modifica el viaje en la tabla PTRV_HEAD en el campo auth: 2 && closeTrip: 0

              if(trip.closeTrip == 1 && trip.auth == 0)
              {

                const titulo = 'Viaje Rechazado';
                const subtitulo = 'Viaje: ' + trip.reinr;
                const messageV = 'Tu viaje nacional fue rechazado, revisa los datos capturados.';

                this.emailV = {
                  pernr: trip.pernr,
                  reinr: trip.reinr,
                  message: messageV,
                  title: titulo,
                  subtitle: subtitulo
                }

                this.updateHead = {
                  auth: 2,
                  closeTrip: 0
                }

                this.updateEmailD = {
                  visibility: 1
                }

                try{

                  this.http.post(this.url+'EmailV', this.emailV).subscribe(email_V =>{
                    if(email_V)
                    {
                      this.http.patch(this.url+'PTRV_HEADS/' + trip.id, this.updateHead).subscribe(upHead =>{
                        if(upHead)
                        {
                          this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe(email_d => {
                            this.declainTrip01()
                          })
                        }else { console.log('ERROR en UPHEAD') }
                      })
                    }else { console.log('ERROR en EMAIL_v') }
                  })

                }catch(error)
                {
                  this.failed()
                }

              }else {
                Swal.fire({
                  icon: 'warning',
                  iconColor: 'yellow',
                  title: 'Este viaje no se encuentra disponible para cambios!',
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonColor: 'purple'
                })
              }

            }
            
          })

        }else if(trip.schem == '02')
        {
          const fechaHoraActual = new Date();
    
          // Obtener fecha en formato "dd-MM-yyyy"
          this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
                      
          // Obtener hora en formato "HH:mm:ss"
          this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));
                      

          this.http.get<authorized>(this.url+'one_authorized/' + trip.reinr).subscribe(data_auth => {
            if(data_auth)
            {
              
              this.http.get<PTRV_HEAD>(this.url+'PTRV_HEAD/' + data_auth.reinr).subscribe(ptrv_head => {

              

              if(data_auth.pernr_auth1 == this.pernrDirector)
              {
                if(data_auth.date1 == '' && data_auth.time1 == '' && ptrv_head.closeTrip == 1)
                {
                  Swal.fire({
                    icon: 'question',
                    iconColor: 'gray',
                    title: '¿Aprobar viaje internacional en la primera autorización?',
                    showConfirmButton: true,
                    confirmButtonColor: 'green',
                    confirmButtonText: 'Aprobar',
                    showDenyButton: true,
                    denyButtonColor: 'red',
                    denyButtonText: 'Rechazar',
                    showCancelButton: true
                  }).then(result => {
                    if(result.isConfirmed)
                    {
                      const tituloD = 'Nuevo viaje Internacional aprobado!';
                      const subtituloD = 'Viaje: ' + reinr;
                      const messageD = 'El viaje ' + reinr +' ya fue aprobado por el director ' + this.nameDirector + ' en la primera autorización. Ahora solo falta la segunda autorización para aprobar el viaje completo a nivel cabecera';
                    
                      this.emailD = {
                        pernr: pernrV,
                        reinr: reinr,
                        message: messageD,
                        title: tituloD,
                        subtitle: subtituloD,
                        pernr_d: data_auth.pernr_auth2
                      }

                      
                      this.updateAuthorized = {
                        date1: this.fechaActual,
                        time1: this.horaActual
                      }

                      this.http.post(this.url+'EmailD', this.emailD).subscribe(email_d => {
                        if(email_d)
                        {
                          this.http.patch(this.url+'authorized/' + data_auth.id_auth, this.updateAuthorized).subscribe(upd_auth => {
                            if(upd_auth)
                            {
                              let timerInterval = 0;
                              Swal.fire({
                                icon: 'success',
                                iconColor: 'green',
                                title: 'Viaje aprobado en la primera autorización',
                                text: 'Informando al segundo autorizador',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,

                                willClose: () => {
                                  clearInterval(timerInterval)
                                }
                              }).then((result) => {
                                if(result.dismiss === Swal.DismissReason.timer)
                                {
                                  this.updateEmailD = {
                                    visibility: 1
                                  }

                                  this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe(upd_email_d => {
                                    if(upd_email_d)
                                    {
                                      this.reload()
                                    }else { console.log('ERROR en UPD_EMAIL_D') }
                                  })
                                }
                              })
                            }else { console.log('ERROR en UPD_AUTH') }
                          })
                        }else { console.log('ERROR en EMAIL_D') }
                      })
                    
                    }else if(result.isDenied)
                    {

                      const titulo = 'Viaje Rechazado';
                      const subtitulo = 'Viaje: ' + trip.reinr;
                      const messageV = 'Tu viaje internacional fue rechazado, revisa los datos capturados.';

                      this.emailV = {
                        pernr: this.pernr,
                        reinr: reinr,
                        message: messageV,
                        title: titulo,
                        subtitle: subtitulo
                      }

                      this.updateHead = {
                        auth: 2,
                        closeTrip: 0
                      }

                      this.updateEmailD = {
                        visibility: 1
                      }

                      this.http.post(this.url+'EmailV', this.emailV).subscribe()
                      this.http.patch(this.url+'PTRV_HEADS/' +  idHead, this.updateHead).subscribe()
                      this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe()

                      let timerInterval = 0;

                      Swal.fire({
                        icon: 'success',
                        iconColor: 'red',
                        title: 'Viaje internacional rechazado',
                        text: 'Informando al usuario viajero',
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                        
                        willClose: () => {
                          clearInterval(timerInterval)
                        }

                      }).then((result) => {
                        if(result.dismiss === Swal.DismissReason.timer)
                        {
                          this.reload()
                        }
                      })
      
                    }else if(result.isDismissed)
                    {
                    }
                  })
                }else{
                  Swal.fire({
                    title: 'Este viaje Internacional ya fue aprobado o rechazado en la primera autorización',
                    showConfirmButton: true,
                    confirmButtonColor: 'purple',
                    showCancelButton: false,
                  })
                }
              }else if(data_auth.pernr_auth2 == this.pernrDirector && data_auth.date1 !== '' && data_auth.time1 !== '' && ptrv_head.closeTrip == 1 && data_auth.date2 == '' && data_auth.time2 == '')
              {
                Swal.fire({
                  icon: 'question',
                  iconColor: 'gray',
                  title: '¿Aprobar viaje internacional en la segunda autorización?',
                  showConfirmButton: true,
                  confirmButtonColor: 'green',
                  confirmButtonText: 'Aprobar',
                  showDenyButton: true,
                  denyButtonColor: 'red',
                  denyButtonText: 'Rechazar',
                  showCancelButton: true
                }).then(result => {
                  if(result.isConfirmed)
                  {
                    const tituloV = 'Viaje aprobado';
                    const subtituloV = 'Viaje: ' + reinr;
                    const messageV = 'Tu viaje Internacional fue aprobado por ' + this.nameDirector + ', ahora se encuentra en proceso de aprobación de gastos de viaje';

                    const tituloA = 'Nuevo viaje INTERNACIONAL aprobado por directores';
                    const subtituloA = 'Viaje: ' + reinr;
                    const messageA = 'El viaje internacional ' + reinr + ' ya fue aprobado por ambas autorizaciones. Ya puedes aprobar sus gastos de viaje';

                    this.emailV = {
                      pernr: this.pernr,
                      reinr: reinr,
                      message: messageV,
                      title: tituloV,
                      subtitle: subtituloV
                    }

                    this.emailA = {
                      pernr: this.pernr,
                      reinr: reinr,
                      message: messageA,
                      title: tituloA,
                      subtitle: subtituloA
                    }

                    this.updateHead = {
                      auth: 1
                    }

                    this.updateAuthorized = {
                      date2: this.fechaActual,
                      time2: this.horaActual
                    }

                    this.updateEmailD = {
                      visibility: 1
                    }

                    this.http.post(this.url+'EmailV', this.emailV).subscribe()
                    this.http.post(this.url+'EmailA', this.emailA).subscribe()
                    this.http.patch(this.url+'PTRV_HEADS/' + ptrv_head.id, this.updateHead).subscribe()
                    this.http.patch(this.url+'authorized/' + data_auth.id_auth, this.updateAuthorized).subscribe()
                    this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe()

                    let timerInterval = 0;
                    Swal.fire({
                      icon: 'success',
                      iconColor: 'green',
                      title: 'Viaje Internacional aprobado',
                      text: 'Informando al usuario Viajero y al usuario Administrador',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,

                      willClose: () => {
                        clearInterval(timerInterval)
                      }
                    }).then((result) => {
                      if(result.dismiss === Swal.DismissReason.timer)
                      {
                        this.reload()
                      }
                    })

                  }else if(result.isDenied){

                    const titleV = 'Viajer Internacional Rechazado!';
                    const subtitleV = 'Viaje: ' + reinr;
                    const messageV = 'El viaje ' + reinr + ' fue rechazado, revisa los datos registrados';

                    this.updateAuthorized = {
                      date1: '',
                      time1: ''
                    }

                    this.updateHead = {
                      auth: 2,
                      closeTrip: 0
                    }

                    this.emailV = {
                      pernr: this.pernr,
                      reinr: reinr,
                      message: messageV,
                      title: titleV,
                      subtitle: subtitleV
                    }

                    this.updateEmailD = {
                      visibility: 1
                    }

                    this.http.post(this.url+'EmailV', this.emailV).subscribe()
                    this.http.patch(this.url+'PTRV_HEADS/' + ptrv_head.id, this.updateHead).subscribe()
                    this.http.patch(this.url+'authorized/' + data_auth.id_auth, this.updateAuthorized).subscribe()
                    this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe()

                    let timerInterval = 0;
                    Swal.fire({
                      icon: 'success',
                      iconColor: 'red',
                      title: 'Viajer Internacional rechazado',
                      text: 'Informando al viajero',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,

                      willClose: () => {
                        clearInterval(timerInterval)
                      }
                    }).then((result) => {
                      if(result.dismiss === Swal.DismissReason.timer)
                      {
                        this.reload()
                      }
                    })

                  }else if(result.isDismissed)
                  {

                  }
                })
              }else if(data_auth.pernr_auth2 == this.pernrDirector && data_auth.date2 !== '' && data_auth.time2 !== ''){
                Swal.fire({
                  title: 'Este viaje ya fue aprobado o rechazado',
                  text: 'Por el momento no se pueden hacer cambios',
                  showConfirmButton: true,
                  confirmButtonColor: 'purple'
                })
              }
              else { 
                Swal.fire({
                  title: 'Este viaje internacional aún no ha sido aprobado por la primera autorización',
                  showConfirmButton: true,
                  confirmButtonColor: 'purple',
                  showCancelButton: false
                })
              }

            }) 

            }else { console.log('ERROR en DATA_AUTH') }
          })

          


        }
      }else if(result.isDenied)
      {
        if(visibility == 0)
        {
          this.updateEmailD = {
            visibility: 1
          }

          this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe(upd_emailD => {
            if(upd_emailD)
            {
              //this.router.navigate(['/Director/Viaje'], {queryParams: {id: idHead}})
              //window.location.href="/Director/Viaje?id="+idHead+""

              const data = {id: idHead};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomePendientes-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Viaje';
            }
          })
        }
        else if(visibility == 1)
        {
          //this.router.navigate(['/Director/Viaje'], {queryParams: {id: idHead}})
          //window.location.href="/Director/Viaje?id="+idHead+""

          const data = {id: idHead};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomePendientes-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Viaje';
        }
      }else if(result.dismiss)
      {
        if(visibility == 0)
        {
          this.updateEmailD = {
            visibility: 1
          }

          this.http.patch(this.url+'EmailD/update/' + idEmailD, this.updateEmailD).subscribe(upd_emailD => {
            if(upd_emailD)
            {
              this.reload()
            }
          })
        }
      }
    })
  })


  })

  }

  getVisibility(visibility: number): number {
    if (visibility === 0) {
      this.notifyDisplay='none'
      return 0;
    } else if (visibility === 1) { 
      this.notifyDisplay='block'
      return 1;
    } else {
      return -1; // O cualquier otro valor numérico que desees asignar para representar el estado desconocido
    }
  }
  
  authorizedTrip01()
  {

    let timerInterval = 0;

    Swal.fire({
      icon: 'success',
      iconColor: 'green',
      title: 'Viaje aprobado',
      text: 'Informando al viajero....',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,

      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if(result.dismiss === Swal.DismissReason.timer)
      {
        this.reload()
      }
    })
  }

  declainTrip01()
  {
    let timerInterval = 0;

    Swal.fire({
      icon: 'success',
      iconColor: 'red',
      title: 'Viaje rechazado',
      text: 'Informando al viajero....',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,

      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if(result.dismiss === Swal.DismissReason.timer)
      {
        this.reload()
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
  //this.router.navigate(['/Director/Mi-Viaje'], {queryParams: {id: id} });
  const data = {id: id};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHome-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Mi-Viaje';
}

failed()
{
  Swal.fire({
    icon: 'error',
    title: 'Ocurrio un error!',
    text: 'Intentelo nuevamente.'
  })
}

reload()
{
  location.reload()
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
        this.http.delete(this.url+'EmailD/delete/' + id).subscribe(data => {
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

    this.http.get<emailsD[]>(this.url+'EmailsD/' + this.pernr).subscribe(data => {

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
          this.http.delete(this.url+'EmailD/delete/' + data[x].id).subscribe()
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
      
