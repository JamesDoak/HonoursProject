const nedb = require('nedb');
const { resolve } = require('path');

class SwipeLog{


    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true})
            console.log('connected to the database', dbFilePath);
            // var user = 'Granted User';
            // this.getUserData(user);
        }
        else {
            this.db = new nedb();
            console.log('started new in-memory datastore');
        }
    }



    addSecondSwipe(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        // var mm = today.getMonth() +1;
        var mm = String(today.getMonth() +1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hours = String(today.getHours()).padStart(2, '0');
        var mins = String(today.getMinutes()).padStart(2, '0');
        var seconds = String(today.getSeconds()).padStart(2, '0');
        var time = today.getTime();

        
        today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;

            this.db.insert({
                employeeName: 'Granted User',
                SwipeStatus: 'Swipe OUT',
                UID: '987CRJWFW39',
                SwipeTime: today,
                AccessG: "GRANTED",
                isAllowed: true,
                isPublic: true,
                time: time
    
            })
            console.log('New swipe entry for Granted User entered into the db.')
        



        
    }

    addGranted(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        // var mm = today.getMonth() +1;
        var mm = String(today.getMonth() +1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hours = String(today.getHours()).padStart(2, '0');
        var mins = String(today.getMinutes()).padStart(2, '0');
        var seconds = String(today.getSeconds()).padStart(2, '0');
        var time = today.getTime();

        
        today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;

            this.db.insert({
                employeeName: 'Granted User',
                SwipeStatus: 'Swipe IN',
                UID: '987CRJWFW39',
                SwipeTime: today,
                AccessG: "GRANTED",
                isAllowed: true,
                isPublic: true,
                time: time
    
            })
            console.log('New swipe entry for Granted User entered into the db.')
        
    }

    // this.db.find({'employeeName':user}).sort({postedAt: -1}).limit(1).exec((err, data)=>{
    //     console.log(data[0]);
    //     if(err){
    //         reject(err);
    //     }else{
    //         resolve(data[0])
    //     }
    // })

    getUserData(user){
        return new Promise((resolve, reject) => {
            this.db.find({'employeeName':user}).exec((err, data)=>{
                data.sort((a, b) => b.time - a.time);
                console.log(data[0]);
                if(err){
                    reject(err);
                }else{
                    resolve(data[0])
                }
            })
        })
    }

    getAllUserData(user){
        return new Promise((resolve, reject) => {
            this.db.find({'employeeName':user}).exec((err, data)=>{
                data.sort((a, b) => b.time - a.time);
                if(err){
                    reject(err);
                }else{
                    resolve(data)
                }
            })
        })
    }


    getEmpSwipeData(id){
        return new Promise((resolve, reject) => {
            this.db.find({ 'UID': id}).exec((err, data)=>{
                data.sort((a, b) => b.time - a.time);
                console.log(data);
                if(err){
                    reject(err);
                }else{
                    resolve(data)
                }
            })
        })
    }

    //basic seed method - may not need to use.
    init(){

    //get todays date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            // var mm = today.getMonth() +1;
            var mm = String(today.getMonth() +1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var hours = String(today.getHours()).padStart(2, '0');
            var mins = String(today.getMinutes()).padStart(2, '0');
            var seconds = String(today.getSeconds()).padStart(2, '0');
            var time = today.getTime();
            
            today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;


            this.db.insert({
                employeeName: 'James Doak',
                SwipeStatus: 'Swipe IN',
                UID: '987CRJI289',
                SwipeTime: today,
                AccessG: "GRANTED",
                isAllowed: true,
                isPublic: true,
                time: time

            })
            console.log('New swipe entry for James Doak entered into the db.')

            this.db.insert({
                employeeName: 'Granted User',
                SwipeStatus: 'Swipe IN',
                UID: '987CRJWFW39',
                SwipeTime: today,
                AccessG: "GRANTED",
                isAllowed: true,
                isPublic: true,
                time: time
    
            })
            console.log('New swipe entry for Granted User entered into the db.')

            this.db.insert({
                employeeName: 'Unknown',
                SwipeStatus: 'Swipe IN',
                UID: 'SDVL28439D',
                SwipeTime: today,
                AccessG: "REFUSED",
                isAllowed: false,
                isPublic: true,
                time: time

            })
            console.log('New swipe entry  Unknown entered into the db.')

            this.db.insert({
                employeeName: 'Jack Black',
                SwipeStatus: 'Swipe IN',
                UID: 'EVE20984DV',
                SwipeTime: today,
                AccessG: "GRANTED",
                isAllowed: true,
                isPublic: true,
                time: time

            })
            console.log('New swipe entry for Jack Black entered into the db.')


    }


    getAllData(){

        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                    // console.log('function all() returns: ', userEntries);
                }
            })
        })
    }


    add_employee(name, uid, position){

        //need to pass in the plan name, and new exercises/reps - plName, ex2, rep2, ex3, rep3

        //get the week number of the passed in date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        // var mm = today.getMonth() +1;
        var mm = String(today.getMonth() +1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hours = String(today.getHours());
        var mins = String(today.getMinutes()).padStart(2, '0');
        var seconds = String(today.getSeconds()).padStart(2, '0');
        var time = today.getTime();
        
        today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;

        //create a new plan
        var newEmployee = 
        {
            EmployeeName: name,
            UID: uid,
            Position: position,
            dateJoined: today,
            isAllowed: true
        }
        console.log('New Employee: ', newEmployee);
        
        this.db.insert(newEmployee, function(err, doc){
            if(err){
                console.log("500", fname);
            } else {
                console.log('New employee inserted', doc);
            }
        })
        
    }


    getAllEmployees(){
            
        return new Promise((resolve, reject) => {
            this.db.find({ }, function(err, employees) {
                if (err){
                    reject (err);
                } else {
                    resolve(employees);
                    console.log('getAllEmployees() returns: ', employees);
                }
            })
        })
    }


    getEmployeeById(id){
        return new Promise((resolve, reject) => {
            this.db.find( { '_id': id} , function(err, entries){
                console.log('ID: ', id)
                if (err){
                reject(err);
                 } else {
            resolve(entries);
            console.log('getEmployeeById() returns ', entries);
                }   
            })
        })
    
    }

    getEmployeeByUID(uid){
        return new Promise((resolve, reject) => {
            this.db.find( { 'UID': uid} , function(err, entries){
                console.log('UID: ', uid)
                if (err){
                reject(err);
                 } else {
            resolve(entries);
            console.log('getEmployeeByUID() returns ', entries);
                }   
            })
        })
    
    }


    edit_employee(id, empName, UID, ePos, user){

        this.db.update({_id : id}, 
                { $set: 
                    {   'EmployeeName' : empName,
                    'UID' : UID,
                    'Position' : ePos
                }
            }, {}, function(err, numUp){
            if(err){
                console.log('error updating document', err);
            } else {
                console.log(numUp, 'Document updated');
            }
        })
}

}

//make the module available.
module.exports = SwipeLog;