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
  n_emp: string = '';
  name_emp: string = '';
  n_viaje: string = '';
  sociedad: string = '';

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
    
      saveData()
      {

        const n_empArray = this.n_emp.split(',');
        const name_empArray = this.name_emp.split(',');
        const n_viajeArray = this.n_viaje.split(',');
        const sociedadArray = this.sociedad.split(',');
        //const primerDato = n_empArray[0].trim()

        console.log("Imprimiendo valores de NUMERO DE EMPLEADO");
        console.log("n_empArray.length: " + n_empArray.length)
        for(let x=0; x < n_empArray.length; x++)
        {
          console.log(n_empArray[x].trim());
        }

        console.log("Imprimiendo valores de NOMBRE DE EMPLEADO");
        console.log("name_empArray.length: " + name_empArray.length)
        for(let x=0; x < name_empArray.length; x++)
        {
          console.log(name_empArray[x].trim());
        }

        console.log("Imprimiendo valores de NUMERO DE VIAJE");
        console.log("n_viajeArray.length: " + n_viajeArray.length)
        for(let x=0; x < n_viajeArray.length; x++)
        {
          console.log(n_viajeArray[x].trim());
        }

        console.log("Imprimiendo valores de SOCIEDAD");
        console.log("sociedadArray.length: " + sociedadArray.length)
        for(let x=0; x < sociedadArray.length; x++)
        {
          console.log(sociedadArray[x].trim());
        }

        //this.router.navigate(['/Administrador/Answer']);
      }
      
}
