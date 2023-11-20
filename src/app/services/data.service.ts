import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2EiLCJJRCI6InNhIiwiVVQiOiJDTyIsIlVJRCI6IjEiLCJVQk8iOiIiLCJuYmYiOjE3MDA1MTMxNDEsImV4cCI6MTcwMDUxODU0MSwiaWF0IjoxNzAwNTEzMTQxLCJpc3MiOiJ3ZWJBcGkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDIvIn0.xnSJnjWNHDRDt4nDD0W6kHeevew2fMFw3feyu_stcLE';
    constructor(private http: HttpClient) { }
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.authToken}`,
            'api-version': '5'
        });
    }
    private generateEndpoint(route: string, queryParams: { [key: string]: string }): string {
        const baseUrl = 'https://escoapi.primary.com.ar/api/fondos/v5/';
        let endpoint = baseUrl + route;
        const query = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        if (query) {
            endpoint += `?${query}`;
        }
        return endpoint;
    }

    private getRequestOptions(): { headers: HttpHeaders } {
        return { headers: this.getHeaders() };
    }

    getDatosGenerales(idTipoDocumento: string, numeroDocumento: number): Observable<any> {
        const queryParams = {
            'idTipoDocumento': idTipoDocumento,
            'numeroDocumento': numeroDocumento.toString()
        };
        const endpoint = this.generateEndpoint('get-cuotapartistas', queryParams);
        const requestOptions = this.getRequestOptions();
        return this.http.get(endpoint, requestOptions);
    }

    getPosicionCuotapartista(numCuotapartista: number): Observable<any> {
        const queryParams = { 'numCuotapartista': numCuotapartista.toString() };
        const endpoint = this.generateEndpoint('reportes/posicionCuotapartista', queryParams);
        const requestOptions = this.getRequestOptions();
        return this.http.get(endpoint, requestOptions);
    }

    getLiquidaciones(start: string, end: string): Observable<any> {
        const queryParams = {
            'numFondo': '2',
            'numCuotapartista': '36016',
            'fechaDesde': start,
            'fechaHasta': end
        };
        const endpoint = this.generateEndpoint('reportes/liquidaciones', queryParams);
        const requestOptions = this.getRequestOptions();
        return this.http.get(endpoint, requestOptions);
    }

    getSolicitudes(start: string, end: string): Observable<any> {
        const queryParams = {
            'numFondo': '2',
            'numCuotapartista': '36016',
            'fechaDesde': start,
            'fechaHasta': end
        };
        const endpoint = this.generateEndpoint('reportes/solicitudes', queryParams);
        const requestOptions = this.getRequestOptions();
        return this.http.get(endpoint, requestOptions);
    }

    getValorCuotapartes(fechaSeleccionada: string): Observable<any> {
        const queryParams = {
          fecha: fechaSeleccionada,
          numFondo: '2'
        };
        const endpoint = this.generateEndpoint('reportes/valorCuotapartes', queryParams);
        const requestOptions = this.getRequestOptions();
        return this.http.get(endpoint, requestOptions);
      }
}