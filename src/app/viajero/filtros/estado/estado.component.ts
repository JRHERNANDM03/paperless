import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router){}

styleDisplay1 = 'none';
styleDisplay2 = 'none';
styleDisplay3 = 'none';

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


  btnPendiente()
  {

    var text = document.querySelector('.pendiente');
    var title = document.querySelector('.title');
    

    var htmlBtn = text?.textContent;

    console.log(htmlBtn );

    if(title && htmlBtn)
    {
      title.textContent=htmlBtn;
    }

    this.styleDisplay1 = 'block';
    this.styleDisplay2 = 'none';
    this.styleDisplay3 = 'none';
  }

  btnAprovado()
  {

    var text = document.querySelector('.aprovado');
    var title = document.querySelector('.title');

    var htmlBtn = text?.textContent;

    if(title && htmlBtn)
    {
      title.textContent=htmlBtn;
    }

    this.styleDisplay1 = 'none';
    this.styleDisplay2 = 'block';
    this.styleDisplay3 = 'none';
  }

  btnRechazado()
  {

    var text = document.querySelector('.rechazado');
    var title = document.querySelector('.title');

    var htmlBtn = text?.textContent;

    if(title && htmlBtn)
    {
      title.textContent=htmlBtn;
    }

    this.styleDisplay1 = 'none';
    this.styleDisplay2 = 'none';
    this.styleDisplay3 = 'block';
  }

  logout()
  {
    this.auth.logout()
  }

}
