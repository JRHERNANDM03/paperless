import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-other-numero-viaje',
  templateUrl: './other-numero-viaje.component.html',
  styleUrls: ['./other-numero-viaje.component.css']
})
export class OtherNumeroViajeComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){}
    })
  }

  styleDisplay = 'none';

  listar()
  {
    this.styleDisplay='block';
  }

  

}
