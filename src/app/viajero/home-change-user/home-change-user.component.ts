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
  pernrLoggeado!: number;

  constructor (private router:Router, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAutenticate => {
      if(!isAutenticate)
      {
        this.router.navigate(['login'])
      }else if(isAutenticate)
      {
        this.auth.user$.subscribe(infoUser => {
          this.http.get<user>('http://localhost:3000/USERS/'+ infoUser?.nickname).subscribe(dataUser => {
            this.pernrLoggeado = dataUser.PERNR;
          })
        })
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
        
        if(this.pernrLoggeado !== this.numeroEmpleado){

          let timerInterval = 0;

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Cambiando de usuario',
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if(result.dismiss === Swal.DismissReason.timer){
               /* Read more about handling dismissals below */
              //this.router.navigate(['/otherUser/Home'], {queryParams: {pernr:this.numeroEmpleado}})
               window.location.href="/otherUser/Home?pernr="+this.numeroEmpleado
            }
          });

        }else{
          Swal.fire({
            icon: 'error',
            title: 'No puedes ingresar al mismo usuario logeado!',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: 'purple'
          }).then( res => {
            if(res.isConfirmed)
            {
              location.reload()
            }
          })
        }

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

   
