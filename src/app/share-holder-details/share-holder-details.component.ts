import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-share-holder-details',
  templateUrl: './share-holder-details.component.html',
  styleUrl: './share-holder-details.component.scss'
})
export class ShareHolderDetailsComponent {
  errorMessage: string = '';
  messageNotResult: string = ''
  responses: any;
  datosMostrar: any = {};
  idTipoDocumento: string = '';
  numeroDocumento: number | undefined;
  numCuotapartista: number = 0;
  numeroCuotaPartista: number | undefined
  datosEndpoint: any
  dataGraphic: { name: string, value: number }[] | null = null;
  showTable: boolean = false;
  view: [number, number] = [700, 400];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Values';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  colorScheme: Color = {
    domain: ['#99CCE5', '#FF7F7F'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (typeof this.numeroDocumento === 'number') {
      this.dataService.getDatosGenerales(this.idTipoDocumento, this.numeroDocumento)
        .subscribe({
          next: (response) => {
            this.numeroCuotaPartista = response.data[0].datosGenerales.numero
            this.errorMessage = ''
          },
          error: (error: any) => {
            this.errorMessage = 'Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo más tarde.';
            console.error('Error:', error);
          }
        });
    } else {
      console.error('El valor de documentNumber no es un número válido.');
    }
  }
  onSubmitNumCuotaPartista() {
    this.dataService.getPosicionCuotapartista(this.numCuotapartista)
      .subscribe({
        next: (respPositionCuotapartista) => {
          if (respPositionCuotapartista.data.length !== 0) {
            this.errorMessage= ''
            this.responses = respPositionCuotapartista.data;
            this.messageNotResult = ''
            this.datosMostrar = {
              cuotapartesTotal: respPositionCuotapartista.data[0]?.cuotapartesTotal,
              cuotapartesBloqueadas: respPositionCuotapartista.data[0]?.cuotapartesBloqueadas,
              cuotapartesValuadas: respPositionCuotapartista.data[0]?.cuotapartesValuadas,
              valorCuotaparte: respPositionCuotapartista.data[0]?.valorCuotaparte,
              valorCuotaparteFecha: respPositionCuotapartista.data[0]?.valorCuotaparteFecha,
              valorCuotaparteTipo: respPositionCuotapartista.data[0]?.valorCuotaparteTipo,
              anulado: respPositionCuotapartista.data[0]?.condicionIngresoEgreso[0]?.estaAnulado ? 'Si' : 'No',
              idCoreBanco: respPositionCuotapartista.data[0]?.cuotapartista?.idCoreBanco ? respPositionCuotapartista.data[0]?.cuotapartista?.idCoreBanco : '-',
              idCuotaPartista: respPositionCuotapartista.data[0]?.cuotapartista?.idCuotapartista ? respPositionCuotapartista.data[0]?.cuotapartista?.idCuotapartista : '-',
              nombre: respPositionCuotapartista.data[0]?.cuotapartista?.nombre,
              idFondo: respPositionCuotapartista.data[0]?.fondo?.idFondo,
              nombreFondo: respPositionCuotapartista.data[0]?.fondo?.nombre,
              moneda: respPositionCuotapartista.data[0]?.moneda?.cafci,
              descripcionMoneda: respPositionCuotapartista.data[0]?.moneda?.descripcion,
              tipoValorCuotaparte: respPositionCuotapartista.data[0]?.tipoValorCuotaparte?.descripcion
            };
            this.dataGraphic = [
              { name: 'cuotapartesTotal', value: respPositionCuotapartista.data[0]?.cuotapartesTotal },
              { name: 'cuotapartesBloqueadas', value: respPositionCuotapartista.data[0]?.cuotapartesBloqueadas },
              { name: 'cuotapartesValuadas', value: respPositionCuotapartista.data[0]?.cuotapartesValuadas },
              { name: 'valorCuotaparte', value: respPositionCuotapartista.data[0]?.valorCuotaparte }
            ];
          } else {
            this.datosMostrar = ''
            this.dataGraphic = []
            this.messageNotResult = 'El número de cuotapartista que ingresaste no tiene datos.'
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo más tarde o inicie sesion nuevamente.';
          console.error('Error:', error);
        }
      });
  }
}










