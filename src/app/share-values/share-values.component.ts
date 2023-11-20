import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/observer.service';

@Component({
  selector: 'app-share-values',
  templateUrl: './share-values.component.html',
  styleUrls: ['./share-values.component.scss']
})
export class ShareValuesComponent {
  errorMessage: string = '';
  messageNotResult: string = ''
  private dataSubscription: Subscription;
  responses: any;
  datosMostrar: any[] = [];
 
  fechaControl = new FormControl(); 

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {
    this.dataSubscription = this.notificationService.dataUpdated$.subscribe(() => {
      this.sendFechaData(this.fechaControl.value);
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
 
  ngOnInit() {
    this.fechaControl.valueChanges.subscribe(value => {
      const fechaSeleccionada = value ? formatDate(value, 'yyyy-MM-dd', 'en-US') : null;
      this.sendFechaData(fechaSeleccionada)
    });
  }

  sendFechaData(fechaSelected: any) {
    this.dataService.getValorCuotapartes(fechaSelected).subscribe({
      next: (response: any) => {
        this.responses = response;
        if(response.data.length !== 0){
             this.messageNotResult= ''
           const newData = response.data.map((item: any) => ({
          cuotapartesCirculacion: item.cuotapartesCirculacion,
          patrimonioNeto: item.patrimonioNeto,
          valorCuotaparte: item.valorCuotaparte,
          variacion: item.variacion
        }));
        this.datosMostrar = Object.values(newData);
        }else{
          this.messageNotResult = 'No existen valores cuotapartes del día que seleccionaste. Seleccioná otra fecha.'
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo más tarde. Es posible que haya expirado sesion, intente iniciar sesion nuevamente.';
        console.error('Error:', error);
      }
    });
  }

}


