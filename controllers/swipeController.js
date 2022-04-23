const SwipeLog = require('../models/swipeLogDataModel');

//pass in the db name to the training planner class
const db = new SwipeLog('swipeLogDetails.db');
const edb = new SwipeLog('employeeDB.db');

//import the user model
const uClass = require('../models/userModel');
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
            'entries' : entries,
            'user' : req.user.user
        });
    }).catch((err) => {
        console.log('error handling employee', err);
    });
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
    edb.edit_employee(req.params.id, req.body.empName, req.body.eID, req.body.ePos, user);
    res.redirect('/');
}



///////////////////////////////////////////////////////
// ACCOUNT RELATED //
///////////////////////////////////////////////////////

exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
}


exports.show_login_page = function(req, res){
    res.render('login', {
        'title': 'Login',
        'background':'#E6E6FA'
    });
}

exports.post_login = function(req, res){
    console.log('serialisedUser wrote', req.session.passport.user);
    res.redirect('/');
}

exports.show_register_page = function(req, res){
    res.render('register', {
        'title' : 'Registration',
        'background' : '#E6E6FA'
    });
}

exports.account = function(req, res){
    res.render('account', {
        'title': 'My Account',
        'background':'#E6E6FA',
        'user' : req.user.user
    });
}


exports.post_new_user = function(req, res){
    // const name = req.body.fname;
    const user = req.body.username;
    const password = req.body.pass;
    console.log("register user: ", user, " / password: ", password);

    if(!user || !password){
        res.send(401, 'No entry for: Full Name, or Email, or Password');
        return;
    }
    uClass.lookup(user, function(err, u) {
        if(u) {
            res.render('500', {
                'title': '500 Error',
                'background':'#E6E6FA',
                'err' : "User exists, please use another email address. If you own this email address and didn't make this account, email us on admin@admin.com"
            });
            return;
        }
        uClass.create(user, password);
        res.redirect('/login');
    })
}