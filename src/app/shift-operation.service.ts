import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShiftOperationService {
  baseUrl:string
  constructor(private http: HttpClient) {
    this.baseUrl = "http://127.0.0.1:5000/"
  }
  private handleError(error: HttpErrorResponse) {
         return throwError(error.error["ExceptionMessage"]);
     }

  getByShiftAndDate(shift,date){
    return this.http.get(this.baseUrl+'getEmpsDet?shift='+shift+"&date="+date).pipe(
          catchError(this.handleError)
      );
  }
  getByCardAndDate(card,date){
    return this.http.get(this.baseUrl+'getEmpShift?card='+card+"&date="+date).pipe(
          catchError(this.handleError)
      );
  }
  getByOptDate(date){
    return this.http.get(this.baseUrl+'getEmpsShift?date='+date).pipe(
          catchError(this.handleError)
      );
  }
  updateShiftDetail(card,date,shift){
    var data = {"card":card,"date":date,"newShift":shift}
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.put(this.baseUrl+"updateShift",JSON.stringify(data),options).pipe(
          catchError(this.handleError)
      );
  }
  deleteShftDetail(card,date){
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.delete(this.baseUrl+"deleteShift?card="+card+"&date="+date).pipe(
          catchError(this.handleError)
      );
  }
}
