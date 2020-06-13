import { Component, OnInit } from '@angular/core';
import { EmpOperationService } from '../emp-operation.service';
import { Employee } from '../../models/Employee'

@Component({
  selector: 'app-emp-operation',
  templateUrl: './emp-operation.component.html',
  styleUrls: ['./emp-operation.component.css']
})
export class EmpOperationComponent implements OnInit {
  one:boolean
  two:boolean
  allFilled:boolean
  option:number
  error:string
  add:boolean
  upd:boolean
  get:boolean
  del:boolean
  getByName:boolean
  getByCard:boolean
  emp:Employee
  msg:string
  constructor(private empOpSrv:EmpOperationService) {
    this.one = false
    this.two = false
    this.allFilled = false
    this.option = 0
    this.error = ""
    this.add = false
    this.get = false
    this.upd = false
    this.del = false
    this.getByName = false
    this.getByCard = false
    this.emp = new Employee("",0)
    this.msg = ""
  }

  ngOnInit(): void {

  }

  chooseOperation(){
      var create = document.getElementById("create") as HTMLInputElement
      var read = document.getElementById("read") as HTMLInputElement
      var update = document.getElementById("update") as HTMLInputElement
      var del = document.getElementById("delete") as HTMLInputElement
      this.emp = new Employee("",0)
      if(create.checked){
        this.add = true
        this.get = false
        this.upd = false
        this.del = false
      }
      else if(read.checked){
        this.add = false
        this.get = true
        this.upd = false
        this.del = false
      }
      else if(update.checked){
        this.add = false
        this.get = false
        this.upd = true
        this.del = false
      }
      else if(del.checked){
        this.add = false
        this.get = false
        this.upd = false
        this.del = true
      }
  }

  checkOption(){
    var singleOp = document.getElementById("one") as HTMLInputElement
    var multipleOp = document.getElementById("two") as HTMLInputElement
    if(singleOp.checked){
      this.one = true
      this.two = false
    }
    else if(multipleOp.checked){
      this.two = true
      this.one = false
    }
  }

  buildHtml(opt){
  this.option = opt.value
  console.log(this.option)
  var form = document.getElementById("build")
  form.innerHTML = ""
  var html = ""
  for(var i = 0 ; i<this.option ; i++){
      html += '<div class="row">'+
                '<div class="col">'+
                    '<input type="text" class="form-control" placeholder="Employee name" id="emp'+i+'">'+
                '</div>'+
                '<div class="col">'+
                    '<input type="number" class="form-control" placeholder="Card Number" id="card'+i+'">'+
                '</div>'+
              '</div>'+
              '<br />'
     }
    var button = '<button type="button" id="btn" class="btn btn-primary">Save Bulk Data</button>'
  form.innerHTML += html+button
  document.getElementById("btn").addEventListener("click", this.addMultipleData.bind(this));
  }

//   ***************************** add Operation start Here *************************************

  addSingleData(){
    var emp = document.getElementById("oneEmp") as HTMLInputElement
    var card = document.getElementById("oneCardNum") as HTMLInputElement
    this.empOpSrv.addNewEmployee(emp.value,card.value,1).subscribe(result => {console.log("success")},error => {this.showError(error)})
  }

  addMultipleData(){
  console.log("helllo")
    var emps = []
    var cards = []
    for(var i=0;i<this.option;i++){
        var emp = document.getElementById("emp"+i) as HTMLInputElement
        var card = document.getElementById("card"+i) as HTMLInputElement

        if(emp.value != "" && card.value+"" != "0"){
          emps.push(emp.value)
          cards.push(card.value)
        }
        else{
          this.showError("Please Filled The data accordingly")
        }
    }
    console.log(emps,cards)
    this.empOpSrv.addNewEmployee(emps,cards,2).subscribe(result => {console.log("success")},error => {this.showError(error)})
  }

// ********************************** Add operation End Here ************************************

// ************************************ Error Part **********************************************
  showError(error) {
  console.log(error)
        this.error = error;
        var x = document.getElementById("texterror");
        if (error.length > 0) {
            x.style.display = "block";
        }
    }
  showMsg(msg) {
  console.log(msg)
        this.msg = msg;
        var x = document.getElementById("msg");
        if (msg.length > 0) {
            x.style.display = "block";
        }
    }

  closeError() {
        var x = document.getElementById("texterror");
        x.style.display = "none";
    }
    closeMsg() {
        var x = document.getElementById("msg");
        x.style.display = "none";
    }

    // ************************************ Error Part End Here **********************************************

    // ************************************ Get Operation start here **********************************************
  getOperation(){
      var getOp1 = document.getElementById("getOp1") as HTMLInputElement
      var getOp2 = document.getElementById("getOp2") as HTMLInputElement
      this.emp = new Employee("",0)
      if(getOp1.checked){
        this.getByCard = false
        this.getByName = true
      }
      else if(getOp2.checked){
        this.getByCard = true
        this.getByName = false
      }
  }
  getDetail(){
  console.log(this.getByName,this.getByCard)
  if(this.getByName){
      if(this.emp.EmpName != "")
          this.empOpSrv.getDetail(this.emp.EmpName).subscribe(result=> {this.emp.CardNum = result['card'][0]},error=>{this.showError(error)})
      else
          this.showError("Please Fill Employee name")
  }
  else if(this.getByCard){
      if(this.emp.CardNum != 0)
          this.empOpSrv.getDetail(this.emp.CardNum).subscribe(result=> {this.emp.EmpName = result['name']},error=>{this.showError(error)})
      else
          this.showError("Please Fill Card Number")
  }
  }

  getName(){
    this.getByCard = true
    this.getByName = false
    this.getDetail()
    this.getByCard = false

  }
  updateName(){
    var newName = document.getElementById("newName") as HTMLInputElement
    if(newName.value != "")
        this.empOpSrv.updateName(this.emp.CardNum,newName.value).subscribe(result=>{this.emp.EmpName = result['name'],this.showMsg(result['msg'])},error=>{this.showError(error)})
    else
        this.showError("PLease Fill The Data FIrst")
  }

  deleteEmp(){
      var check = document.getElementById("sure") as HTMLInputElement
      if(this.emp.CardNum !=0){
          if(check.checked)
              this.empOpSrv.deleteEmp(this.emp.CardNum).subscribe(result=>{this.showMsg(result['msg'])},error=>{this.showError(error)})
          else
              this.showError("Please tick the checkbox")
      }
      else{
          this.showError("Please Fill the Card Number ")
      }
  }
}
