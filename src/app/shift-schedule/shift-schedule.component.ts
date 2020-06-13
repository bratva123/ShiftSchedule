import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmpDetailService } from '../emp-detail.service';
import { ShiftScheduleService } from '../shift-schedule.service';
import { ShiftSchedule } from '../../models/ShiftSchedule';


@Component({
        selector: 'app-shift-schedule',
        templateUrl: './shift-schedule.component.html',
        styleUrls: ['./shift-schedule.component.css']
})
export class ShiftScheduleComponent implements OnInit {
        empList:any
        error:string;
        noOfdays:any
        monthDict:any
        monthReverseDict:any
        months:string[]
        datesList:any
        currentMonth:string
        year:number
        rowLen:number
        cardNums:any
        selectedMonth:string
        shifts:any
        flag:boolean
  constructor(private empSrv:EmpDetailService,  private shiftSrv:ShiftScheduleService) {
        this.empList = []
        this.months = []
        this.datesList = []
        this.currentMonth = ""
        this.year = (new Date()).getFullYear()
        this.rowLen = 0
        this.cardNums = []
        this.shifts = []
        this.flag = false
  }

  ngOnInit(): void {
        this.error = ""
        this.empSrv.getAllEmps().subscribe(result => {this.showData(result["msg"])},error=>{this.showError(error)})
        this.customDateMonthYear()
//         console.log(this.empList)
            console.log(this.shiftSrv)




  }

  showData(record){
       for(var i = 0 ;i <record.length ; i++){
          this.empList.push([record[i][0],record[i][1]])
          this.cardNums.push(record[i][1])
       }
  }

  leapYear(year){
        var bol = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
        if(bol){return 29}
        else{return 28}
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

    save(cardNum,date,shift){
//         console.log(date.value)
        this.shiftSrv.saveShift(cardNum.value,date.value,shift.value).subscribe(result => {console.log(result["msg"])},error=>{this.showError(error)})
    }

    customDateMonthYear(){
        var date = new Date()
        var today = date.getDate()
        var month = date.getMonth()
        this.noOfdays = {0:31,1:this.leapYear(this.year),2:31,3:30,4:31,5:30,6:31,7:31,8:30,9:31,10:30,11:31}
//         console.log(this.noOfdays[1])
        this.monthDict = {0:"Jan",1:"Feb",2:"Mar",3:"Apr",4:"May",5:"Jun",6:"Jul",7:"Aug",8:"Sep",9:"Oct",10:"nov",11:"Dec"}
        this.monthReverseDict = {"Jan":0,"Feb":1,"Mar":2,"Apr":3,"May":4,"Jun":5,"Jul":6,"Aug":7,"Sep":8,"Oct":9,"nov":10,"Dec":11}
//         console.log(Object.keys(this.monthDict).length)
        if(today<=5 && today>=1){
            for(var i = month;i<Object.keys(this.monthDict).length; i++){
                this.months.push(this.monthDict[i])
            }
        }
        else{
            for(var i = month+1;i<Object.keys(this.monthDict).length; i++){
                this.months.push(this.monthDict[i])
            }
        }
//         console.log(this.months)
    }

    makeShiftSchedule(selectedMonth){
        var table = document.getElementById("tdate")
        table.innerHTML = ""
        var month = this.monthReverseDict[selectedMonth.value]
//         this.selectedMonth = month
        this.currentMonth = selectedMonth.value
        var nod = this.noOfdays[month]
//         console.log(nod)
        var date = new Date()
        this.year = date.getFullYear()
        for(var i = 2;i<=nod+1;i++){
            this.datesList.push(new Date(this.year,month,i,0,0,0).toISOString().split('T')[0])
        }
//         console.log(this.datesList)
        this.rowLen = this.datesList.length
        this.buildTable(selectedMonth)
    }

    buildTable(selectedMonth){
        var table = document.getElementById("tdate")
//         console.log(this.datesList.length)
        var x,y,z,but
        y = ""
        for(var i = 0 ; i<this.datesList.length;i++){
            x = '<tr>'+
                       '<td>'+this.datesList[i]+'</td>'
            for(var k = 0;k<this.empList.length;k++){
                  y += '<td>'+
                         '<select>'+
                            '<option value="#"></option>'+
                            '<option value="First">First</option>'+
                            '<option value="Second">Second</option>'+
                            '<option value="Third">Third</option>'+
                           '</select>'+
                        '</td>'
                  }
            but = '<td><input type="button" class="btn btn-primary" value="Save Data"  id="btn'+i+'" /></td>'
            z = '</tr>'
            table.innerHTML += x+y+but+z
            x = ""
            y = ""
            z = ""
            if(i!=this.datesList.length){
                          document.getElementById("load").className = "this.datesList.length"
            }
            else{
                          document.getElementById("load").className = ""
            }

        }
        for(var j=0;j<this.datesList.length;j++){
              document.getElementById("btn"+j).addEventListener("click", this.saveData.bind(this));
         }
        this.datesList = []
    }

     saveData(){
        var rows = document.getElementById("tdate").children
        console.log(rows)
        for(var i = 0; i<rows.length;i++){
            var child = rows[i].children
            var date = child[0].innerHTML
            var n = rows[i].children.length
            var row = rows[i] as HTMLTableRowElement
            if(row){
                console.log(child[3].children[0] as HTMLInputElement)
                var shift = []
                for(var j=1;j<child.length-1;j++){
                    var sel = child[j].children[0] as HTMLSelectElement
                    var temp = sel.options[sel.selectedIndex].text
                    if(temp != ""){
                        console.log(temp)
                        shift.push(temp)
                        row.remove()
                    }
                }
                if(shift.length>0)
                this.shifts.push(shift)
            }
            console.log(this.shifts)

        }
        if(this.shifts.length == this.noOfdays[this.monthReverseDict[this.currentMonth]]){
            this.flag = true
        }
     }

     finalSubmitData(){
        var days = this.noOfdays[this.monthReverseDict[this.currentMonth]]
        var month = this.monthReverseDict[this.currentMonth]
//         console.log(this.noOfdays[this.monthReverseDict[this.currentMonth]])
        this.shiftSrv.saveShift(this.cardNums,[month,days],this.shifts).subscribe(result => {console.log("successfullt")},error => {console.log("error")})
        this.flag = false
     }

}
