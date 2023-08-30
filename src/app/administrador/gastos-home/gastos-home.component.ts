import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';
import Swal from 'sweetalert2';

interface dataTrip{
  auth: number;
  closeTrip: number;
  created_at: string;
  datb1: string;
  date: string;
  datv1: string;
  final_approval: number;
  hrgio: string;
  id: number;
  kunde: string;
  pernr: string;
  reinr: string;
  schem: string;
  times: string;
  uhrb1: string;
  uhrv1: string;
  uname: string;
  updated_at: string;
  zland: string;
  zort1: string;
}

@Component({
  selector: 'app-gastos-home',
  templateUrl: './gastos-home.component.html',
  styleUrls: ['./gastos-home.component.css']
})
export class GastosHomeComponent  implements OnInit{

  constructor(public auth: AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private sharedDataService: SharedDataService){}

  responseArray: dataTrip[] = [];
 
  authorized!: number[];

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        this.getTrip()
      }
    })
  }

  getTrip()
  {
    this.http.get<dataTrip[]>('http://localhost:3000/Trip_finalApproval').subscribe(data => {
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

detailTrip(idHead: number)
{
  //this.router.navigate(['/Administrador/Viaje'], {queryParams: {id: idHead}})
  const data = {id: idHead}

  this.sharedDataService.setData(data);
  //console.log('Datos establecidos en el servicio:', data);
        
  localStorage.setItem('DataAnswer-Administrador', JSON.stringify(data)); // Guardar en localStorage
        
  // Navegar a la otra vista después de establecer los datos
  window.location.href='/Administrador/Viaje';
}

}
