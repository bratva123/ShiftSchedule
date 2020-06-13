import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmpDetailService } from '../emp-detail.service';

@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit {
  emp:Employee
  error:string
  constructor(private empSrv:EmpDetailService) {
    this.emp = new Employee("",0)
    this.error = ""
  }

  ngOnInit(): void {
    this.empSrv.getAllEmps().subscribe(result => { console.log(result); }, error => { this.showError(error) });
  }

  submit(){
    this.empSrv.submit(this.emp.EmpName,this.emp.CardNum).subscribe(result => { console.log(result); }, error => { this.showError(error) });
  }

  showError(error) {
        this.error = error;
        var x = document.getElementById("texterror");
        if (error.length > 0) {
            x.style.display = "block";
        }
    }

    closealert() {
        var x = document.getElementById("texterror");
        x.style.display = "none";
    }

}
