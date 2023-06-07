import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router){}

  styleDisplay = 'none';

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

  listar()
  {
    this.styleDisplay='block';
  }

}
