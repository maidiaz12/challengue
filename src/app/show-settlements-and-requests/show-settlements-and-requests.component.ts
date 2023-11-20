import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 
import { formatDate } from '@angular/common';

import { forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-show-settlements-and-requests',
  templateUrl: './show-settlements-and-requests.component.html',
  styleUrls: ['./show-settlements-and-requests.component.scss'],
})
export class ShowSettlementsAndRequestsComponent {
  errorMessage: string = '';
  responses: any; 
  range = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required),
  });
  datosMostrar: any;
  datosMostrarDos: any

  constructor(private dataService: DataService ) {
    this.range.valueChanges.subscribe((value) => {
      const start = value.start ? formatDate(value.start, 'yyyy-MM-dd', 'en-US') : null;
      const end = value.end ? formatDate(value.end, 'yyyy-MM-dd', 'en-US') : null;

      if (start !== null && end !== null) {
        this.sendDatesToEndpoint(start, end)
      }

    });
  }

  devuelveData(data: any) {
    const años = data.map((fecha: any) => parseInt(fecha.fechaLiquidacion.substring(0, 4)));
    const ultimoAño = Math.max(...años);
    const fechasUltimoAño = data.filter((fecha: any) => fecha.fechaLiquidacion.startsWith(ultimoAño.toString()));
    const ultimasFechas = fechasUltimoAño.filter((fecha: any) => fecha.fechaLiquidacion.startsWith(`${ultimoAño}-`));
    let ultimoMes = '';
    ultimasFechas.forEach((fecha: any) => {
      const mes = fecha.fechaLiquidacion.substring(5, 7);
      if (mes > ultimoMes) {
        ultimoMes = mes;
      }
    });
    const ultimasFechasUltimoMes = ultimasFechas.filter((fecha: any) => fecha.fechaLiquidacion.startsWith(`${ultimoAño}-${ultimoMes}`));
    return ultimasFechasUltimoMes
  }

  sendDatesToEndpoint(start: any, end: any) {
    const request1 = this.dataService.getLiquidaciones(start, end);
    const request2 = this.dataService.getSolicitudes(start, end);
    forkJoin({
      response1: request1,
      response2: request2
    }).subscribe({
      next: (responses: any) => {
        this.responses = responses;
        let arregloSolicitudes = [] as any;
        let arregloLiqui = [] as any;
        if (this.devuelveData(responses.response1.data) && Array.isArray(this.devuelveData(responses.response1.data))) {
          this.devuelveData(responses.response1.data).forEach((element: any) => {
            if (element.hasOwnProperty('solicitud')) {
              arregloSolicitudes.push(element.solicitud);
            }
          });
        }
        this.datosMostrar = arregloSolicitudes
        if (this.devuelveData(responses.response2.data) && Array.isArray(this.devuelveData(responses.response2.data))) {
          this.devuelveData(responses.response2.data).forEach((element: any) => {
            if (element.hasOwnProperty('liquidacion')) {
              arregloLiqui.push(element.liquidacion);
            }
          });
        }
        this.datosMostrarDos = arregloLiqui
        this.errorMessage = ''; //aca limpio mensaje de error en caso que en la proxima pegada sea exitosa.
      },
      error: (error: any) => {
             this.errorMessage = 'Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error:', error);
      },
    });
  }
}