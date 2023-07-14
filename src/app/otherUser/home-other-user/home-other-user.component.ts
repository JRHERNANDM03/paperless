import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

interface user
{
  name: string;
  lastname: string;
  nickname: string;
}

interface PTRV_HEADS
{
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

@Component({
  selector: 'app-home-other-user',
  templateUrl: './home-other-user.component.html',
  styleUrls: ['./home-other-user.component.css']
})
export class HomeOtherUserComponent implements OnInit {

pernr!: number;

name!: string;
lastname!: string;
nickname!: string;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){
        this.route.queryParams.subscribe(params => {
          this.pernr = params['pernr'];
          this.getDataUser(this.pernr)
          this.getTrip(this.pernr)
        })
      }
    })
  }


  getDataUser(pernr: number)
  {
    this.http.get<user>('http://localhost:3000/User/' + pernr).subscribe(data => {
      this.name = data.name;
      this.lastname = data.lastname;
      this.nickname = data.nickname;
    })
  }

  responseArray: PTRV_HEADS[] = [];
 
  authorized!: number[];
  
  getTrip(pernr: number)
  {
    this.http.get<PTRV_HEADS[]>('http://localhost:3000/PTRV_HEADS/find/' + pernr).subscribe(data => {
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

  tripDetail(id: number)
{
  this.router.navigate(['/otherUser/Viaje'], {queryParams: {id: id, pernr: this.pernr} });
}
}
