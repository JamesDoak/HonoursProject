const Datastore = require ("nedb");

class EmployeeClass{

    constructor(dbFilePath){
        if (dbFilePath)
        {
            //embedded - users will save locally.
            this.db = new Datastore({ filename: dbFilePath, autoload: true});
        }else{
            //in memory datastore - users will not save locally.
            this.db = new Datastore();
        }
    }//end constructor


    init(){

        this.db.insert
        ({
            employeeName: 'James Doak',
            UID: '987CRJI289',
            position: "IT Support",
            dateJoined: new Date(),
            isAuthorised: true
            
        });

        this.db.insert
        ({
            employeeName: 'Jack Black',
            UID: 'EVE20984DV',
            position: "Custodian",
            dateJoined: new Date(),
            isAuthorised: true
            
        });

        return this;

    }//end init


    // need to search the employee db
    // find the employee
    // pull out status

    // need to search the swipe log, look for users most recent entry - add all entries to an Array, use index 0
    // if index 0 == in, change to out


}


const eClass = new EmployeeClass('employeeDB.db');
// uClass.init();
module.exports = eClass;