//import the nedb module
const dayjs = require('dayjs');
const nedb = require('nedb');

class TrainingPlanner{


        //pull in the db, and connect to it, else, if none is present, make one.
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

                    // //Add an admin user - complete this once Login/Register has been completed
                    // this.db.insert({
                    //     user: 'admin@admin.com',

                    // })

                    //get todays date
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    // var mm = today.getMonth() +1;
                    var mm = String(today.getMonth() +1).padStart(2, '0');
                    var yyyy = today.getFullYear();
                    
                    today = yyyy + '-' + mm + '-' + dd;

                    
                    //---------------------------------

                    //completed goal - non public
                    this.db.insert({
                        user: 'tony@tiger.com',
                        name: 'Tony',
                         //set a static id, for demonstration purposes.
                        exerciseType: 'Sit-ups (Reps)',
                        repsOrKM: 10,
                        achieved: true,
                        isPublic: false,
                        Date: today,
                        DateAchieved: '2001-01-5',
                        DateShared: '',
                        // week: 'Week 17 - (date)',
                        isAdmin: false

                    })
                    console.log('New goal for tony@tiger.com entered into the db.')

                                        //incomplete goal - non public
                                        this.db.insert({
                                            user: 'little@john.com',
                                            name: 'Little John',
                                             //set a static id, for demonstration purposes.
                                            exerciseType: 'Push-ups (Reps)',
                                            repsOrKM: 50,
                                            achieved: false,
                                            isPublic: false,
                                            Date: today,
                                            DateAchieved: '',
                                            DateShared: '',
                                            // week: 'Week 18 - (date)',
                                            isAdmin: false
                                        })
                                        console.log('New goal for little@john.com entered into the db.')

                                                            //completed goal - public
                                                            this.db.insert({
                                                                user: 'tiny@tim.com',
                                                                name: 'Tiny Tim',
                                                                //set a static id, for demonstration purposes.
                                                                exerciseType: 'Squats (Reps)',
                                                                repsOrKM: 30,
                                                                achieved: true,
                                                                isPublic: true,
                                                                Date: today,
                                                                DateAchieved: '2001-01-19',
                                                                DateShared: '2001-01-22',
                                                                // week: 'Week 19 - (date)',
                                                                isAdmin: false
                                                            })
                                                            console.log('New goal for tiny@tim.com entered into the db.')
                    
                    //completed goal - non public
                    this.db.insert({
                        user: 'jamie@jamie.com',
                        name: 'Jamie',
                         //set a static id, for demonstration purposes.
                        exerciseType: 'Star Jumps (Reps)',
                        repsOrKM: 50,
                        achieved: true,
                        isPublic: false,
                        Date: today,
                        DateAchieved: '2001-01-11',
                        DateShared: '',
                        // week: 'Week 20 - (date)',
                        isAdmin: false
                    })
                    console.log('New goal for jamie@jamie entered into the db.')

                                        //incomplete goal - non public
                                        this.db.insert({
                                            user: 'someone@someone.com',
                                            name: 'Someone',
                                             //set a static id, for demonstration purposes.
                                            exerciseType: 'Cycle (KM)',
                                            repsOrKM: 50, 
                                            achieved: false,
                                            isPublic: false,
                                            Date: today,
                                            DateAchieved: '',
                                            DateShared: '',
                                            // week: 'Week 21 - (date)',
                                            isAdmin: false
                                        })
                                        console.log('New goal for someone@someone.com entered into the db.')

                                                                                //complete goal - public
                                                                                this.db.insert({
                                                                                    user: 'argy@bargy.com',
                                                                                    name: 'Argy Bargy',
                                                                                     //set a static id, for demonstration purposes.
                                                                                    exerciseType: 'Swim (KM)',
                                                                                    repsOrKM: 30,
                                                                                    achieved: true,
                                                                                    isPublic: true,
                                                                                    Date: today,
                                                                                    DateAchieved: today,
                                                                                    DateShared: today,
                                                                                    // week: 'Week 22 - (date)',
                                                                                    isAdmin: false
                                                                                })
                                                                                console.log('New goal for argy@bargy entered into the db.')
                }




        // //get all entries in the database, and return to terminal.
        // getAllEntries(){
        //     return new Promise((resolve, reject) => {
        //         this.db.find({}, function(err, entries){
        //             if(err){
        //                 reject(err);
        //             }else{
        //                 resolve(entries);
        //                 console.log('function all() returns: ', entries);
        //             }
        //         })
        //     })
        // }

        //amend this to suit logged in user, once login/register/sessions have been implemented.
        //something along the lines of this.db.find({ 'user' : loggedInUser })
        getAllUserEntries(user){

            let loggedInUser = user;
            return new Promise((resolve, reject) => {
                this.db.find({ 'user' : loggedInUser }, function(err, userEntries){
                    if(err){
                        reject(err);
                    }else{
                        resolve(userEntries);
                        // console.log('function all() returns: ', userEntries);
                    }
                })
            })
        }


        getFilteredWeekHome(WeekNumber, user){
            console.log('getFilteredWeek - received variable: ', WeekNumber)
           
            
            return new Promise((resolve, reject) => {
                this.db.find({ 'user' : user, 'WeekNumber':WeekNumber, 'achieved': false }, function(err, achievements) {
                    if (err){
                        reject (err);
                    } else {
                        resolve(achievements);
                        // console.log('getIncompletePlans() returns: ', achievements);
                    }
                })
            })
        }
        
        getPublicGoals(){
            
            return new Promise((resolve, reject) => {
                this.db.find({ 'isPublic': true }, function(err, goals) {
                    if (err){
                        reject (err);
                    } else {
                        resolve(goals);
                        console.log('getPublicGoals() returns: ', goals);
                    }
                })
            })
        }

        getMyAchievements(user){

            let loggedInUser = user;
            
            return new Promise((resolve, reject) => {
                this.db.find({ 'user': loggedInUser }, function(err, achievements) {
                    if (err){
                        reject (err);
                    } else {
                        resolve(achievements);
                        // console.log('getMyAchievements() returns: ', achievements);
                    }
                })
            })
        }

        getIncompletePlans(user){

            var loggedInUser = user;
            
            return new Promise((resolve, reject) => {
                this.db.find({ 'user' : loggedInUser, 'achieved': false }, function(err, achievements) {
                    if (err){
                        reject (err);
                    } else {
                        resolve(achievements);
                        // console.log('getIncompletePlans() returns: ', achievements);
                    }
                })
            })
        }


        getGoalById(id){
            return new Promise((resolve, reject) => {
                this.db.find( { '_id': id} , function(err, entries){
                    console.log('ID: ', id)
                    if (err){
                    reject(err);
                     } else {
                resolve(entries);
                console.log('getGoalById() returns ', entries);
                    }   
                })
            })
        
        }


        //Call this from the "My Planner" page, when user clicks the "Mark as complete" link.
        complete_goal(id, user){

            var user = user;
            var id = id;
            

                //get todays date
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                // var mm = today.getMonth() +1;
                var mm = String(today.getMonth() +1).padStart(2, '0');
                var yyyy = today.getFullYear();
                
                today = yyyy + '-' + mm + '-' + dd;

                this.db.update({ _id : id, 'user' : user}, { $set: { "achieved": true, 'DateAchieved' : today } }, {}, function(err, numUp){
                    if(err){
                        console.log('error updating document', err);
                    } else {
                        console.log(numUp, 'Document updated');
                    }
                })
            
        }


        add_shared_plan(id){

        }




        edit_goal(id, ex1, n1, ex2, n2, ex3, n3, user){

                this.db.update({_id : id, 'user' : user}, { $set: 
                    
                    { "goals" : [
                                    { 
                                        'exerciseType1' : ex1,
                                        'repsOrKM1' : n1 
                                    },
                                    { 
                                        'exerciseType2' : ex2,
                                        'repsOrKM2' : n2 
                                    },                                    
                                    { 
                                        'exerciseType3' : ex3,
                                        'repsOrKM3' : n3 
                                    },
                                ]} 
            }, {}, function(err, numUp){
                    if(err){
                        console.log('error updating document', err);
                    } else {
                        console.log(numUp, 'Document updated');
                    }
                })
        }

        
        add_goal(user, trip_start, ex1, n1, ex2, n2, ex3, n3, pName){

            //need to pass in the plan name, and new exercises/reps - plName, ex2, rep2, ex3, rep3

            //get the week number of the passed in date
            let DateEntered = Date.parse(trip_start);
            let xDate = new Date(+DateEntered);
            xDate.setHours(0, 0, 0, 0);
            xDate.setDate(xDate.getDate() + 3 - (xDate.getDay() + 6) % 7);
            var week1 = new Date(xDate.getFullYear(), 0, 4);
            let weekNumber = Math.round(((xDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7) +1;


                //calculate the current week dates for the passed in week number
                var curr = new Date(trip_start); // get current date
                var first = curr.getDate() - curr.getDay() +1; // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6

                var firstday = new Date(curr.setDate(first)).toUTCString().slice(0, 7);
                var lastday = new Date(curr.setDate(last)).toUTCString().slice(0, 7);

                var monday = firstday;
                var sunday = lastday;

                console.log('Monday: ', firstday);
                console.log('Sunday: ', lastday);

                //get the user's name from their email address, to convert it to a name that
                //can be displayed around the site.
                var uName = user.toString();
                var atPosition = uName.indexOf('@');
                var userName = uName.slice(0, atPosition);

            //create a new plan
            var newPlan = 
            {
                user: user,
                name: userName,
                planName: pName,
                goals: [
                {
                    exerciseType1 : ex1,
                    repsOrKM1 : n1
                },
                {
                    exerciseType2 : ex2,
                    repsOrKM2 : n2
                },
                {
                    exerciseType3 : ex3,
                    repsOrKM3 : n3
                }
                ],
                achieved: false,
                isPublic: false,
                Date:trip_start,
                DateAchieved: '',
                DateShared: '',
                WeekNumber: weekNumber.toString(), //must convert to string, as the DB does not like int values.
                Monday : firstday.toString(),
                Sunday : lastday.toString()
            }
            console.log('new plan', newPlan)
            
            this.db.insert(newPlan, function(err, doc){
                if(err){
                    console.log("500", fname);
                } else {
                    console.log('New goals inserted', doc);
                }
            })
            
        }

        
        addContactUsEntry(user, message){

            var newEntry = {
                user: user,
                message: message
            }

            console.log('New message sent', newEntry);

            this.db.insert(newEntry, function(err, doc){
                if(err){
                    console.log("500", fname);
                } else {
                    console.log('New entry inserted', doc);
                }
            })
        }

        addAnonContactMessage(fname, lname, email, message){
            var newEntry = {
                fname : fname,
                lname : lname,
                email : email,
                message: message
            }

            console.log('New message sent', newEntry);

            this.db.insert(newEntry, function(err, doc){
                if(err){
                    console.log("500", fname);
                } else {
                    console.log('New entry inserted', doc);
                }
            })
        }


        share_goal(id, user){

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            // var mm = today.getMonth() +1;
            var mm = String(today.getMonth() +1).padStart(2, '0');
            var yyyy = today.getFullYear();
            
            today = yyyy + '-' + mm + '-' + dd;

            this.db.update({ _id : id, 'user' : user}, { $set: { "isPublic" : true, 'DateShared' : today} }, {}, function(err, numUp){
                if(err){
                    console.log('error updating document', err);
                } else {
                    console.log(numUp, 'Document updated');
                }
            })
        }



        delete_goal(id, user){


            this.db.remove({ _id : id, 'user' : user }, {}, function(err, docsRem){
                if(err){
                    console.log('Error deleting document' + ' ' + id);
                } else {
                    console.log(docsRem, 'Document(s) removed from the database');
                }
            })
        }

        


}

//make the module available.
module.exports = TrainingPlanner;

