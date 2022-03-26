
//import the training model component
const TrainingPlanner = require('../models/plannerDataModel');
//pass in the db name to the training planner class
const db = new TrainingPlanner('PlannerDatabase.db');
//import the user model
const uClass = require('../models/userModel');


///////////////////////////////////////////////////////
// INDEX //
///////////////////////////////////////////////////////
exports.landing_page = function(req, res){


    db.getIncompletePlans(req.user.user).then((list) => {
        //create a sorted list that will display the most recent entries first
        list = list.filter(userGoal => !(userGoal.complete)).sort(function(a, b){
            return new Date(a.Date) - new Date(b.Date);
        });
        var count = Object.keys(list).length;
        res.render('index', {
            'title':'Home',
            'background':'#E6E6FA',
            'userGoals' : list,
            'count' : count,
            'user' : req.user.user
            });
            console.log('promise resolved');
        }).catch((err) => {
            console.log('promise rejected', err);
    })
}

exports.show_week_filter = function(req, res){

    console.log('filtering by week number', req.params.WeekNumber);
    let user = req.user.user
    let week = req.params.WeekNumber;
    db.getFilteredWeekHome(week, user).then((goals) => 
    {
        goals = goals.filter(userGoal => !(userGoal.complete)).sort(function(a, b){
            return new Date(a.Date) - new Date(b.Date);
        });
        res.render('index', {
            'title':'Home',
            'background':'#E6E6FA',
            'userGoals' : goals,
            'user' : user
            });
            console.log('promise resolved', goals);
        }).catch((err) => {
            console.log('promise rejected', err);
    })

}

// exports.show_planner_week_filter = function(req, res){

//     console.log('filtering by week number', req.params.WeekNumber);

//     let week = req.params.WeekNumber;
//     db.getFilteredWeek(week).then((goals) => 
//     {
//         res.render('my_planner', {
//             'title':'My Planner',
//             'background':'#E6E6FA',
//             'userEntries' : goals,
//             'user' : req.user.user
//             });
//             console.log('promise resolved', goals);
//         }).catch((err) => {
//             console.log('promise rejected', err);
//     })

// }

exports.seed_db = function(req, res){
    db.init();
    res.redirect('/');
}

exports.my_achievements = function(req, res){

    db.getMyAchievements(req.user.user).then((list) => {
    //sort the list showing most recent entries first.
    list = list.filter(achievement => (achievement.DateAchieved)).sort(function(a, b){
        return new Date(a.DateAchieved) - new Date(b.DateAchieved);
    });
    var count = Object.keys(list).length;
    res.render('my_achievements', {
        'title':'My Achievements',
        'background':'#E6E6FA',
        'achievements' : list,
        'count' : count,
        'user' : req.user.user
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}

exports.public_plans = function(req, res){
    
    var user = req.user.user;

    db.getPublicGoals().then((list) => {
        //sort the list showing most recent entries first.
        list = list.filter(recentEntry => (recentEntry.DateShared)).sort(function(a, b){
            return new Date(b.DateShared) - new Date(a.DateShared);
        });
        var count = Object.keys(list).length;
    res.render('public_plans', {
        'title':'Public Plans',
        'background':'#E6E6FA',
        'goals' : list,
        'count' : count,
        'user' : user
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}

exports.public_plans_anon = function(req, res){
    

    db.getPublicGoals().then((list) => {
        //sort the list showing most recent entries first.
        list = list.filter(recentEntry => (recentEntry.DateShared)).sort(function(a, b){
            return new Date(b.DateShared) - new Date(a.DateShared);
        });
        var count = Object.keys(list).length;
    res.render('public_plans', {
        'title':'Public Plans',
        'background':'#E6E6FA',
        'goals' : list,
        'count' : count
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}


exports.get_shared_plan =  function(req, res){

    let user = req.user.user;
    
    console.log('filtering goal _id', req.params.id);

    let goal = req.params.id;
    db.getGoalById(goal).then((entries) => {
        res.render('use_shared_plan', {
            'title': 'Edit Goal',
            'entries' : entries,
            'user' : user
        });
    }).catch((err) => {
        console.log('error handling goal ', err);
    });

}

exports.add_shared_plan = function(req, res){
    //post add goal, enter values from screen
   
    console.log();
    db.add_goal(req.user.user, req.body.trip_start, req.body.ex1, req.body.n1, req.body.ex2, req.body.n2, req.body.ex3, req.body.n3, req.body.pName);
    res.redirect('/');

}

//implementing this -------------------------------------------------------------------------------
// exports.use_shared_plan = function(req, res){
    
//     console.log('passed object id ', )
//     db.use_shared_plan(objectID);
// }

// exports.my_planner = function(req, res){
//     db.getAllUserEntries(req.user.user).then((list) => {
//             //sort the list showing most recent entries first.
//     list = list.filter(recentEntry => (recentEntry.Date)).sort(function(a, b){
//         return new Date(b.Date) - new Date(a.Date);
//     }); 
//     // list = list.filter(sortAchieved => (sortAchieved.achieved)).sort(function(a, b){
//     //     return new Date(b.achieved) - new Date(a.achieved);
//     // });
//     var count = Object.keys(list).length;
//     res.render('my_planner', {
//         'title':'My Planner',
//         'background':'#E6E6FA',
//         'userEntries' : list,
//         'count' : count,
//         'user' : req.user.user
//         });
//         console.log('promise resolved');
//     }).catch((err) => {
//         console.log('promise rejected', err);
// })
// }

///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
// CRUD RELATED //
///////////////////////////////////////////////////////

exports.show_add_goal = function(req, res){
    res.render('add_goal', {
        'title': 'Add a new Goal',
        'background':'#E6E6FA',
        'user' : req.user.user
    });
}


exports.show_user_goal = function (req, res) {
    console.log('filtering goal _id', req.params.id);

    let goal = req.params.id;
    db.getGoalById(goal).then((entries) => {
        res.render('edit_goal', {
            'title': 'Edit Goal',
            'entries' : entries,
            'user' : req.user.user
        });
    }).catch((err) => {
        console.log('error handling goal ', err);
    });
}


exports.edit_goal = function(req, res){
    var user = req.user.user;
    console.log('ID: ' + req.params.id + ' | ', 
                'Exercise: '+req.body.exercises + " | ", 
                'Reps Or KM: '+req.body.repsorkm,
                'isPublic: '+req.body.isPublic);
    db.edit_goal(req.params.id, req.body.ex1, req.body.n1, req.body.ex2, req.body.n2, req.body.ex3, req.body.n3, user);
    res.redirect('/');
}

// exports.delete_goal = function(req, res, _id){
//     db.delete_goal(_id);
//     res.redirect('/my_planner');
// }

exports.post_delete_goal_home = function(req, res){
    var user = req.user.user;
    db.delete_goal(req.params.id, user)
    res.redirect('/');
}


exports.post_delete_goal_achievement = function(req, res){
    var user = req.user.user;
    db.delete_goal(req.params.id, user)
    res.redirect('/my_achievements');
}

// exports.post_delete_goal_planner = function(req, res){
    
//     db.delete_goal(req.params.id)
//     res.redirect('/my_planner');
// }

exports.complete_this_goal = function(req, res){

    var user = req.user.user;

    db.complete_goal(req.params.id, user);
    res.redirect('/my_achievements');
    
}

exports.share_this_goal = function (req, res){
    var user = req.user.user;
    db.share_goal(req.params.id, user);
    res.redirect('/public_plans');
}
///////////////////////////////////////////////////////


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

///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
// ABOUT / CONTACT US RELATED /////////////////////////
///////////////////////////////////////////////////////
exports.message_success = function(req, res){
    res.render('message_success', {
        'message' : 'Thank you for your comments.',
        'title' : 'Message Sent',
        'user' : req.user.user
    })
}

exports.message_success_anon = function(req, res){
    res.render('message_success_anon', {
        'message' : 'Thank you for your comments.',
        'title' : 'Message Sent',
    })
}

exports.post_new_contactUs = function(req, res) {
    db.addContactUsEntry(req.user.user, req.body.message);
    res.redirect('/message_success');
}


exports.post_new_anon_message = function(req, res){
    db.addAnonContactMessage(req.body.fname, req.body.lname, req.body.email, req.body.message);
    res.redirect('/messageSuccess');
}

exports.add_goal = function(req, res){
    //post add goal, enter values from screen
   
    console.log();
    db.add_goal(req.user.user, req.body.trip_start, req.body.ex1, req.body.n1, req.body.ex2, req.body.n2, req.body.ex3, req.body.n3, req.body.pName);
    res.redirect('/');

}


exports.about_us = function(req, res){
    res.render('about', {
        'title': 'About Us',
        'background':'#E6E6FA',
        'url' : '/about',
        'user' : req.user.user
    });
}

exports.about_us_anon = function(req, res){
    res.render('about', {
        'title': 'About Us',
        'background':'#E6E6FA',
        'url' : '/aboutUs',
    });
}

exports.contact_us = function(req, res){
    res.render('contact', {
        'title': 'Contact Us',
        'background':'#E6E6FA',
        'user' : req.user.user
    });
}

exports.contact_us_anon = function(req, res){
    res.render('contact_anon', {
        'title': 'Contact Us',
        'background':'#E6E6FA'
        
    });
}
///////////////////////////////////////////////////////

// exports.four_oh_four_error = function(req, res){
//     res.status(404);
//     res.render('404', {
//         'title': 'Error 404',
//         'background': '#FFA07A',
//         'user' : req.user.user
//     });
// }

// exports.five_hundred_error = function(req, res){
        
//     res.status(500);
//     res.render('500', {
//         'title': '500 Error',
//         'background':'#E6E6FA',
//         'err' : err,
//         'user' : req.user.user
//     });
// }