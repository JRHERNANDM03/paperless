import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-other-fecha',
  templateUrl: './other-fecha.component.html',
  styleUrls: ['./other-fecha.component.css']
})
export class OtherFechaComponent implements OnInit {

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
