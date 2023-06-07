import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-detalle-gasto-other-user',
  templateUrl: './detalle-gasto-other-user.component.html',
  styleUrls: ['./detalle-gasto-other-user.component.css']
})
export class DetalleGastoOtherUserComponent implements OnInit {

  constructor (private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){}
    })
  }

  viewFile()
  {
    this.router.navigate(['/showFile'])
  }

}
