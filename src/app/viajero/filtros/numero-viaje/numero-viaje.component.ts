import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-numero-viaje',
  templateUrl: './numero-viaje.component.html',
  styleUrls: ['./numero-viaje.component.css']
})
export class NumeroViajeComponent implements OnInit{

constructor(public auth:AuthService, private router: Router){}

styleDisplay = 'none';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAutenticate => {
      if(!isAutenticate)
      {
        this.router.navigate(['login'])
      }else if(isAutenticate)
      {

      }
    })
  }

  logout()
  {
    this.auth.logout()
  }

  listar()
  {
    this.styleDisplay='block'
  }

}
