export class ShiftSchedule{
  cardNum:number;
  date:string;
  shiftType:string;
  constructor(cardNum:number,date:string,shift:string){
    this.cardNum = cardNum;
    this.date = date;
    this.shiftType = shift;
  }

}
