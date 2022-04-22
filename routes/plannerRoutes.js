//import the express module
    const express = require('express');
//run an instance of the router class
    const router = express.Router();
//import the controller module
    const controller = require('../controllers/plannerControllers');
    const swipeController = require('../controllers/swipeController');
//import the auth
    const auth = require('../auth/auth');
//import the ensure logged in module
    const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
    const {spawn} = require('child_process');


// Initial index
router.get("/", ensureLoggedIn('/login'), swipeController.landing_page);
// router.get('/filterWeek/:WeekNumber', ensureLoggedIn('/login'),  controller.show_week_filter);
// router.get('/my_planner_weekFilter/:WeekNumber', ensureLoggedIn('/login'),  controller.show_planner_week_filter);
//Account related pages
router.get('/login', controller.show_login_page);
router.post('/login', auth.authorize("/login"), controller.post_login); //implemeting this
router.get('/logout', controller.logout);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/account', ensureLoggedIn('/login'), controller.account);
// router.get('/my_planner', ensureLoggedIn('/login'), controller.my_planner); -- removed, page is now redundant.
// router.get('/my_achievements', ensureLoggedIn('/login'), controller.my_achievements);
// router.get('/public_plans', ensureLoggedIn('/login'),   controller.public_plans);
router.get('/seed', ensureLoggedIn('/login'), swipeController.seed_db);
router.get('/addGranted', ensureLoggedIn('/login'), swipeController.add_granted);
router.get('/addSecondSwipe', ensureLoggedIn('/login'), swipeController.add_second);
//Crud related pages

router.get('/add_employee', ensureLoggedIn('/login'), swipeController.show_add_employee);
router.post('/add_employee', ensureLoggedIn('/login'), swipeController.add_employee)
router.get('/all_employees', ensureLoggedIn('/login'), swipeController.show_all_employees);

router.get('/edit_employee/:id', ensureLoggedIn('/login'), swipeController.show_edit_employee);
router.post('/edit_employee/:id', ensureLoggedIn('/login'), swipeController.edit_employee);

router.get('/view_emp_details/:id', ensureLoggedIn('/login'), swipeController.show_emp_details);


router.get('/foo', (req, res) => {
 
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python3', ['hello.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
     console.log(dataToSend);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
   res.send(dataToSend.toString())
    });
    
   });


// router.get('/add_goal', ensureLoggedIn('/login'), controller.show_add_goal);
// router.post('/add_goal', ensureLoggedIn('/login'), controller.add_goal)
// router.get('/edit_goal/:id', ensureLoggedIn('/login'), controller.show_user_goal);
// router.post('/edit_goal/:id', ensureLoggedIn('/login'), controller.edit_goal);
// router.get('/delete_goal/:id', ensureLoggedIn('/login'), controller.post_delete_goal_home);
// router.get('/delete_goal_achievement/:id', ensureLoggedIn('/login'), controller.post_delete_goal_achievement);
// router.get('/delete_goal_planner/:id', ensureLoggedIn('/login'), controller.post_delete_goal_planner);  removed, page is now redundant.
router.get('/complete_goal/:id', ensureLoggedIn('/login'), controller.complete_this_goal);
// router.get('/share_goal/:id', ensureLoggedIn('/login'), controller.share_this_goal);
//About and Contact pages
// router.get('/aboutUs', controller.about_us_anon); //allow anon users to view the about us page
// router.get('/contactUs', controller.contact_us_anon); //allow anon users to view the contact page
// router.post('/contactUs', controller.post_new_anon_message); //allow anon members to post a new message
// router.get('/messageSuccess', controller.message_success_anon); //allow anon users to view that their message has been sent.
// router.get('/publicPlans', controller.public_plans_anon); //allow anon users to view the public plans page.
// router.get('/about', ensureLoggedIn('/login'),  controller.about_us);
// router.get('/contact', ensureLoggedIn('/login'),  controller.contact_us);
// router.post('/contact',ensureLoggedIn('/login'),   controller.post_new_contactUs);
// router.get('/message_success', ensureLoggedIn('/login'),  controller.message_success);
// router.get('/shared_plan/:id', ensureLoggedIn('/login'),  controller.get_shared_plan);
// router.post('/shared_plan/:id', ensureLoggedIn('/login'),  controller.add_shared_plan);

//error handling - 404 page not found, and 500 internal server error
router.use(function(req, res){

    
    res.status(404);
    res.render('404', {
        'title': 'Error 404',
        'background': '#FFA07A',
        'user' : req.user?.user || null
    });
})
router.use(function(err, req, res, next){
    
    res.status(500);
    res.render('500', {
        'title': '500 Error',
        'background':'#E6E6FA',
        'err' : err,
        'user' : req.user?.user || null
    });
})

//make the router code accessible in the index.js file.
module.exports = router;


