const SwipeLog = require('../models/swipeLogDataModel');

//pass in the db name to the training planner class
const db = new SwipeLog('swipeLogDetails.db');

//import the user model
const uClass = require('../models/userModel');

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