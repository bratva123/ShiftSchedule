import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShiftScheduleService {
  baseUrl:string
  constructor(private http: HttpClient) {
    this.baseUrl = "http://127.0.0.1:5000/"
   }

  private handleError(error: HttpErrorResponse) {
         return throwError(error.error["ExceptionMessage"]);
     }

  saveShift(cardNum,date,shift){
    var data = {"cardNums":cardNum,"date":date,"shifts":shift}
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(this.baseUrl+"saveShift",JSON.stringify(data),options).pipe(
          catchError(this.handleError)
      );
  }
}
