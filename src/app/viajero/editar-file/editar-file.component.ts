import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, deleteObject } from '@angular/fire/storage';
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

@Component({
  selector: 'app-editar-file',
  templateUrl: './editar-file.component.html',
  styleUrls: ['./editar-file.component.css']
})
export class EditarFileComponent implements OnInit {

  receiptno!: number;
  id_head!: number;
  authCloseTrip!: number;

  pernr!: string;
  reinr!: string
  uuid!: string;
  authExpense!: number;

  nickname!: string;

  file!: string;

  selectedFile: File | undefined;

  dataUpdateGeneral: any = {}
  sendEmailA: any = {}

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

        if(this.recivedData)
        {
          this.receiptno = this.recivedData.id;
          this.id_head = this.recivedData.head;
          this.authCloseTrip = this.recivedData.authCloseTrip;

          this.getData(this.recivedData.id)

        }else{
          const localStorageData = localStorage.getItem('DataEditarDocumento-Viajero');
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);

            this.receiptno = parsedData.id;
            this.id_head = parsedData.head;
            this.authCloseTrip = parsedData.authCloseTrip;

            this.getData(parsedData.id)
        }
      }

      this.auth.user$.subscribe(dataUser => {
        this.nickname = String(dataUser?.nickname);
      })

    }
  })
}



getData(receiptno: number)
{
  this.http.get<dataGeneral>(this.url+'GENERAL/' + receiptno).subscribe(data => {
    //console.log(data)
    this.uuid = data.uuid;
    this.authExpense = data.auth;
    this.pernr = data.pernr;
    this.reinr = data.reinr;
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

    if(this.authExpense == 0)
    {
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
                  window.location.href='/Viajero/Gastos'
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
                    window.location.href='/Viajero/Gastos'
                  }
                })
              }
            })
          })
          .catch(error => { console.log(error) })

      })
      .catch(error => { console.log(error) })
    }
    }else if(this.authExpense == 1)
    {
      Swal.fire({
        icon: 'error',
        title: 'No puedes modificar este gasto',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: 'purple'
      }).then(res => {
        if(res.isConfirmed)
        {

        }
      })
    }else if(this.authExpense == 2)
    {


      if(this.uuid == '')
    {
      /* Codigo directo para capturar el nuevo archivo */

    
      uploadBytes(documentoRef, file)
        .then(response => {

          this.dataUpdateGeneral = {
            uuid: response.metadata.name,
            object_id: response.metadata.name,
            auth:0
          }

          this.http.patch(this.url+'GENERAL/' + this.receiptno, this.dataUpdateGeneral).subscribe(upd => {
            if(upd)
            {
              const titleA = 'Nuevo gasto actualizado.';
              const subtitleA = 'Viaje: '+ this.reinr;
              const messageA = 'El usuario '+ this.nickname +' ha actualizado un gasto que se encontraba como rechazado para una nueva aprobación.';
            
              this.sendEmailA = {
              pernr: this.pernr,
              reinr: this.reinr,
              message: messageA,
              title: titleA,
              subtitle: subtitleA
            }

      this.http.post(this.url+'EmailA', this.sendEmailA).subscribe(emailA => {
        if(emailA)
        {
                let timerInterval = 0;

                Swal.fire({
                  icon: 'success',
                  iconColor: 'yellow',
                  title: 'Gasto actualizado',
                  text: 'Informando al administrador de tu cambio',
                  showConfirmButton: false,
                  timer: 3500,
                  timerProgressBar: true,

                  willClose: () => {
                    clearInterval(timerInterval)
                  }
                }).then((result) => {
                  if(result.dismiss === Swal.DismissReason.timer)
                  {
                    window.location.href='/Viajero/Gastos'
                  }
                })
              }
            })
          }else { console.log('ERROR') }
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
              object_id: result.metadata.name,
              auth: 0
            }
  
            this.http.patch(this.url+'GENERAL/' + this.receiptno, this.dataUpdateGeneral).subscribe(upd => {
              if(upd)
              {
                const titleA = 'Nuevo gasto actualizado.';
        const subtitleA = 'Viaje: '+ this.reinr;
        const messageA = 'El usuario '+ this.nickname +' ha actualizado un gasto que se encontraba como rechazado para una nueva aprobación.';
      
        this.sendEmailA = {
        pernr: this.pernr,
        reinr: this.reinr,
        message: messageA,
        title: titleA,
        subtitle: subtitleA
      }

      this.http.post(this.url+'EmailA', this.sendEmailA).subscribe(emailA => {
        if(emailA)
        {
          let timerInterval = 0;

          Swal.fire({
            icon: 'success',
            iconColor: 'yellow',
            title: 'Gasto actualizado',
            text: 'Informando al administrador de tu cambio',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,

            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if(result.dismiss === Swal.DismissReason.timer)
            {
              window.location.href='/Viajero/Gastos'
            }
          })
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
