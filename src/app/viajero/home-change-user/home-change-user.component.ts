import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { timeInterval } from 'rxjs';
import Swal from 'sweetalert2';

interface user
{
  PERNR: number;
}


@Component({
  selector: 'app-home-change-user',
  templateUrl: './home-change-user.component.html',
  styleUrls: ['./home-change-user.component.css']
})
export class HomeChangeUserComponent implements OnInit {

  numeroEmpleado!: number;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

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

  formValid(): boolean {
    // Verificar si los campos requeridos están llenados
    if (
      
      this.numeroEmpleado
    ) {
      return true; // Todos los campos están llenados
    } else {
      return false; // Al menos un campo requerido está vacío
    }
  }

  submitForm() 
  {
    let timerInterval = 0;
    this.http.get('http://localhost:3000/User/' + this.numeroEmpleado).subscribe(data => 
    {
      if(data)
      {
        Swal.fire({
          icon: 'success',
          title: 'Ingresando....',
          text: 'Cambiando de usuario',
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
          willClose: () => {
            clearInterval(timerInterval)
          }
          }).then((result) => {
          /* Read more about handling dismissals below */
            this.router.navigate(['/otherUser/Home'], {queryParams: {pernr:this.numeroEmpleado}})
          })
      }else
      {
        console.log('User dont found')
      }
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'El usuario no existe!'
      })
    }
    );
  }


  /* /otherUser/Home */

}

   
