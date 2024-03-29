import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';
import { ServiceService } from 'src/app/Service/service.service';


interface user
{
  name: string;
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
  selector: 'app-other-estado',
  templateUrl: './other-estado.component.html',
  styleUrls: ['./other-estado.component.css']
})
export class OtherEstadoComponent implements OnInit {

  pernr!: number;
  name!: string;
  
  styleDisplay = 'none';

  styleDisplay1 = 'none';
  styleDisplay2 = 'none';
  styleDisplay3 = 'none';

  recivedData: any;

  url:any;

  constructor(private router: Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}
  
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        const service = new ServiceService();
        this.url = service.url();
        
        /*this.route.queryParams.subscribe(params => {
          this.pernr = params['pernr'];
          this.getInfoUser(this.pernr)
    })*/

    this.recivedData = this.sharedDataService.getData()

        if(this.recivedData)
        {
          this.pernr = this.recivedData.pernr;
          this.getInfoUser(this.pernr)

        }else{
          const localStorageData = localStorage.getItem('DataHomeFilter1-otherUser');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        this.pernr = parsedData.pernr;
          this.getInfoUser(this.pernr)
        }}

  }

})
  
}

  getInfoUser(pernr: number)
{
  this.http.get<user>(this.url+'User/' + pernr).subscribe(data => {
    this.name = data.name;
  })
}


responseArray1: ptrv_headP[] = [];
responseArray2: ptrv_headA[] = [];
responseArray3: ptrv_headR[] = [];

authorized!: number[];

getTRIPP()
{
  this.http.get<ptrv_headP[]>(this.url+'PTRV_HEADS/filter/authP/' + this.pernr).subscribe(pendientes => {
    this.responseArray1 = pendientes;
    this.authorized = pendientes.map(item => item.auth);
  })
  this.btnPendiente()
}

getTRIPA()
{
  this.http.get<ptrv_headA[]>(this.url+'PTRV_HEADS/filter/authA/' + this.pernr).subscribe(autorizados => {
    this.responseArray2 = autorizados;
    this.authorized = autorizados.map(item => item.auth);
  })
  this.btnAprovado()
}

getTRIPR()
{
  this.http.get<ptrv_headR[]>(this.url+'PTRV_HEADS/filter/authR/' + this.pernr).subscribe(rechazados => {
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

  tripDetail(id: number)
      {
        //this.router.navigate(['/otherUser/Viaje'], {queryParams: {id: id, pernr: this.pernr} });

        const data = {id: id, pernr: this.pernr};

    this.sharedDataService.setData(data);
     //console.log('Datos establecidos en el servicio:', data);
  
     localStorage.setItem('DataHome-otherUser', JSON.stringify(data)); // Guardar en localStorage
  
     // Navegar a la otra vista después de establecer los datos
     this.router.navigate(['/otherUser/Viaje']);
      }

      filter1(pernr: number)
      {
        const data = {pernr: pernr};
      
         this.sharedDataService.setData(data);
          //console.log('Datos establecidos en el servicio:', data);
      
          localStorage.setItem('DataHomeFilter1-otherUser', JSON.stringify(data)); // Guardar en localStorage
      
          // Navegar a la otra vista después de establecer los datos
          window.location.href='/otherUser/Filtros/NumeroViaje';
      }
      
      filter2(pernr: number)
      {
        const data = {pernr: pernr};
      
         this.sharedDataService.setData(data);
          //console.log('Datos establecidos en el servicio:', data);
      
          localStorage.setItem('DataHomeFilter2-otherUser', JSON.stringify(data)); // Guardar en localStorage
      
          // Navegar a la otra vista después de establecer los datos
          window.location.href='/otherUser/Filtros/Fecha';
      
      }
      
      filter3(pernr: number)
      {
        const data = {pernr: pernr};
      
         this.sharedDataService.setData(data);
          //console.log('Datos establecidos en el servicio:', data);
      
          localStorage.setItem('DataHomeFilter3-otherUser', JSON.stringify(data)); // Guardar en localStorage
      
          // Navegar a la otra vista después de establecer los datos
          window.location.href='/otherUser/Filtros/Estado';
      
      }

}
