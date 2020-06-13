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
export class EmpOperationService {
  baseUrl:string
  constructor(private http: HttpClient) {
    this.baseUrl = "http://127.0.0.1:5000/"
  }
  private handleError(error: HttpErrorResponse) {
         return throwError(error.error["ExceptionMessage"]);
     }

  addNewEmployee(emps,cards,option){
    var data = {"cards":cards,"emps":emps,"opt":option}
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(this.baseUrl+"addEmp",JSON.stringify(data),options).pipe(
          catchError(this.handleError)
      );
  }
  getDetail(emp){
    return this.http.get(this.baseUrl+'getCardNum?ename='+emp).pipe(
          catchError(this.handleError)
      );
  }
  updateName(cardNum,newName){
    var data = {"card":cardNum,"name":newName}
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.put(this.baseUrl+"updateEmp",JSON.stringify(data),options).pipe(
          catchError(this.handleError)
      );
  }

  deleteEmp(card){
      return this.http.delete(this.baseUrl+'deleteEmp?card='+card).pipe(
          catchError(this.handleError)
      );
  }
}
