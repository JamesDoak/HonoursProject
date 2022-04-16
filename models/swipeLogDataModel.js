const nedb = require('nedb');

class SwipeLog{


    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true})
            console.log('connected to the database', dbFilePath);
        }
        else {
            this.db = new nedb();
            console.log('started new in-memory datastore');
        }
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
            var seconds = String(today.getSeconds()); 
            
            today = yyyy + '-' + mm + '-' + dd + "-" + hours + ":" + seconds;


            this.db.insert({
                employeeName: 'James Doak',
                UID: '987CRJI289',
                SwipeTime: today,
                AccessG: "Access GRANTED",
                isAllowed: true,
                isPublic: true

            })
            console.log('New swipe entry for James Doak entered into the db.')

            this.db.insert({
                employeeName: 'Unknown',
                UID: 'SDVL28439D',
                SwipeTime: today,
                AccessG: "Access REFUSED",
                isAllowed: false,
                isPublic: true

            })
            console.log('New swipe entry  Unknown entered into the db.')

            this.db.insert({
                employeeName: 'Jack Black',
                UID: 'EVE20984DV',
                SwipeTime: today,
                AccessG: "Access GRANTED",
                isAllowed: true,
                isPublic: true

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