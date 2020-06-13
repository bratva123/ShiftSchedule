import { Component, OnInit } from '@angular/core';
import { ShiftOperationService } from '../shift-operation.service';
import { EmpDetailService } from '../emp-detail.service';
import { ShiftSchedule } from '../../models/ShiftSchedule'
@Component({
  selector: 'app-shift-operation',
  templateUrl: './shift-operation.component.html',
  styleUrls: ['./shift-operation.component.css']
})
export class ShiftOperationComponent implements OnInit {
  error:string
  msg:string
  get:boolean
  upd:boolean
  del:boolean
  add:boolean
  getByCardDate:boolean
  getByShiftDate:boolean
  getByCard:boolean
  getByDate:boolean
  shift:ShiftSchedule
  empList:any
  dict:any
  result:any
  result2:any
  constructor(private shiftOpSrv:ShiftOperationService,private empSrv:EmpDetailService) {
      this.msg = ""
      this.add = false
      this.get = false
      this.upd = false
      this.del = false
      this.getByCardDate = false
      this.getByShiftDate = false
      this.getByDate = false
      this.getByCard = false
      this.shift = new ShiftSchedule(0,"","")
      this.empList = []
      this.dict = {}
      this.result = []
      this.result2 = []


   }
  ngOnInit(): void {
      this.empSrv.getAllEmps().subscribe(result => {this.showData(result["msg"])},error=>{this.showError(error)})

  }
  showData(record){
       for(var i = 0 ;i <record.length ; i++){
          this.empList.push([record[i][0],record[i][1]])
          {this.dict[record[i][1]] = record[i][0]}
       }
        console.log(this.dict)
  }
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

    showResult(result){
        this.result = result
        var x = document.getElementById("result");
        if(result.length>0)
          x.style.display = "block"
        else
          this.showMsg("None Of The Employee woirking in "+this.shift.shiftType+" Shift  on the date - "+this.shift.date)
    }
    showResult2(result){
        for(var i=0;i<result.length;i++){
            var temp = [result[i][1],this.dict[result[i][1]],result[i][0]]
            this.result2.push(temp)
        }
        var x = document.getElementById("result2");
        if(result.length>0)
          x.style.display = "block"
        else
          this.showMsg("None Of The Employee woirking in "+this.shift.shiftType+" Shift  on the date - "+this.shift.date)
    }
    closeResult(){
       var x = document.getElementById("result");
        x.style.display = "none";
    }
    closeResult2(){
       var x = document.getElementById("result2");
        x.style.display = "none";
    }

   chooseOperation(){
      var create = document.getElementById("create") as HTMLInputElement
      var read = document.getElementById("read") as HTMLInputElement
      var update = document.getElementById("update") as HTMLInputElement
      var del = document.getElementById("delete") as HTMLInputElement
      this.shift = new ShiftSchedule(0,"","")
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

  getOperation(){
      var getOp1 = document.getElementById("getOp1") as HTMLInputElement
      var getOp2 = document.getElementById("getOp2") as HTMLInputElement
      var getOp3 = document.getElementById("getOp3") as HTMLInputElement
      var getOp4 = document.getElementById("getOp4") as HTMLInputElement
      this.shift = new ShiftSchedule(0,"","")
      if(getOp1.checked){
        this.getByShiftDate = true
        this.getByCardDate = false
        this.getByDate = false
      }
      else if(getOp2.checked){
        this.getByShiftDate = false
        this.getByCardDate = true
        this.getByDate = false
      }
      else if(getOp4.checked){
        this.getByShiftDate = false
        this.getByCardDate = false
        this.getByDate = true
      }
  }
  getByShiftAndDate(){
      if(this.shift.shiftType != "" && this.shift.date !=""){
          this.shiftOpSrv.getByShiftAndDate(this.shift.shiftType,this.shift.date).subscribe(result=>{this.showResult(result['data'])},error=>{this.showError(error)})
      }
      else{
        if(this.shift.shiftType == ""){
            this.showError("Please Fill the Shift Field")
        }
        else if(this.shift.date == ""){
            this.showError("Please Fill the Date Field")
        }
      }

  }

  getByCardAndDate(){
      if(this.shift.cardNum != 0 && this.shift.date != ""){
          this.shiftOpSrv.getByCardAndDate(this.shift.cardNum,this.shift.date).subscribe(result=>{this.shift.shiftType = result['data']},
                                                                                   error=>{this.showError(error)})
      }
      else {
        if(this.shift.cardNum == 0)
          this.showError("Please Fill The Card Number Field")
        else if(this.shift.date == "")
          this.showError("Please Fill the date field")
      }
  }

  getByOptDate(){
    if(this.shift.date != "")
      this.shiftOpSrv.getByOptDate(this.shift.date).subscribe(result=>{this.showResult2(result['data'])},error=>{this.showError(error)})
    else
      this.showError("Please Fill The date Field")
  }
  getShift(){
        this.getByShiftDate = false
        this.getByCardDate = true
        this.getByDate = false
        this.getByCardAndDate()
  }
  updateShiftDetail(shift1){
      if(this.shift.cardNum !=0 && this.shift.date != ""){
          this.shiftOpSrv.updateShiftDetail(this.shift.cardNum,this.shift.date,shift1.value).subscribe(result=>{this.showMsg(result['msg'])},error=>{this.showError(error)})
      }
      else{
        if(this.shift.cardNum == 0){
            this.showError("PLease Fill the card number Field")
        }
        else if(this.shift.date == ""){
            this.showError("PLease Fill The date Field")
        }
      }

  }

  deleteShftDetail(sure){
      if(this.shift.cardNum !=0 && this.shift.date != ""){
          if(sure.checked)
              this.shiftOpSrv.deleteShftDetail(this.shift.cardNum,this.shift.date).subscribe(result=>{this.showMsg(result['msg'])},error=>{this.showError(error)})
          else
              this.showError("Please Tick the Checkbox")
      }
      else{
        if(this.shift.cardNum == 0){
            this.showError("PLease Fill the card number Field")
        }
        else if(this.shift.date == ""){
            this.showError("PLease Fill The date Field")
        }
      }

  }
  clear(){
      this.shift = new ShiftSchedule(0,"","")
  }


}
