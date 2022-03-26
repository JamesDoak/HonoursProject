const Datastore = require ("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserClass {
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

    //init will seed with some users
    init(){

        this.db.insert
        ({
            user: 'Peter@peter.com',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });

        this.db.insert
        ({
            user: 'Ann@ann.com',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
        });

        return this;

    }//end init

    create(username, password) { 
        const that = this;        
        bcrypt.hash(password, saltRounds).then(function(hash) {
        var entry = {             
                user: username,                
                password: hash,            
        };    
        //console.log('user entry is: ', entry);            
    
        that.db.insert(entry, function (err) 
        {
            if (err) 
            {                    
                console.log("Can't insert user: ", username);                
            }            
             });        
        });      
    } //end create

    lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
            if (err) {return cb(null, null);            
            } else {
                if (entries.length == 0) {
                    return cb(null, null);                
                }return cb(null, entries[0]);            
            }        
        });    
    }//end lookup

}//end class

//export and make available

const uClass = new UserClass('userDB.db');
// uClass.init();
module.exports = uClass;