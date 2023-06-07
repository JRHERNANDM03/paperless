import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home-other-user',
  templateUrl: './home-other-user.component.html',
  styleUrls: ['./home-other-user.component.css']
})
export class HomeOtherUserComponent implements OnInit {

  constructor (private router:Router, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(!isAuthenticate)
      {
        this.router.navigate(['login'])
      }else if(isAuthenticate){}
    })
  }


}
