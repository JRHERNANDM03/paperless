import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';
import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

interface user
{
  area_id: number;
  rol_id: number;
}

interface ptrv_head
{
  PERNR: number;
  area: string;
  area_id: number;
  auth: number;
  closeTrip: number;
  created_at: string;
  datb1: string;
  date: string;
  datv1: string;
  hrgio: string;
  id: number;
  kunde: string;
  lastname: string;
  name: string;
  nickname: string;
  pernr: string;
  puesto: string;
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
}


@Component({
  selector: 'app-d-estado',
  templateUrl: './d-estado.component.html',
  styleUrls: ['./d-estado.component.css']
})
export class DEstadoComponent implements OnInit{
  
  nickname!: string;

  areaID!: number;
  
  styleDisplay = 'none';
  styleDisplay2 = 'none';
  styleDisplay3 = 'none';

  responseArray1: ptrv_head[] = [];
  authorized!: number[];

  url:any;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.auth.logout()
      }else if(isAuthenticate){
        const service = new ServiceService();
        this.url = service.url();
        
        this.auth.user$.subscribe(infoUser => {
          this.nickname = String(infoUser?.nickname)
          this.getInfoUser(this.nickname)
        })
      }
    })
  }

  getInfoUser(nickname: string)
  {
    this.http.get<user>(this.url+'USERS/' + nickname).subscribe(data => {

      if(data.rol_id != 2)
      {
        window.location.href='/access_error';
      }

      this.areaID = data.area_id
    })
  }


  listarPendient()
  {
    var btnPendient = document.querySelector('.listarPendient');
      var titleList = document.querySelector('.titleList');
      var cardsP = document.querySelector('#cardsP');

    var htmlBtn = btnPendient?.textContent;
    //console.log(htmlBtn);

    if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.http.get<ptrv_head[]>(this.url+'PTRV_HEADS/filter/statusp/' + this.areaID).subscribe(data => {
      if(data.length === 0)
      {
        this.notdata()
      }
      else
      {
        this.responseArray1 = data;
        this.authorized = data.map(item => item.auth);
      }
    })

    this.styleDisplay='block';
    this.styleDisplay2='none';
    this.styleDisplay3='none';
  }

  listarAprovate()
  {
    var btnAprovate = document.querySelector('.listarAprovate');
      var titleList = document.querySelector('.titleList');

      var htmlBtn = btnAprovate?.textContent;
    //  console.log(htmlBtn);

      if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.http.get<ptrv_head[]>(this.url+'PTRV_HEADS/filter/statusa/' + this.areaID).subscribe(data => {
      if(data.length === 0)
      {
        this.notdata()
      }
      else
      {
        this.responseArray1 = data;
        this.authorized = data.map(item => item.auth);
      }
    })

    this.styleDisplay2='block';
    this.styleDisplay='none';
    this.styleDisplay3='none';
  }

  listarDeclain()
  {
    var btnDeclain = document.querySelector('.listarDeclain');
      var titleList = document.querySelector('.titleList');

      var htmlBtn = btnDeclain?.textContent;
    //  console.log(htmlBtn);

      if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.http.get<ptrv_head[]>(this.url+'PTRV_HEADS/filter/statusr/' + this.areaID).subscribe(data => {
      if(data.length === 0)
      {
        this.notdata()
      }
      else
      {
        this.responseArray1 = data;
        this.authorized = data.map(item => item.auth);
      }
    })

    this.styleDisplay3='block';
    this.styleDisplay='none';
    this.styleDisplay2='none';
  }


notdata()
{
  Swal.fire({
    icon: 'info',
    title: 'No hay registros'
  })
}

showExpense1(id: number)
  {
    //this.router.navigate(['/Director/Viaje'], {queryParams: {id: id} });

    const data = {id: id};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomePendientes-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Viaje';
  }

  showExpense2(id: number)
  {
    //this.router.navigate(['/Director/Viaje'], {queryParams: {id: id} });

    const data = {id: id};

   this.sharedDataService.setData(data);
    //console.log('Datos establecidos en el servicio:', data);

    localStorage.setItem('DataHomePendientes-Director', JSON.stringify(data)); // Guardar en localStorage

    // Navegar a la otra vista después de establecer los datos
    window.location.href='/Director/Viaje';
  }

  showExpense3(id: number)
  {
    //this.router.navigate(['/Director/Viaje'], {queryParams: {id: id} });

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
}
