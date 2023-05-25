import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent implements AfterViewInit {

  fechaActual?: string;
  fechaPasada?: string;

  constructor(private router:Router){}

  ngAfterViewInit(): void {
    this.obtenerFecha();
    this.obtenerFechaHaceUnaSemana();
  }

  

  obtenerFecha()
      {
        // yyyy-mm-dd
        
        const fechaActual = new Date();
        const day = fechaActual.getDate();
        const month = fechaActual.getMonth() + 1;
        const year = fechaActual.getFullYear();

        if(fechaActual)
        {
          this.fechaActual = `${year}-${this.agregarcerosizquierda(month)}-${this.agregarcerosizquierda(day)}`;
          console.log(fechaActual)
        }

        

      }


      obtenerFechaHaceUnaSemana()
      {
        const fechaActual = new Date();
        const fechaPasada = new Date(fechaActual.getTime() - 7 * 24 * 60 * 60 * 1000)

        const day = fechaPasada.getDate();
        const month = fechaPasada.getMonth() + 1;
        const year = fechaPasada.getFullYear();

        this.fechaPasada = `${year}-${this.agregarcerosizquierda(month)}-${this.agregarcerosizquierda(day)}`;
        
      }

      agregarcerosizquierda(valor: number): string
      {
        return valor < 10 ? `0${valor}`: valor.toString();
      }


  email()
  {
    const div1 = document.getElementById('div1');

    const title = document.querySelector('.title')?.textContent;
    const text = document.querySelector('.text')?.textContent;
    const detail = document.querySelector('.detail')?.textContent;

    const titleText = String(title);
    const textText = String(text);
    const detailText = String(detail);

    let timerInterval=0;

    Swal.fire({
      title: titleText,
      text: (textText && detailText),
      showConfirmButton: true,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Consultar viaje',
      showDenyButton: true,
      denyButtonColor: 'blue',
      denyButtonText: 'Ok',
      showCancelButton: false
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.router.navigate(["/Administrador/Viaje"])
           
      }else if(result.isDenied)
          {
            if(div1)
            {
            div1.style.backgroundColor='rgba(0, 0, 0, 0.192)';
            }
          }
          })
      }
    
      
      
}
