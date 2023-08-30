import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';


import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/shared-data.service';

interface UserData {
  PERNR: string;
  // Otros campos que esperas en los datos de respuesta
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
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent implements OnInit {

  updateEmailA: any = {}
  selectedEmailIndex: number = -1;
  backgroundColor: string = 'rgba(0, 0, 0, 0.477)';

  emailsAmount: number = 0;


  fechaActual?: string;
  fechaPasada?: string;
  n_emp: string = '';
  n_viaje: string = '';
  sociedad: string = '';
  status: string = '1';
  date1: string = '';
  date2: string = '';

  constructor(private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.auth.user$.subscribe(user => {
          const nickname = String(user?.nickname);
          this.getData(nickname);     
        })
        this.obtenerFecha();
        this.obtenerFechaHaceUnaSemana();
      }
    })
  }

  

  getData(nickname: String)
{
  this.http.get<UserData>('http://localhost:3000/USERS/' + nickname).subscribe(data => {

  const pernr_user = Number(data.PERNR);
  this.getEmailsA(pernr_user)

  })
}

responseArrayEmails: emailsD[] = [];
 
  visibility_auth!: number[];

getEmailsA(pernr: number)
{
  this.http.get<emailsD[]>('http://localhost:3000/EmailsA').subscribe(data => {
    
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

getEmailsARequest(idEmailA: number, message: string, reinr: number, visibility: number, title: string, pernr: number)
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
      if(visibility != 1)
      {

      this.updateEmailA = {
        visibility: 1
      }
      this.http.patch('http://localhost:3000/EmailA/update/' + idEmailA, this.updateEmailA).subscribe(upd => {
        if(upd)
        {
          //this.router.navigate(['/Administrador/Viaje'], {queryParams: {id: idHead, reload: 1}})
          //window.location.href="/Administrador/Viaje?id="+idHead+""

          const data = {id: idHead}

          this.sharedDataService.setData(data);
          //console.log('Datos establecidos en el servicio:', data);
                
          localStorage.setItem('DataAnswer-Administrador', JSON.stringify(data)); // Guardar en localStorage
                
          // Navegar a la otra vista después de establecer los datos
          window.location.href='/Administrador/Viaje';
        }
      })

    }else{
      //this.router.navigate(['/Administrador/Viaje'], {queryParams: {id: idHead, reload: 1}})
      //window.location.href="/Administrador/Viaje?id="+idHead+""

      const data = {id: idHead}

      this.sharedDataService.setData(data);
      //console.log('Datos establecidos en el servicio:', data);
            
      localStorage.setItem('DataAnswer-Administrador', JSON.stringify(data)); // Guardar en localStorage
            
      // Navegar a la otra vista después de establecer los datos
      window.location.href='/Administrador/Viaje';
    }

    }else if(result.isDismissed)
    {

      if(visibility != 1)
      {
        this.updateEmailA = {
          visibility: 1
        }
        this.http.patch('http://localhost:3000/EmailA/update/' + idEmailA, this.updateEmailA).subscribe(upd => {
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
  

  obtenerFecha()
      {
        // yyyy-mm-dd
        
        const fechaActual = new Date();
        const day = fechaActual.getDate();
        const month = fechaActual.getMonth() + 1;
        const year = fechaActual.getFullYear();

        if(fechaActual)
        {
          this.fechaActual = `${year}-${this.agregarcerosizquierda(month)}-${this.agregarcerosizquierda(day)}`;
          console.log(fechaActual)
        }

        

      }


      obtenerFechaHaceUnaSemana()
      {
        const fechaActual = new Date();
        const fechaPasada = new Date(fechaActual.getTime() - 7 * 24 * 60 * 60 * 1000)

        const day = fechaPasada.getDate();
        const month = fechaPasada.getMonth() + 1;
        const year = fechaPasada.getFullYear();

        this.fechaPasada = `${year}-${this.agregarcerosizquierda(month)}-${this.agregarcerosizquierda(day)}`;
        
      }

      agregarcerosizquierda(valor: number): string
      {
        return valor < 10 ? `0${valor}`: valor.toString();
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
      confirmButtonColor: 'purple',
      confirmButtonText: 'Consultar viaje',
      showDenyButton: true,
      denyButtonColor: 'blue',
      denyButtonText: 'Ok',
      showCancelButton: false
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.router.navigate(["/Administrador/Viaje"])
           
      }else if(result.isDenied)
          {
            if(div1)
            {
            div1.style.backgroundColor='rgba(0, 0, 0, 0.192)';
            }
          }
          })
      }
    
      saveData()
      {

        const n_empString = this.n_emp.replace(/\s/g, '');
        const n_empArray = n_empString.split(',');

        const n_viajeString = this.n_viaje.replace(/\s/g, '');
        const n_viajeArray = n_viajeString.split(',');
        
        const n_sociedad = this.sociedad.replace(/\s/g, '');
        const sociedadArray = n_sociedad.split(',');

       let x=0;
       let a=0;
       let b=0;
       let c=0;

       for(x=0; x < n_empArray.length; x++)
       {
        if(n_empArray[x] !== '' && n_empArray[x])
        {
          a=a+1;
        }
       }
       //console.log(a)

       for(x=0; x < n_viajeArray.length; x++)
       {
        if(n_viajeArray[x] !== '')
        {
          b=b+1;
        }
       }
       //console.log(b)

       for(x=0; x < sociedadArray.length; x++)
       {
        if(sociedadArray[x] !== '')
        {
          c=c+1;
        }
       }
       //console.log(c)

       if(a==0 && b==0 && c==0){
        let timerInterval = 0;

        Swal.fire({
          title: 'Recuperando información...',
          html: '<div class="spinner-border text-primary" role="status">'+
          '<span class="visually-hidden">Loading...</span>'+
        '</div>',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: false,
        willClose: () => {
          clearInterval(timerInterval)
        }
        }).then((result) => {
          if(result.dismiss === Swal.DismissReason.timer)
          {
            //this.router.navigate(['/Administrador/Answer'], {queryParams: {n_empArray: n_empArray, n_viajeArray: n_viajeArray, sociedadArray: sociedadArray, status: this.status, date1: this.date1, date2: this.date2, lengthPERNR: a, lengthREINR: b, lengthSOCIETY: c}});
          
            const data = {n_empArray: n_empArray, n_viajeArray: n_viajeArray, sociedadArray: sociedadArray, status: this.status, date1: this.date1, date2: this.date2, lengthPERNR: a, lengthREINR: b, lengthSOCIETY: c}

            this.sharedDataService.setData(data);
            //console.log('Datos establecidos en el servicio:', data);
        
            localStorage.setItem('DataHomeAnswer-Administrador', JSON.stringify(data)); // Guardar en localStorage
        
            // Navegar a la otra vista después de establecer los datos
            window.location.href='/Administrador/Answer';
          }
        })
       }else if((a==1 || a==0) && (b==1 || b==0) && (c==1 || c==0) ){
        let timerInterval = 0;

        Swal.fire({
          title: 'Recuperando información...',
          html: '<div class="spinner-border text-primary" role="status">'+
          '<span class="visually-hidden">Loading...</span>'+
        '</div>',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: false,
        willClose: () => {
          clearInterval(timerInterval)
        }
        }).then((result) => {
          if(result.dismiss === Swal.DismissReason.timer)
          {
            //this.router.navigate(['/Administrador/Answer2'], {queryParams: {n_empArray: n_empArray, n_viajeArray: n_viajeArray, sociedadArray: sociedadArray, status: this.status, date1: this.date1, date2: this.date2, lengthPERNR: a, lengthREINR: b, lengthSOCIETY: c}});
            const data = {n_empArray: n_empArray, n_viajeArray: n_viajeArray, sociedadArray: sociedadArray, status: this.status, date1: this.date1, date2: this.date2, lengthPERNR: a, lengthREINR: b, lengthSOCIETY: c};

            this.sharedDataService.setData(data);
             //console.log('Datos establecidos en el servicio:', data);
         
             localStorage.setItem('DataHomeAnswer2-Administrador', JSON.stringify(data)); // Guardar en localStorage
         
             // Navegar a la otra vista después de establecer los datos
             window.location.href='/Administrador/Answer2';
          }
        })
       }else if((a>1 || a==0) && (b>1 || b==0) && (c>1 || c==0))
       {

        let timerInterval = 0;

        Swal.fire({
          title: 'Recuperando información...',
          html: '<div class="spinner-border text-primary" role="status">'+
          '<span class="visually-hidden">Loading...</span>'+
        '</div>',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: false,
        willClose: () => {
          clearInterval(timerInterval)
        }
        }).then((result) => {
          if(result.dismiss === Swal.DismissReason.timer)
          {
            //this.router.navigate(['/Administrador/Answer'], {queryParams: {n_empArray: n_empArray, n_viajeArray: n_viajeArray, sociedadArray: sociedadArray, status: this.status, date1: this.date1, date2: this.date2, lengthPERNR: a, lengthREINR: b, lengthSOCIETY: c}});
          
            const data = {n_empArray: n_empArray, n_viajeArray: n_viajeArray, sociedadArray: sociedadArray, status: this.status, date1: this.date1, date2: this.date2, lengthPERNR: a, lengthREINR: b, lengthSOCIETY: c}

            this.sharedDataService.setData(data);
            //console.log('Datos establecidos en el servicio:', data);
        
            localStorage.setItem('DataHomeAnswer-Administrador', JSON.stringify(data)); // Guardar en localStorage
        
            // Navegar a la otra vista después de establecer los datos
            window.location.href='/Administrador/Answer';
          
          }
        })


       }else{
        Swal.fire({
          icon: 'error',
          title: 'Este formulario acepta mas de un valor por campo!',
          text: 'Si su busqueda será limitada a un solo valor en un campo en especifico, te sugiero que los demás campos sean igual a un solo valor o se encuentren vacios.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'purple'
        }).then(result => {
          if(result.isConfirmed){
            location.reload()
          }
        })
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
}
