import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';

import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';  // Archivo con los datos de productos, debe estar indicados en los assets de angular.json

    constructor(private http: HttpClient){ }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }


    private handleError(err: HttpErrorResponse) {
        /*
            Vamos a enviar el log a la consola. En un entorno real, se enviaría a un sista de gestion de logs
        */
        let errorMessage = '';

        if (err.error instanceof ErrorEvent ) {
            // Se recibe un error de Red o del Cliente del servicio
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // El backend retorna un codigo de respuesta de error.
            // La respuesta puede tener información de que fue mal
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }   

}