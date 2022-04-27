const SwipeLog = require('../models/swipeLogDataModel');

//pass in the db name to the training planner class
const db = new SwipeLog('swipeLogDetails.db');
const edb = new SwipeLog('employeeDB.db');

//import the user model
const {spawn} = require('child_process');


///////////////////////////////////////////////////////
// INDEX //
///////////////////////////////////////////////////////
exports.landing_page = function(req, res){

//REWORK THIS
    db.getAllData(req.user.user).then((list) => {
        list = list.sort((a, b) => b.time - a.time);
        //create a sorted list that will display the most recent entries first
        res.render('index', {
            'title':'SwipeLog',
            'background':'#E6E6FA',
            'allData' : list,
            'user' : req.user.user
            });
            console.log('promise resolved');
        }).catch((err) => {
            console.log('promise rejected', err);
    })
}

exports.seed_db = function(req, res){
    db.init();
    res.redirect('/');
}

exports.add_granted = function(req, res){
    db.addGranted();
    res.redirect('/');
}

exports.add_second = function(req, res){
    db.addSecondSwipe();
    res.redirect('/');
}

exports.add_employee = function(req, res){
    //post add goal, enter values from screen

    var passedUID = req.body.eID;
    console.log("Passed UID: ", passedUID);

    //check if user exists
    edb.getEmployeeByUID(passedUID).then((entries) => {
        //if exists, dont add user
        if(entries.length > 0){
            console.log("Sorry, employee exists");
            res.render('addEmployee', {
                'title': 'Add a new Employee',
                'background':'#E6E6FA',
                'user' : req.user.user,
                'err' : 'Sorry, user exists'
            });
        }
        //else, add user.
        else{
            console.log("Employee Added.");
            edb.add_employee(req.body.empName, req.body.eID, req.body.ePos);
            res.redirect('/');
        }
    })
}

exports.show_add_employee = function(req, res){
    res.render('addEmployee', {
        'title': 'Add a new Employee',
        'background':'#E6E6FA',
        'user' : req.user.user
    });
}


exports.show_swiped = function(req, res){

    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python3', ['hello.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        console.log(data.toString());
        dataToSend = String(data);
        console.log(dataToSend);
    });
    
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(dataToSend);
        console.log(`child process close all stdio with code ${code}`
    );
    // send data to browser
    res.render('addEmployee', {
        'title': dataToSend,
        'data': dataToSend,
        'background':'#E6E6FA',
        'user' : req.user.user
    })
    });
}


exports.show_all_employees = function(req, res){
    
    var user = req.user.user;

        edb.getAllEmployees().then((list) => {
        //sort the list showing most recent entries first.
        // list = list.filter(recentEntry => (recentEntry.DateShared)).sort(function(a, b){
        //     return new Date(b.DateShared) - new Date(a.DateShared);
        // });
        var count = Object.keys(list).length;
        res.render('all_employees', {
        'title':'All Employees',
        'background':'#E6E6FA',
        'employees' : list,
        'count' : count,
        'user' : user
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}



exports.show_emp_details = function (req, res) {
    console.log('filtering employee_id', req.params.id);

    let UID = req.params.id;
    db.getEmpSwipeData(UID).then((entries) => {
        res.render('show_emp_det', {
            'title': 'Employee Swipe Log',
            'uid' : UID,
            'entries' : entries,
            'user' : req.user.user,

        });
        console.log(edb.getEmpNameByUID);
    }).catch((err) => {
        console.log('error handling employee', err);
    });
}


exports.show_add_employee_swipe = function (req, res) {
    console.log('filtering employee_id', req.params.id);

    let employeeID = req.params.id;
    edb.getEmployeeById(employeeID).then((entries) => {
        res.render('employee_swipe', {
            'title': 'employee swipe',
            'entries' : entries,
            'user' : req.user.user
        });
    }).catch((err) => {
        console.log('error handling employee', err);
    });
}


exports.add_swipe = function(req, res){
    var isAllowed = Boolean(req.body.eAllowed);
    var user = req.user.user;

    if(isAllowed == true){
        db.add_user_swipe(req.params.id, req.body.empName, req.body.eID, user);
        res.redirect('/');
    }
    else if(isAllowed == false){

        db.add_revoked_entry(req.params.id, req.body.empName, req.body.eID, user);
        res.redirect('/');
        // res.render('500', {
        //     'title': 'Revoked',
        //     'empError':'Permission to swipe DENIED - Employee privileges have been revoked.',
        //     'user' : req.user.user
        // });
    }



}


exports.show_edit_employee = function (req, res) {
    console.log('filtering employee_id', req.params.id);

    let employeeID = req.params.id;
    edb.getEmployeeById(employeeID).then((entries) => {
        res.render('edit_employee', {
            'title': 'Edit Employee',
            'entries' : entries,
            'user' : req.user.user
        });
    }).catch((err) => {
        console.log('error handling employee', err);
    });
}


exports.edit_employee = function(req, res){
    var user = req.user.user;
    edb.edit_employee(req.params.id, req.body.empName, req.body.eID, req.body.ePos, Boolean(req.body.eAllowed), user);
    res.redirect('/all_employees');
}
