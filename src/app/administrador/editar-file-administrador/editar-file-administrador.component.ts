import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Storage, uploadBytes, ref, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SharedDataService } from 'src/app/shared-data.service';
import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/Service/service.service';

interface dataGeneral {
  auth: number;
  bus_purpo: string;
  bus_reason: string;
  comentario: string;
  country: string;
  dateAuth: string;
  descript: string;
  exp_type: string;
  fec_crea: string;
  fec_mod: string;
  hora_crea: string;
  hora_mod: string;
  loc_amount: number;
  loc_curr: string;
  multipli: number;
  object_id: string;
  p_ctg: string;
  p_doc: string;
  p_prv: string;
  pdf: string;
  pernr: string;
  rec_amount: string;
  rec_curr: string;
  rec_date: string;
  receiptno: string;
  region: string;
  reinr: string;
  shorttxt: string;
  tax_code: string;
  timeAuth: string;
  userAuth: string;
  user_crea: string;
  user_mod: string;
  uuid: string;
  xml: string;
  }

  interface dataUser{
    PERNR: number;
    area: string;
    area_id: number;
    lastname: string;
    name: string;
    nickname: string;
    puesto: string;
    rol_id: number;
    society: number;

  }

@Component({
  selector: 'app-editar-file-administrador',
  templateUrl: './editar-file-administrador.component.html',
  styleUrls: ['./editar-file-administrador.component.css']
})
export class EditarFileAdministradorComponent {

  receiptno!: number;
  id_head!: number;
  authCloseTrip!: number;

  uuid!: string;

  file!: string;

  selectedFile: File | undefined;

  dataUpdateGeneral: any = {}

  recivedData: any;

  url:any;

  constructor(private sharedDataService: SharedDataService, private router: Router, private route: ActivatedRoute, public auth: AuthService, private http: HttpClient, private storage: Storage){}

ngOnInit()
{
  this.auth.isAuthenticated$.subscribe(isAuthenticate => {
    if(!isAuthenticate)
    {
      this.router.navigate(['login'])
    }else
    {
      const service = new ServiceService();
      this.url = service.url();

      this.recivedData = this.sharedDataService.getData()

      this.getDataUserLogg();

        if(this.recivedData)
        {
          this.receiptno = this.recivedData.id;
          this.id_head = this.recivedData.head;
          this.authCloseTrip = this.recivedData.authCloseTrip;

          this.getData(this.recivedData.id)

        }else{
          const localStorageData = localStorage.getItem('DataEditarDocumento-Administrador');
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);

            this.receiptno = parsedData.id;
            this.id_head = parsedData.head;
            this.authCloseTrip = parsedData.authCloseTrip;

            this.getData(parsedData.id)
        }
      }
    }
  })
}

getDataUserLogg()
{
  this.auth.user$.subscribe(user => {
    const nickname = user?.nickname;
    this.http.get<dataUser>(this.url+'USERS/' + nickname).subscribe(data => {
      if(data.rol_id != 3)
      {
        window.location.href='/access_error';
      }
    })
  })
}

getData(receiptno: number)
{
  this.http.get<dataGeneral>(this.url+'GENERAL/' + receiptno).subscribe(data => {
    //console.log(data)
    this.uuid = data.uuid;
  })
}

formValid(): boolean {
  // Verificar si los campos requeridos están llenados
  if (
    
    this.file
    ) {
      return true; // Todos los campos están llenados
  } else {
    return false; // Al menos un campo requerido está vacío
  }
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

saveChange()
{

  if(!this.selectedFile)
  {
    console.error('No se selecciono ningún archivo');
  }else{

    const numberRandom = this.generateRandom5DigitNumber();


    const file = this.selectedFile;
    const fileName = file.name;
    const fileNameComplete = fileName + numberRandom;
    const documentoRef = ref(this.storage, `files/${fileNameComplete}`); 

    if(this.uuid == '')
    {
      /* Codigo directo para capturar el nuevo archivo */

    
      uploadBytes(documentoRef, file)
        .then(response => {

          this.dataUpdateGeneral = {
            uuid: response.metadata.name,
            object_id: response.metadata.name
          }

          this.http.patch(this.url+'GENERAL/' + this.receiptno, this.dataUpdateGeneral).subscribe(upd => {
            if(upd)
            {
              Swal.fire({
                icon: 'success',
                title: 'Archivo modificado con exito',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: 'purple'
              }).then(res => {
                if(res.isConfirmed)
                {
                  window.location.href='/Administrador/Mis-Gastos'
                }
              })
            }
          })
  
        })
        .catch(error => { console.log(error) })
        

    }else
    {
      /* Codigo para eliminar el archivo almacenado y despues capturar el nuevo archivo */

      const desertRef = ref(this.storage, `files/${this.uuid}`)
      
      deleteObject(desertRef)
      .then(response => {

        uploadBytes(documentoRef, file)
          .then(result => {
            this.dataUpdateGeneral = {
              uuid: result.metadata.name,
              object_id: result.metadata.name
            }
  
            this.http.patch(this.url+'GENERAL/' + this.receiptno, this.dataUpdateGeneral).subscribe(upd => {
              if(upd)
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Archivo modificado con exito',
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonColor: 'purple'
                }).then(res => {
                  if(res.isConfirmed)
                  {
                    window.location.href='/Administrador/Mis-Gastos'
                  }
                })
              }
            })
          })
          .catch(error => { console.log(error) })

      })
      .catch(error => { console.log(error) })
    }


  }
}

generateRandom5DigitNumber(): string {
  const min = 0;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Rellena con ceros a la izquierda para asegurarte de que tenga 5 dígitos
  const random5DigitNumber = randomNumber.toString().padStart(5, '0');

  return random5DigitNumber;
}


logout()
{
  Swal.fire({
    title: 'Estás seguro de cerrar sesión',
    showConfirmButton: true,
    confirmButtonText: 'Cerrar Sesión',
    confirmButtonColor: 'purple',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: 'orange',
    showDenyButton: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false
  }).then((result) => {
    if(result.isConfirmed)
    {
        this.auth.logout()
    }
  })
}


}
