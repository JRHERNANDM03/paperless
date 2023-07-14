import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
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

  constructor(private router: Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.pernr = params['pernr'];
          this.getInfoUser(this.pernr)
        })
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
  if(new_pernr === pernrOld)
  {
    this.listar()
  }
  
  
}

detail()
{
  this.router.navigate(['/otherUser/Viaje'], {queryParams: {id:this.idH, pernr: this.pernr}})
}

listar()
{
  this.styleDisplay='block';
}

  

}
