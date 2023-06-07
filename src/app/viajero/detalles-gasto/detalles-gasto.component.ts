import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-detalles-gasto',
  templateUrl: './detalles-gasto.component.html',
  styleUrls: ['./detalles-gasto.component.css']
})
export class DetallesGastoComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate)
      {

      }
    })
  }

  logout()
  {
    this.auth.logout()
  }
}
