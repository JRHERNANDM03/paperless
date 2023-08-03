import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import Swal from 'sweetalert2';

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

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){
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
    this.http.get<user>('http://localhost:3000/USERS/' + nickname).subscribe(data => {
      this.pernrDirector = data.PERNR;
      this.getAllTrip(data.PERNR)
    })
  }

  responseArray: infoTrip[] = [];
  authorized!: number[];
  

  getAllTrip(pernr: number)
  {
    this.http.get<infoTrip[]>('http://localhost:3000/authorized/' + pernr).subscribe(data => {  
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
          const messageV = 'Tu viaje a nivel cabecera fue aprovado por el director de tu area: ' + this.nameDirector + ', ahora tu viaje pasa al siguiente proceso para que tus gastos sean aprobados.';
          const messageA = 'El viaje: ' + reinr + ' del usuario: ' + pernr + ' fue aprobado por el director: ' + this.nameDirector + ', ahora puedes aprobar sus gastos de viaje.';
  
          this.emailV =
          {
            pernr: pernr,
            reinr:  reinr,
            message: messageV
          }
  
          this.emailA =
          {
            pernr: pernr,
            reinr: reinr,
            area: area_id,
            message: messageA
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
          this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.post('http://localhost:3000/EmailA', this.emailA).subscribe(resA => {
                if(resA)
                {
                  this.http.patch('http://localhost:3000/PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                    if(resH)
                    {
                      this.http.patch('http://localhost:3000/authorized/' + id_auth, this.authorizedPatch).subscribe(resAuthorized => {
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
          const messageV = 'Tu viaje a nivel cabecera fue rechazado por el director de tu area: ' + this.nameDirector + ', valida toda la información que capturas.';
  
          this.emailV =
          {
            pernr: pernr,
            reinr:  reinr,
            message: messageV
          }
  
          this.ptrv_head =
          {
            auth: 2,
            closeTrip: 0
          } 
  
          try
          {
          this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.patch('http://localhost:3000/PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
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
          const messageV = 'Tu viaje internacional ya fue aprobado por la primera autorización, ahora tu viaje se encuentra en espera de la segunda aprobación';
          const messageD = 'El viaje interncacional: ' + reinr + ' del usuario: ' + pernr + ' fue aprobado por: ' + this.nameDirector + ', ahora el viaje se encuentra en espera de la segunda aprobación.';
  
          this.emailV =
          {
            pernr: pernr,
            reinr:  reinr,
            message: messageV
          }
  
          this.emailD =
          {
            pernr: pernr,
            reinr: reinr,
            area: area_id,
            message: messageD
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
          this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.post('http://localhost:3000/Email', this.emailD).subscribe(resA => {
                if(resA)
                {
                  
                      this.http.patch('http://localhost:3000/authorized/' + id_auth, this.authorizedPatch).subscribe(resAuthorized => {
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
          const messageV = 'Tu viaje a nivel cabecera fue rechazado por el director de tu area: ' + this.nameDirector + ', valida toda la información que capturas.';
  
          this.emailV =
          {
            pernr: pernr,
            reinr:  reinr,
            message: messageV
          }
  
          this.ptrv_head =
          {
            auth: 2,
            closeTrip: 0
          } 
  
          try
          {
          this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.patch('http://localhost:3000/PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
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
          const messageV = 'Tu viaje a nivel cabecera fue aprovado por el director de tu area: ' + this.nameDirector + ', ahora tu viaje pasa al siguiente proceso para que tus gastos sean aprobados.';
          const messageA = 'El viaje: ' + reinr + ' del usuario: ' + pernr + ' fue aprobado por el director: ' + this.nameDirector + ', ahora puedes aprobar sus gastos de viaje.';
  
          this.emailV =
          {
            pernr: pernr,
            reinr:  reinr,
            message: messageV
          }
  
          this.emailA =
          {
            pernr: pernr,
            reinr: reinr,
            area: area_id,
            message: messageA
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
          this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.post('http://localhost:3000/EmailA', this.emailA).subscribe(resA => {
                if(resA)
                {
                  this.http.patch('http://localhost:3000/PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
                    if(resH)
                    {
                      this.http.patch('http://localhost:3000/authorized/' + id_auth, this.authorizedPatch).subscribe(resAuthorized => {
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
          const messageV = 'Tu viaje a nivel cabecera fue rechazado por el director de tu area: ' + this.nameDirector + ', valida toda la información que capturas.';
  
          this.emailV =
          {
            pernr: pernr,
            reinr:  reinr,
            message: messageV
          }
  
          this.ptrv_head =
          {
            auth: 2,
            closeTrip: 0
          } 
  
          try
          {
          this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(resV => {
            if(resV)
            {
              this.http.patch('http://localhost:3000/PTRV_HEADS/' + idHead, this.ptrv_head).subscribe(resH => {
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
