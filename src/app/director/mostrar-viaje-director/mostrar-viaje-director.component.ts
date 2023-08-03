/* Cambiar todo el codigo, crear nueva peticion en el back en base a este query

SELECT authorized.*, ptrv_heads.*, (SELECT SUM(loc_amount) FROM zfi_gv_paper_general WHERE reinr COLLATE utf8mb4_general_ci = ptrv_heads.reinr COLLATE utf8mb4_general_ci) AS total_loc_amount, (SELECT area_id FROM users WHERE PERNR = ptrv_heads.pernr) AS AREA_ID FROM authorized JOIN ptrv_heads ON authorized.reinr = ptrv_heads.reinr WHERE ptrv_heads.reinr = 1234564;

En el cual solo sustituiremos el reinr pasandolo como parametro para traer toda la info 

De lado del front reutilizaremos las alertas las cuales son:
{
  si el viaje aun no esta cerrado,
  si el viaje ya fue aprobado
}

Crear nuevas alertas
{
  si el viaje no le pertenece a la autorización del director logeado,
  si el viaje es internacional y el director logeado es el segundo autorizador pero en la primera autorizacion aun no esta hecha
  si el viaje es nacional y el director logeado es el primero autorizador (Indicar que el viaje solo falta la segunda autorizacion)
}
*/

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { isEmpty } from 'rxjs';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

interface info
{
AREA_ID: number;
auth: number;
closeTrip: number;
created_at: string;
datb1: string;
date: string;
date1: string;
date2: string;
datv1: string;
hrgio: string;
id: number;
id_auth: number;
kunde: string;
pernr: string;
pernr_auth1: number;
pernr_auth2: number;
reinr: string;
schem: string;
time1: string;
time2: string;
times: string;
total_loc_amount: number;
uhrb1: string;
uhrv1: string;
uname: string;
updated_at: string;
zland: string;
zort1: string;
}

interface infoUser
{
area: string;
area_id: number;
lastname: string;
name: string;
nickname: string;
puesto: string;
rol_id: number;
}

interface userLogg
{
  PERNR: number;
}

@Component({
  selector: 'app-mostrar-viaje-director',
  templateUrl: './mostrar-viaje-director.component.html',
  styleUrls: ['./mostrar-viaje-director.component.css']
})
export class MostrarViajeDirectorComponent implements OnInit{

  approve1 = 'none';
  approve2 = 'none';
  approve3 = 'none';

  AREA_ID!: number;
  authorized!: number;
  closeTrip!: number;
  created_at!: string;
  datb1!: string;
  date!: string;
  date1!: string;
  date2!: string;
  datv1!: string;
  hrgio!: string;
  idHead!: number;
  id_auth!: number;
  kunde!: string;
  pernr!: string;
  pernr_auth1!: number;
  pernr_auth2!: number;
  reinr!: string;
  schem!: string;
  time1!: string;
  time2!: string;
  times!: string;
  total_loc_amount!: number;
  uhrb1!: string;
  uhrv1!: string;
  uname!: string;
  updated_at!: string;
  zland!: string;
  zort1!: string;

  area!: string;
  area_id!: number;
  lastname!: string;
  name!: string;
  nickname!: string;
  puesto!: string;
  rol_id!: number;

  nameDirector: string = '';
  pernrDirector!: number;

  emailV: any = {}
  emailD: any = {}
  emailA: any = {}

  ptrv_head: any = {}
  authorizedPatch: any = {}

  fechaActual!: string;
  horaActual!: string;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.errLog()
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.getInfoTrip(params['id'])
        })

        this.auth.user$.subscribe(userData => {
          this.nameDirector = String(userData?.name)
          const nickname = String(userData?.nickname);
          this.getUserDataLogg(nickname)
        })

      }
    })
  }

  getUserDataLogg(nickname: string)
  {
    this.http.get<userLogg>('http://localhost:3000/USERS/' + nickname).subscribe(dataUser => {
      this.pernrDirector = dataUser?.PERNR;
    })
  }

  getInfoTrip(idHead: number)
  {
    this.http.get<info>('http://localhost:3000/getMostrar_viajeAuth/' + idHead).subscribe(data => {
      
    this.AREA_ID = data.AREA_ID;
    this.authorized = data.auth;
    this.closeTrip = data.closeTrip;
    this.created_at = data.created_at;
    this.datb1 = data.datb1;
    this.date = data.date;
    this.date1 = data.date1;
    this.date2 = data.date2;
    this.datv1 = data.datv1;
    this.hrgio = data.hrgio;
    this.idHead = data.id;
    this.id_auth = data.id_auth;
    this.kunde = data.kunde;
    this.pernr = data.pernr;
    this.pernr_auth1 = data.pernr_auth1;
    this.pernr_auth2 = data.pernr_auth2;
    this.reinr = data.reinr;
    this.schem = data.schem;
    this.time1 = data.time1;
    this.time2 = data.time2;
    this.times = data.times;
    this.total_loc_amount = data.total_loc_amount;
    this.uhrb1 = data.uhrb1;
    this.uhrv1 = data.uhrv1;
    this.uname = data.uname;
    this.updated_at = data.updated_at;
    this.zland = data.zland;
    this.zort1 = data.zort1;

    this.getDataUser(data.pernr)

      if(data.closeTrip === 0)
      {
        this.approve1 = 'none';
        this.approve2 = 'none';
        this.approve3 = 'block';
      
      }else if(data.closeTrip === 1 && data.auth === 0 || data.auth === 2)
      {
        this.approve1 = 'block';
        this.approve2 = 'none';
        this.approve3 = 'none';

      }else if(data.auth === 1 && data.closeTrip === 1 || data.closeTrip === 1)
      {
        this.approve1 = 'none';
        this.approve2 = 'block';
        this.approve3 = 'none';
      } 
    })
  }


  getDataUser(pernr: string)
  {
    this.http.get<infoUser>('http://localhost:3000/User/' + pernr).subscribe(data => {
      this.area = data.area;
      this.area_id = data.area_id;
      this.lastname = data.lastname;
      this.name = data.name;
      this.nickname = data.nickname;
      this.puesto = data.puesto;
      this.rol_id = data.rol_id;
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

  aprobar1()
  {

    if(this.schem == '01')
    {
      if(this.pernr_auth1 == this.pernrDirector)
      {
        //console.log('El usuario logeado si se ecuentra identificado dentro del viaje y puede aprobar directmente')

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
            const messageV = 'Tu viaje ' + this.reinr + ' ya fue aprobado por ' + this.nameDirector + ' y ya se encuentra en proceso de aprobación de gastos de viaje';
            const messageA = 'El viaje ' + this.reinr + ' del usuario ' + this.name + ' ya fue aprobado a nivel cabezera por ' + this.nameDirector + ', ya puedes aprobar sus gastos de viaje';

            this.ptrv_head = {
              auth: 1
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
            
            this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
              if(head)
              {

                this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
                  if(email_v)
                  {

                    this.http.post('http://localhost:3000/EmailA', this.emailA).subscribe(email_a => {
                      if(email_a)
                      {

                        this.http.patch('http://localhost:3000/authorized/' + this.id_auth, this.authorizedPatch).subscribe(auth_patch => {
                          if(auth_patch)
                          {

                            this.true()

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

          }else if(result.isDenied)
          {
            const messageV = 'Lo sentiemos, el usuario ' + this.nameDirector + ' no aprobó tu viaje, te sugerimos que revises todos los datos.';

            this.emailV = {
              pernr: this.pernr,
              reinr: this.reinr,
              message: messageV
            }

            this.ptrv_head = {
              auth: 2,
              closeTrip: 0
            }

            try{

              this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
                if(head)
                {

                  this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
                    if(email_v)
                    {

                      this.false()

                    }else { console.log('ERRROR en EMAIL_V') }
                  })

                }else { console.log('ERROR en HEAD') }
              })

            }catch(err)
            {
              this.failed()
            }

          }
        })

      }else
      {
        //console.log('El usuario logeado no tiene permitido aprobar el viaje')

        Swal.fire({
          icon: 'info',
          iconColor: 'blue',
          title: 'No tienes permisos para autorizar este viaje',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'purple'
        }).then(res => {
          if(res.isConfirmed)
          {
            this.router.navigate(['Director/Pendientes'])
          }
        })
      }

    }else if(this.schem == '02')
    {
      if(this.pernr_auth1 == this.pernrDirector && this.date1 == '' && this.time1 == '')
      {
        //console.log('El usuario logeado si puede aprobar el viaje pero solo en la primera autorizacion \n Se debe ejecutar la sentencia para el msj al segundo aprobador')
        Swal.fire({
          title: '¿Aprobar viaje INTERNACIONAL?',
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

            const messageD = 'El usuario ' + this.nameDirector + ' aprobó la primera autorización del viaje internacional: ' + this.reinr + ' del usuario: ' + this.name + ', ahora el viaje se encuentra en la segunda aprobación.'

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

            this.http.post('http://localhost:3000/EmailD', this.emailD).subscribe(email_d => {
              if(email_d)
              {

                this.http.patch('http://localhost:3000/authorized/' + this.id_auth, this.authorizedPatch).subscribe(auth_patch => {
                  if(auth_patch)
                  {

                    Swal.fire({
                      icon: 'success',
                      title: 'Se ha aprobado la primera autorización del viaje internacional',
                      text: 'Informando al usuario correspondiente para la segunda autorización.',
                      showCancelButton: false,
                      showConfirmButton: true,
                      confirmButtonColor: 'purple'
                    }).then(res => {
                      this.reload()
                    })

                  }else { console.log('ERROR en AUTH_PATCH') }
                })

              }else { console.log('ERROR en EMAIL_D') }
            })

          }catch(err)
          {
            this.failed()
          }

          }else if(result.isDenied)
          {

            const messageV = 'Lo sentiemos, el usuario ' + this.nameDirector + ' no aprobó tu viaje, te sugerimos que revises todos los datos.';

            this.emailV = {
              pernr: this.pernr,
              reinr: this.reinr,
              message: messageV
            }

            this.ptrv_head = {
              auth: 2,
              closeTrip: 0
            }

            try{

              this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
                if(head)
                {

                  this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
                    if(email_v)
                    {

                      this.false()

                    }else { console.log('ERRROR en EMAIL_V') }
                  })

                }else { console.log('ERROR en HEAD') }
              })

            }catch(err)
            {
              this.failed()
            }


          }
        })
      
      }else if(this.pernr_auth1 == this.pernrDirector && this.date1 !== undefined && this.time1 !== undefined)
      {
        Swal.fire({
          icon: 'info',
          title: 'Este viaje ya fue aprobado en la primera autorización y el usuario correspondiente para la segunda aprobación ya fue notificado.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'purple'
        }).then(res => {
          if(res.isConfirmed)
          {
            this.reload()
          }
        })
      }
      
      else if(this.pernr_auth2 == this.pernrDirector)
      {
        //console.log('El usuario si tiene permitido aprobar el viaje pero debe comprobar si el campo de la primera aprobación ya fue capturado si no no puede hacer nada')
      
        if(this.pernr_auth2 == this.pernrDirector && this.date1 == '' && this.time1 == '')
        {
          Swal.fire({
            icon: 'warning',
            title: 'Este Viaje aún no ha sido aprobado en la primera autorización, intentelo más tarde.',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: 'purple'
          }).then(res => {
            if(res.isConfirmed)
            {
              this.reload()
            }
          })
        }else if(this.pernr_auth2 == this.pernrDirector && this.date1 !== undefined && this.time1 !== undefined)
        {
          Swal.fire({
            title: '¿Aprobar viaje INTERNACIONAL?',
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

              const messageV = 'Tu viaje internacional: ' + this.reinr + ' ya fue aprobado a nivel cabezera y ahora se encuentra en proceso de aprobación en gastos de viaje.';
              const messageA = 'El viaje internacional: ' + this.reinr + ' ya fue aprobado a nivel cabezera por ambas autorizaciones, los gastos del viaje ya pueden ser aprobados.';

              this.ptrv_head = {
                auth: 1
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
              
              this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
                if(head)
                {
  
                  this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
                    if(email_v)
                    {
  
                      this.http.post('http://localhost:3000/EmailA', this.emailA).subscribe(email_a => {
                        if(email_a)
                        {
  
                          this.http.patch('http://localhost:3000/authorized/' + this.id_auth, this.authorizedPatch).subscribe(auth_patch => {
                            if(auth_patch)
                            {
  
                              this.true()
  
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

            }else if(result.isDenied)
            {
              const messageV = 'Lo sentimos su viaje no fue aprobado, le sugerimos corregir sus datos'

              this.emailV = {
                pernr: this.pernr,
                reinr: this.reinr,
                message: messageV
              }
  
              this.ptrv_head = {
                auth: 2,
                closeTrip: 0
              }

              this.authorizedPatch = {
                date1: '',
                time1: ''
              }
  
              try{
  
                this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(head => {
                  if(head)
                  {
  
                    this.http.post('http://localhost:3000/EmailV', this.emailV).subscribe(email_v => {
                      if(email_v)
                      {
                        
                        this.http.patch('http://localhost:3000/authorized/' + this.id_auth, this.authorizedPatch).subscribe(a => {
                          if(a)
                          {
                            this.false()
                          }else { console.log('ERROR en AUTH_PATCH') }
                        })
  
                      }else { console.log('ERRROR en EMAIL_V') }
                    })
  
                  }else { console.log('ERROR en HEAD') }
                })
  
              }catch(err)
              {
                this.failed()
              }
  

            }
          })
        }

      }else
      {
        
        Swal.fire({
          icon: 'info',
          iconColor: 'blue',
          title: 'No tienes permisos para autorizar este viaje',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'purple'
        }).then(res => {
          if(res.isConfirmed)
          {
            this.router.navigate(['Director/Pendientes'])
          }
        })

      } 
    }
    
   /* let timerInterval=0;
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
        const messageA = 'El viaje: ' + this.reinr + ' del usuario: ' + this.pernr + ' fue aprobado por el director: ' + this.nameDirector + ', ahora puedes aprobar sus gastos de viaje.';

        this.emailV =
        {
          pernr: this.pernr,
          reinr:  this.reinr,
          message: messageV
        }

        this.emailA =
        {
          pernr: this.pernr,
          reinr: this.reinr,
          message: messageA
        } 

        this.ptrv_head =
        {
          auth: 1
        } 

        try
        {
        
        }catch(err)
      {
        this.failed()
      }
        
      
      
      }else if(result.isDenied)
      {
        const messageV = 'Tu viaje a nivel cabecera fue rechazado por el director de tu area: ' + this.nameDirector + ', valida toda la información que capturas.';

        this.emailV =
        {
          pernr: this.pernr,
          reinr:  this.reinr,
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
            this.http.patch('http://localhost:3000/PTRV_HEADS/' + this.idHead, this.ptrv_head).subscribe(resH => {
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
    */
  }

  true()
  {
    const timerInterval = 0;

    Swal.fire({
      icon: 'success',
      title: 'Viaje aprobado',
      text: 'Informando al usuario Viajero y al usuario Administrador',
      timer: 3500,
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

  failed()
  {
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos, ocurrio un error durante el proceso de aprobación, vuelve a intentar'
    })
  }

  gastos(idHead: number)
  {
    this.router.navigate(["/Director/Gastos"], {queryParams: {id:idHead}})
  }

  aprobar2()
  {
    Swal.fire({
      icon: 'info',
      title: 'Este viaje ya fue aprobado',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'purple'
    })
  }

  aprobar3()
  {
    Swal.fire({
      icon: 'error',
      iconColor: 'orange',
      title: 'Este viaje aun no está listo para ser aprobado',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'purple'
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
