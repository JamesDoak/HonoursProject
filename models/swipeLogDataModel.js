const nedb = require('nedb');
const { resolve } = require('path');

class SwipeLog{


    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true})
            console.log('connected to the database', dbFilePath);
            var user = 'Granted User';
            this.getUserData(user);
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
        var hours = String(today.getHours());
        var mins = String(today.getMinutes());
        var seconds = String(today.getSeconds());
        var time = today.getTime();

        
        today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;

            this.db.insert({
                employeeName: 'Granted User',
                SwipeStatus: 'Swipe OUT',
                UID: '987CRJWFW39',
                SwipeTime: today,
                AccessG: "Access GRANTED",
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
        var hours = String(today.getHours());
        var mins = String(today.getMinutes());
        var seconds = String(today.getSeconds());
        var time = today.getTime();

        
        today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;

            this.db.insert({
                employeeName: 'Granted User',
                SwipeStatus: 'Swipe IN',
                UID: '987CRJWFW39',
                SwipeTime: today,
                AccessG: "Access GRANTED",
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

    //basic seed method - may not need to use.
    init(){

    //get todays date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            // var mm = today.getMonth() +1;
            var mm = String(today.getMonth() +1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var hours = String(today.getHours());
            var mins = String(today.getMinutes());
            var seconds = String(today.getSeconds());
            var time = today.getTime();
            
            today = yyyy + '-' + mm + '-' + dd + "  " + hours + ":" + mins + ":" + seconds;


            this.db.insert({
                employeeName: 'James Doak',
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
                AccessG: "Access GRANTED",
                isAllowed: true,
                isPublic: true,
                time: time
    
            })
            console.log('New swipe entry for Granted User entered into the db.')

            this.db.insert({
                employeeName: 'Unknown',
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



}

//make the module available.
module.exports = SwipeLog;