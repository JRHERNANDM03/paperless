import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';
import Swal from 'sweetalert2';

interface user
{
  name: string;
}

interface head 
{
  id: number;
  zort1: string;
  reinr: string;
  pernr: string;
  datv1: string;
  uhrv1: string;
  auth: number;
}

@Component({
  selector: 'app-other-numero-viaje',
  templateUrl: './other-numero-viaje.component.html',
  styleUrls: ['./other-numero-viaje.component.css']
})
export class OtherNumeroViajeComponent implements OnInit {

  pernr!: number;

  name!: string;
  
  reinrN: string = '';

idH!: number;
zort1: string = '';
reinrH: string = '';
pernrH!: string;
datv1: string = '';
uhrv1: string = '';
authorized!: number;

  styleDisplay = 'none';

  recivedData: any;

  constructor(private router: Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
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
  this.http.get<user>('http://localhost:3000/User/' + pernr).subscribe(data => {
    this.name = data.name;
  })
}

formValid(): boolean {
  // Verificar si los campos requeridos están llenados
  if (
    
    this.reinrN
  ) {
    return true; // Todos los campos están llenados
  } else {
    return false; // Al menos un campo requerido está vacío
  }
}

submitForm() {
  this.http.get<head>('http://localhost:3000/PTRV_HEAD/' + this.reinrN).subscribe(
    data => {
      if (data) {
        this.idH = data.id;
        this.zort1 = data.zort1;
        this.reinrH = data.reinr;
        this.pernrH = data.pernr;
        this.datv1 = data.datv1;
        this.uhrv1 = data.uhrv1;
        this.authorized = data.auth;

        //console.log('ID', data.id)

        this.validate(this.pernrH);
      } else {
        alert('No se encontraron registros.');
      }
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Problemas en la consulta'
      })
    }
  );
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


validate(pernrN: string)
{
  var new_pernr = Number(pernrN);
  var pernrOld = Number(this.pernr)
  if(new_pernr == pernrOld)
  {
    this.listar()
  }else{

    this.styleDisplay='none'
    Swal.fire({
      icon: 'error',
      title: 'Problemas en la consulta'
    })
  }
  
  
}

detail()
{
  //this.router.navigate(['/otherUser/Viaje'], {queryParams: {id:this.idH, pernr: this.pernr}})

  const data = {id: this.idH, pernr: this.pernr};

  this.sharedDataService.setData(data);
   //console.log('Datos establecidos en el servicio:', data);

   localStorage.setItem('DataHome-otherUser', JSON.stringify(data)); // Guardar en localStorage

   // Navegar a la otra vista después de establecer los datos
   this.router.navigate(['/otherUser/Viaje']);
}

listar()
{
  this.styleDisplay='block';
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
