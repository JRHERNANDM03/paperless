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
}

interface infoTrip
{
  PERNR: number;
  AREA_ID: number;
  auth: number
  closeTrip: number
  created_at: string;
  datb1: string;
  date: string;
  datv1: string;
  description: string;
  hrgio: string;
  id: number;
  kunde: string;
  lastname: string;
  name: string;
  nickname: string;
  pernr: string;
  reinr: string;
  rol_id: number;
  schem: string;
  times: string;
  total_loc_amount: number;
  uhrb1: string;
  uhrv1: string;
  uname: string;
  updated_at: string;
  zland: string;
  zort1: string;
  id_auth: number;
  pernr_auth1: number;
  pernr_auth2: number;
  date1: string;
  time1: string;
}

@Component({
  selector: 'app-pendientes-home',
  templateUrl: './pendientes-home.component.html',
  styleUrls: ['./pendientes-home.component.css']
})
export class PendientesHomeComponent implements OnInit{

  nameDirector: string = '';
  pernrDirector!: number;

  emailV: any = {}

  emailA: any = {}

  emailD: any = {}

  ptrv_head: any = {}

  authorizedPatch: any = {}

fechaActual!: string;
horaActual!: string;

url:any;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        const service = new ServiceService();
        this.url = service.url();
        
        this.auth.user$.subscribe(info => {
          const nickname = String(info?.nickname)
          this.getArea(nickname)

          this.nameDirector = String(info?.name)
        })

      }
    })
  }

  getArea(nickname: string)
  {
    this.http.get<user>(this.url+'USERS/' + nickname).subscribe(data => {
      this.pernrDirector = data.PERNR;
      this.getAllTrip(data.PERNR)
    })
  }

  responseArray: infoTrip[] = [];
  authorized!: number[];
  

  getAllTrip(pernr: number)
  {
    this.http.get<infoTrip[]>(this.url+'authorized/' + pernr).subscribe(data => {  
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

  aprobar(reinr: string, pernr: string, area_id: number, idHead: number, schem: string, id_auth: number, pernr_auth1: number, pernr_auth2: number, date1: string, time1: string)
  {

    if(schem == '01')
    {
      let timerInterval=0;
      Swal.fire({
        title: '¿Aprobar viaje?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: 'green',
        confirmButtonText: 'Aprobar',
        cancelButtonText: 'Cancelar',
        showDenyButton: true,
        denyButtonText: 'Rechazar',
        denyButtonColor: 'red'
      }).then((result) => {
        if(result.isConfirmed)
        {
          const titulo = 'Viaje aprobado!';
              const subtitulo = 'Viaje: ' + reinr;
              const messageV = 'Tu viaje ' + reinr +' fue aprobado a nivel cabecera por ' + this.nameDirector + ', ahora tu viaje se encuentra en proceso de autorización de gastos de viaje.';
              
              const tituloA = 'Nuevo viaje INTERNACIONAL aprobado por directores';
              const subtituloA =  'Viaje: ' + reinr;
              const messageA = 'El viaje internacional: ' + reinr + ' ya fue aprobado a nivel cabecera por ambas autorizaciones, los gastos del viaje ya pueden ser aprobados.';

              this.ptrv_head = {
                auth: 1
              }
  
              this.emailV = {
                pernr: pernr,
                reinr: reinr,
                message: messageV,
                title: titulo,
                subtitle: subtitulo
              }
  
              this.emailA = {
                pernr: pernr,
                reinr: reinr,
                message: messageA,
                title: tituloA,
                subtitle: subtituloA
              }
  
          this.ptrv_head =
          {
            auth: 1
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

  
          try
          {
          this.http.post(this.url+'EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.post(this.url+'EmailA', this.emailA).subscribe(resA => {
                if(resA)
                {
                  this.http.patch(this.url+'PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                    if(resH)
                    {
                      this.http.patch(this.url+'authorized/' + id_auth, this.authorizedPatch).subscribe(resAuthorized => {
                        if(resAuthorized)
                        {
                          this.true()
                        }
                        else
                        {
                          console.log('Error en resAuthorized')
                        }
                      })
                    }
                    else
                    {
                      console.log('Error en resH')
                    }
                  })
                }
                else
                {
                  console.log('Error en resA')
                }
              })
            }
            else
            {
              console.log('Error en resV')
            }
          })
        }catch(err)
        {
          this.failed()
        }
          
        
        
        }else if(result.isDenied)
        {
          const titleV = 'Viaje rechazado!';
            const subtitleV = 'Viaje: ' + reinr;
            const messageV = 'Lo sentimos, su viaje no fue aprobado. Le sugerimos corregir sus datos'

            this.emailV = {
              pernr: pernr,
              reinr: reinr,
              message: messageV,
              title: titleV,
              subtitle: subtitleV
            }
  
          this.ptrv_head =
          {
            auth: 2,
            closeTrip: 0
          } 
  
          try
          {
          this.http.post(this.url+'EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.patch(this.url+'PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                if(resH)
                {
                  this.false()
                }
                  else
                   {
                    console.log('Error en resH')
                   }
                })           
            }
            else
            {
              console.log('Error en resV')
            }
          })
        }catch(err)
        {
          this.failed()
        }
        }
      })    
    }else if(schem == '02')
    {
      if(this.pernrDirector == pernr_auth1 && date1 == "" && time1 == "")
      {
        let timerInterval=0;
      Swal.fire({
        title: '¿Aprobar viaje?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: 'green',
        confirmButtonText: 'Aprobar',
        cancelButtonText: 'Cancelar',
        showDenyButton: true,
        denyButtonText: 'Rechazar',
        denyButtonColor: 'red'
      }).then((result) => {
        if(result.isConfirmed)
        {
          const tituloD = 'Nuevo viaje Internacional aprobado!';
          const subtituloD = 'Viaje: ' + reinr;
          const messageD = 'El viaje ' + reinr +' ya fue aprobado por el director ' + this.nameDirector + ' en la primera autorización. Ahora solo falta la segunda autorización para aprobar el viaje completo a nivel cabecera';
                  
          this.emailD = {
            pernr: pernr,
            reinr: reinr,
            message: messageD,
            title: tituloD,
            subtitle: subtituloD,
            pernr_d: pernr_auth2
          }
  
          this.ptrv_head =
          {
            auth: 1
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

  
          try
          {
              this.http.post(this.url+'EmailD', this.emailD).subscribe(resA => {
                if(resA)
                {
                  
                      this.http.patch(this.url+'authorized/' + id_auth, this.authorizedPatch).subscribe(resAuthorized => {
                        if(resAuthorized)
                        {
                          this.true2()
                        }
                        else
                        {
                          console.log('Error en resAuthorized')
                        }
                      })
                    
                
                }
                else
                {
                  console.log('Error en resA')
                }
              })
            
        }catch(err)
        {
          this.failed()
        }
          
        
        
        }else if(result.isDenied)
        {
          const titleV = 'Viaje rechazado!';
          const subtitleV = 'Viaje: ' + reinr;
          const messageV = 'Lo sentimos, su viaje no fue aprobado. Le sugerimos corregir sus datos'

          this.emailV = {
            pernr: pernr,
            reinr: reinr,
            message: messageV,
            title: titleV,
            subtitle: subtitleV
          }
          this.ptrv_head =
          {
            auth: 2,
            closeTrip: 0
          } 
  
          try
          {
          this.http.post(this.url+'EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.patch(this.url+'PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                if(resH)
                {
                  this.false()
                }
                  else
                   {
                    console.log('Error en resH')
                   }
                })           
            }
            else
            {
              console.log('Error en resV')
            }
          })
        }catch(err)
        {
          this.failed()
        }
        }
      })
      }else if(this.pernrDirector == pernr_auth1 && date1 !== undefined && time1 !== undefined)
      {
        Swal.fire({
          icon: 'info',
          iconColor: 'purple',
          title: 'Este viaje internacional ya fue aprobado por tu persona.',
          text: 'Se encuentra en espera de la segunda autorización',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'orange'
        })
      }
      else if(this.pernrDirector == pernr_auth2)
      {
        if(date1 == "" && time1 == "")
        {
          Swal.fire({
            icon: 'info',
            title: 'Este viaje internacional, aún no es aprobado por la primera autorización',
            showConfirmButton: true,
            confirmButtonColor: 'purple',
            showCancelButton: false
          })
        }else
        {
          let timerInterval=0;
      Swal.fire({
        title: '¿Aprobar viaje?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: 'green',
        confirmButtonText: 'Aprobar',
        cancelButtonText: 'Cancelar',
        showDenyButton: true,
        denyButtonText: 'Rechazar',
        denyButtonColor: 'red'
      }).then((result) => {
        if(result.isConfirmed)
        {
          const titulo = 'Viaje aprobado!';
          const subtitulo = 'Viaje: ' + reinr;
          const messageV = 'Tu viaje ' + reinr +' fue aprobado a nivel cabecera por ' + this.nameDirector + ', ahora tu viaje se encuentra en proceso de autorización de gastos de viaje.';
          
          const tituloA = 'Nuevo viaje INTERNACIONAL aprobado por directores';
          const subtituloA =  'Viaje: ' + reinr;
          const messageA = 'El viaje internacional: ' + reinr + ' ya fue aprobado a nivel cabecera por ambas autorizaciones, los gastos del viaje ya pueden ser aprobados.';

          this.ptrv_head = {
            auth: 1
          }

          this.emailV = {
            pernr: pernr,
            reinr: reinr,
            message: messageV,
            title: titulo,
            subtitle: subtitulo
          }

          this.emailA = {
            pernr: pernr,
            reinr: reinr,
            message: messageA,
            title: tituloA,
            subtitle: subtituloA
          }
  
          this.ptrv_head =
          {
            auth: 1
          } 
          const fechaHoraActual = new Date();
    
          // Obtener fecha en formato "dd-MM-yyyy"
          this.fechaActual = String(this.datePipe.transform(fechaHoraActual, 'dd-MM-yyyy'));
          
          // Obtener hora en formato "HH:mm:ss"
          this.horaActual = String(this.datePipe.transform(fechaHoraActual, 'HH:mm:ss'));
        
          this.authorizedPatch = 
          {
            date2: this.fechaActual,
            time2: this.horaActual
          }

  
          try
          {
          this.http.post(this.url+'EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.post(this.url+'EmailA', this.emailA).subscribe(resA => {
                if(resA)
                {
                  this.http.patch(this.url+'PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                    if(resH)
                    {
                      this.http.patch(this.url+'authorized/' + id_auth, this.authorizedPatch).subscribe(resAuthorized => {
                        if(resAuthorized)
                        {
                          this.true()
                        }
                        else
                        {
                          console.log('Error en resAuthorized')
                        }
                      })
                    }
                    else
                    {
                      console.log('Error en resH')
                    }
                  })
                }
                else
                {
                  console.log('Error en resA')
                }
              })
            }
            else
            {
              console.log('Error en resV')
            }
          })
        }catch(err)
        {
          this.failed()
        }
          
        
        
        }else if(result.isDenied)
        {
          const titleV = 'Viaje rechazado!';
            const subtitleV = 'Viaje: ' + reinr;
            const messageV = 'Lo sentimos, su viaje no fue aprobado. Le sugerimos corregir sus datos'

            this.emailV = {
              pernr: pernr,
              reinr: reinr,
              message: messageV,
              title: titleV,
              subtitle: subtitleV
            }
  
          this.ptrv_head =
          {
            auth: 2,
            closeTrip: 0
          } 
  
          try
          {
          this.http.post(this.url+'EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.patch(this.url+'PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                if(resH)
                {
                  this.false()
                }
                  else
                   {
                    console.log('Error en resH')
                   }
                })           
            }
            else
            {
              console.log('Error en resV')
            }
          })
        }catch(err)
        {
          this.failed()
        }
        }
      })    
        }
      }
    }else
    {
      console.log(this.errLog)
    }

    
  }

  true()
  {
    const timerInterval = 0;

    Swal.fire({
      icon: 'success',
      title: 'Viaje aprobado',
      text: 'Informando al usuario Viajero y al usuario Administrador',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      
      willClose: () => {
        clearInterval(timerInterval)
      }
      }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.reload()
      }
      })
  }

  false()
  {
    const timerInterval = 0;
    Swal.fire({
      icon: 'info',
      iconColor: 'red',
      title: 'Viaje rechazado',
      text: 'Informando al Viajero',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      
      willClose: () => {
        clearInterval(timerInterval)
      }
      }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
       this.reload()
      }
    })
  }

  true2()
  {
    const timerInterval = 0;

    Swal.fire({
      icon: 'success',
      title: 'Primera autorización aprobada',
      text: 'Listo para la segunda aprobación, usuario informado.',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      
      willClose: () => {
        clearInterval(timerInterval)
      }
      }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.reload()
      }
      })
  }

  failed()
  {
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos, ocurrio un error durante el proceso de aprobación, vuelve a intentar'
    })
  }


  showExpense(id: number)
  {
    const data = {id: id};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomePendientes-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Viaje';
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

  reload()
  {
    location.reload()
  }
}
