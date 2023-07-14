import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


interface UserData {
  rol_id: string;
  // Otros campos que esperas en los datos de respuesta
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit{


  constructor(private router: Router, public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticate => {
      if(isAuthenticate)
      {
        //this.router.navigate(['/Viajero/Home'])
          this.auth.user$.subscribe(user => {
            const userEmail = user?.email;
            const userName = String(user?.name);
            const nickname = String(user?.nickname);
            //console.log("El email del usuario logeado es: "+userEmail);
            if(userEmail?.endsWith('@liverpool.com.mx'))
            {
              //console.log("Acesso concedido");
              this.alerta(nickname)
            }
            else
            {
              //console.log("Acesso denegado");
              this.failed()
            }
          })        
      }
    })

  }

alerta(nickname: String){
 let timerInterval=0;
 Swal.fire({
  icon: 'success',
  title: 'Acceso correcto!',
  text: 'Bienvenid@ 👍',
  timer: 2500,
timerProgressBar: true,
showConfirmButton: false,

willClose: () => {
  clearInterval(timerInterval)
}
}).then((result) => {
/* Read more about handling dismissals below */
if (result.dismiss === Swal.DismissReason.timer) 
{
  const id = nickname;
  this.getData(id)
}
})

}

login()
{
  this.auth.loginWithRedirect()
}

failed()
{
  Swal.fire({
    icon: 'error',
    title: 'Acceso denegado',
    text: 'Solo tendrás acceso si tienes una cuenta con dominio "@LIVERPOOL.COM.MX"',
    footer: 'Si el error persiste o no te deja cambiar de cuenta, te sugerimos borrar el caché y las cookies de tu navegador.',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: 'purple'
  }).then((result) => {
    if(result.isConfirmed)
    {
      this.auth.logout()
    }
  })
}




getData(id: String) {
  const nickname = id;
    this.http.get<UserData>('http://localhost:3000/USERS/' + nickname).subscribe(
      data => {
        if(data.rol_id == '1')
        {
          this.router.navigate(['/Viajero/Home'])
        }else if(data.rol_id == '2')
        {
          this.router.navigate(['/Director/Home'])
        }else if(data.rol_id == '3')
        {
          this.router.navigate(['/Administrador/Home'])
        }
      });
}


}
