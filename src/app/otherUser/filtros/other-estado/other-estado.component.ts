import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-other-estado',
  templateUrl: './other-estado.component.html',
  styleUrls: ['./other-estado.component.css']
})
export class OtherEstadoComponent implements OnInit {

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

  listarPendient()
  {
    var btnPendient = document.querySelector('.listarPendient');
      var titleList = document.querySelector('.titleList');
      var cardsP = document.querySelector('#cardsP');

    var htmlBtn = btnPendient?.textContent;
    console.log(htmlBtn);

    if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.styleDisplay='block';
  }

  listarAprovate()
  {
    var btnAprovate = document.querySelector('.listarAprovate');
      var titleList = document.querySelector('.titleList');

      var htmlBtn = btnAprovate?.textContent;
      console.log(htmlBtn);

      if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }

    this.styleDisplay='none';
  }

  listarDeclain()
  {
    var btnDeclain = document.querySelector('.listarDeclain');
      var titleList = document.querySelector('.titleList');

      var htmlBtn = btnDeclain?.textContent;
      console.log(htmlBtn);

      if(titleList && htmlBtn)
    {
      titleList.textContent = htmlBtn;
    }
  }
}
