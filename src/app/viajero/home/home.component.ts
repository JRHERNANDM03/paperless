import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit{
  @ViewChild('inicio', { static: true }) inicioElement?: ElementRef;

  constructor(private router: Router) {
}


ngAfterViewInit(): void {
  if(this.inicioElement)
  {
    this.inicioElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


  getEmail()
  {
    const textEmail = document.querySelector('.textEmail')?.textContent;
    const titlestring = String(textEmail);

    const textDetail = document.querySelector('.textDetail')?.textContent;
    const textstring = String(textDetail);

    

   
    Swal.fire({
      title: titlestring,
      text: textstring,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    })
  
  }

  getEmailRequest2()
  {
    const divChange2 = document.getElementById('divChange2');

    const textEmail2 = document.querySelector('.textEmail2')?.textContent;
    const titlestring2 = String(textEmail2);

    const textDetail2 = document.querySelector('.textDetail2')?.textContent;
    const textstring2 = String(textDetail2);

    if(divChange2)
    {

    Swal.fire({
      title: titlestring2,
      text: textstring2,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    }).then((result) => {
      if(result.isConfirmed)
      {
        divChange2.style.backgroundColor='rgba(0, 0, 0, 0.192)';
      }
    })
  }else
  {
    console.log("ERR");
  }

  }


  getEmailRequest3()
  {
    const divChange3 = document.getElementById('divChange3');

    const textEmail3 = document.querySelector('.textEmail3')?.textContent;
    const titlestring3 = String(textEmail3);

    const textDetail3 = document.querySelector('.textDetail3')?.textContent;
    const textstring3 = String(textDetail3);

    if(divChange3)
    {

    Swal.fire({
      title: titlestring3,
      text: textstring3,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    }).then((result) => {
      if(result.isConfirmed)
      {
        divChange3.style.backgroundColor='rgba(0, 0, 0, 0.192)';
      }
    })
  }else
  {
    console.log("ERR");
  }
  }

  getEmailRequest4()
  {
    const divChange4 = document.getElementById('divChange4');

    const textEmail4 = document.querySelector('.textEmail4')?.textContent;
    const titlestring4 = String(textEmail4);

    const textDetail4 = document.querySelector('.textDetail4')?.textContent;
    const textstring4 = String(textDetail4);

    if(divChange4)
    {

    Swal.fire({
      title: titlestring4,
      text: textstring4,
      showConfirmButton: true,
      confirmButtonColor: 'purple',
    }).then((result) => {
      if(result.isConfirmed)
      {
        divChange4.style.backgroundColor='rgba(0, 0, 0, 0.192)';
      }
    })
  }else
  {
    console.log("ERR");
  }
  }


 user() 
{ 
  this.router.navigate(['/Viajero/CambiarUsuaro']);
}

}