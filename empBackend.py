#!/usr/bin/python
from flask import Flask, url_for, send_from_directory, request,jsonify,session
import logging, os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask import Flask, request
from flask_restful import Resource, Api
import mysql.connector
from datetime import datetime


app = Flask(__name__)
api = Api(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(app, resources={r"/Api/*": {"origins": "http://localhost:4200"}})
file_handler = logging.FileHandler('server.log')
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)


def save():
    mydb = mysql.connector.connect(
      host="localhost",
      user="nshkant",
      passwd="nshkant",
      database = 'empDb'
    )
    cur = mydb.cursor()
    return [cur,mydb]

@app.route('/addDetail', methods = ['POST'])
def addDetail():
    print("hello fun")
    msg = "Data Save into Database"
    empName = request.json['name']
    cardNum = request.json['card']
    try:
        temp = save()
    except:
        msg = "database connection lost"

    cur = temp[0]
    mydb = temp[1]

    queryy = "insert into empDetail (name,cardNum) values('{}',{})".format(empName,cardNum)
    try:
        print("before querry")
        cur.execute(queryy)
        print("after querry")
        mydb.commit()
    except Exception as e:
        print(e)
        msg = e
        print(msg)
    finally:
        cur.close();
        data = {"msg":msg}
        return jsonify(data)


@app.route('/getAllEmp', methods = ['GET'])
def getAllEmp():
    try:
        temp = save()
    except:
        msg = "database connection lost"

    cur = temp[0]
    mydb = temp[1]
    querry = "select * from empDetail;"
    cur.execute(querry)
    records = cur.fetchall()
    print(records)
    print(type(records))
    data = {"msg":records}
    return jsonify(data)


@app.route('/saveShift', methods = ['POST'])
def saveShift():
    msg="successfully saved"
    try:
        temp = save()
    except:
        msg = "database connection lost"

    cur = temp[0]
    mydb = temp[1]
    cardNums = request.json['cardNums']
    daysMonth = request.json['date']
    month = daysMonth[0]
    noOfdays = daysMonth[1]
    print(noOfdays)
    shifts = request.json['shifts']
    print(cardNums, noOfdays,shifts)
    querry = "insert into shiftSchedule (cardNum,date,shift) values"
    values = ""

    for i in range(1,noOfdays+1):
      x = datetime.now()
      year = x.year
      date = str(datetime(year, month, i)).split()[0]
      for k in range(len(cardNums)):
        values += "({},'{}','{}') ,".format(cardNums[k], date, shifts[i-1][k])

    values = values[0:len(values) - 1]
    try:
          print(querry+values+";")
          cur.execute(querry+values+";")
          # print("after querry")
          mydb.commit()
    except:
          # # print(e)
          # msg = e
          print("incorrect querry")
    finally:
          cur.close()
          data = {"msg": msg}
          return jsonify(data)

@app.route('/addEmp', methods = ['POST'])
def addNewEmp():
  msg = "Successfully added"
  option = request.json['opt']
  print(option)
  try:
    temp = save()
  except:
    msg = "database connection lost"
  cur = temp[0]
  mydb = temp[1]
  if option == 1:
    card = request.json['cards']
    emp = request.json['emps']
    print(card,emp)
    querry = "insert into empDetail (name,cardNum) values('{}',{});".format(emp, card)
    print(querry)
    try:
          cur.execute(querry)
          mydb.commit()
    except:
          print("incorrect querry")
    finally:
          cur.close()
          data = {"msg": msg}
          return jsonify(data)

  elif option ==2:
    cards = request.json['cards']
    emps = request.json['emps']
    querry = "insert into empDetail (name,cardNum) values"
    values = ""
    for i in range(len(cards)):
      values += "('{}',{}) ,".format(emps[i], cards[i])
    values = values[0:len(values)-1] + ";"
    print(querry+values)
    try:
          cur.execute(querry+values)
          mydb.commit()
    except:
          print("incorrect querry")
    finally:
          cur.close()
          data = {"msg": msg}
          return jsonify(data)


@app.route('/getCardNum', methods = ['GET'])
def getCardDetail():
  msg = ""
  ename = request.args.get('ename')
  try:
    int(ename)
    flag =  True
  except ValueError:
    flag = False
  try:
    temp = save()
  except:
    msg = "Error in db Connection"
  cur = temp[0]
  mydb = temp[1]

  if flag == False:
    querry = "select cardNum from empDetail where name = '{}'".format(ename)

    try:
      cur.execute(querry)
      card = [item[0] for item in cur.fetchall()]
      print(card)
    except:
      print("incorrect querry")
    finally:
      cur.close()
      data = {"msg": msg, "card": card}
      return jsonify(data)
  else:
    card = int(ename)
    print(card, "hello")
    querry = "select name from empDetail where cardNum = {}".format(card)
    try:
      cur.execute(querry)
      name = [item[0] for item in cur.fetchall()][0]
      print(name)
    except:
      print("incorrect querry")
    finally:
      cur.close()
      data = {"msg": msg, "name": name}
      return jsonify(data)


@app.route('/updateEmp', methods = ['PUT'])
def updateEmpDetail():
  card = request.json['card']
  newName = request.json['name']
  print(card, newName)
  try:
    temp = save()
  except:
    msg = "database connection lost"

  cur = temp[0]
  mydb = temp[1]

  querry = "UPDATE empDetail SET name = '{}' WHERE cardNum = {};".format(newName, card)
  print(querry)
  try:
    cur.execute(querry)
    mydb.commit()
  except:
    print("incorrect querry")
  finally:
    cur.close()
    data = {"msg": "update Successfully","name":newName}
    return jsonify(data)


@app.route('/deleteEmp', methods = ['DELETE'])
def deleteEmpDetail():
  card = request.args.get('card')
  card = int(card)
  try:
    temp = save()
  except:
    msg = "database connection lost"
  querry1 = "DELETE FROM empDetail where cardNum = {} ".format(card)
  querry2 = "DELETE FROM shiftSchedule where cardNum = {} ".format(card)
  cur = temp[0]
  mydb = temp[1]
  try:
    print(querry2)
    cur.execute(querry2)
    mydb.commit()
    cur.execute(querry1)
    mydb.commit()
  except:
    print("incorrect querry")
  finally:
    cur.close()
    data = {"msg": "Delete Successfully"}
    return jsonify(data)


@app.route('/getEmpsDet', methods = ['GET'])
def getEmpsDetail():
  msg = ""
  shift = request.args.get('shift')
  date = request.args.get('date')
  print(shift,date)
  try:
    temp = save()
  except:
    msg = "Error in connection"
  cur = temp[0]
  mydb = temp[1]
  querry = "select * from shiftSchedule where shift = '{}' and date = '{}' ;".format(shift, date)
  try:
    print(querry)
    cur.execute(querry)
    emps = [item[0] for item in cur.fetchall()]
    print(emps)
  except:
    print("incorrect querry")
  finally:
    cur.close()
    data = {"data":emps}
    return jsonify(data)


@app.route('/getEmpShift', methods = ['GET'])
def getEmpShiftDet():
  msg = ""
  card = request.args.get('card')
  date = request.args.get('date')
  print(card,date)
  try:
    temp = save()
  except:
    msg = "Error in connection"
  cur = temp[0]
  mydb = temp[1]
  querry = "select shift from shiftSchedule where cardNum = '{}' and date = '{}' ;".format(card, date)
  try:
    print(querry)
    cur.execute(querry)
    shift = [item[0] for item in cur.fetchall()]
    print(shift)
  except:
    print("incorrect querry")
  finally:
    cur.close()
    if(len(shift)>0):
      data = {"data":shift}
    else:
      data = {'data':"No Record Found"}
    return jsonify(data)



@app.route('/getEmpsShift', methods = ['GET'])
def getEmpsShiftDet():
  msg = ""
  date = request.args.get('date')
  print(date)
  try:
    temp = save()
  except:
    msg = "Error in connection"
  cur = temp[0]
  mydb = temp[1]
  querry = "select shift,cardNum from shiftSchedule where date = '{}' ;".format(date)
  try:
    print(querry)
    cur.execute(querry)
    shift = [item for item in cur.fetchall()]
    print(shift)
  except:
    print("incorrect querry")
  finally:
    cur.close()
    if(len(shift)>0):
      data = {"data":shift}
      return jsonify(data)
    else:
      data = {"data":"No Record Found"}
      return jsonify(data)


@app.route('/updateShift', methods = ['PUT'])
def updateShiftDetail():
  card = request.json['card']
  date = request.json['date']
  newShift = request.json['newShift']
  print(card, date)
  try:
    temp = save()
  except:
    msg = "database connection lost"

  cur = temp[0]
  mydb = temp[1]

  querry = "UPDATE shiftSchedule SET shift = '{}' WHERE cardNum = {} and date = '{}';".format(newShift, card, date)
  print(querry)
  try:
    cur.execute(querry)
    mydb.commit()
  except:
    print("incorrect querry")
  finally:
    cur.close()
    data = {"msg": "update Successfully"}
    return jsonify(data)


@app.route('/deleteShift', methods = ['DELETE'])
def deleteShiftDetail():
  card = request.args.get('card')
  date = request.args.get('date')
  try:
    temp = save()
  except:
    msg = "database connection lost"
  querry1 = "DELETE FROM shiftSchedule where cardNum = {} and date = '{}' ;".format(card, date)
  cur = temp[0]
  mydb = temp[1]
  try:
    print(querry1)
    cur.execute(querry1)
    mydb.commit()
  except:
    print("incorrect querry")
  finally:
    cur.close()
    data = {"msg": "Delete Successfully"}
    return jsonify(data)

if __name__ == '__main__':
        app.run(debug=True)
