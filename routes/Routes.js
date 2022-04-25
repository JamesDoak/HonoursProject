//import the express module
    const express = require('express');
//run an instance of the router class
    const router = express.Router();
//import the controller module
    // const controller = require('../controllers/plannerControllers');
    const swipeController = require('../controllers/swipeController');
    const accountController = require('../controllers/accountController');
//import the auth
    const auth = require('../auth/auth');
//import the ensure logged in module
    const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
    // const {spawn} = require('child_process');


// Initial index
router.get("/", ensureLoggedIn('/login'), swipeController.landing_page);

//Account related pages
router.get('/login', accountController.show_login_page);
router.post('/login', auth.authorize("/login"), accountController.post_login);
router.get('/logout', accountController.logout);
router.get('/register', accountController.show_register_page);
router.post('/register', accountController.post_new_user);
router.get('/account', ensureLoggedIn('/login'), accountController.account);

router.get('/seed', ensureLoggedIn('/login'), swipeController.seed_db);
router.get('/addGranted', ensureLoggedIn('/login'), swipeController.add_granted);
router.get('/addSecondSwipe', ensureLoggedIn('/login'), swipeController.add_second);

router.get('/edit_employee/:id', ensureLoggedIn('/login'), swipeController.show_edit_employee);
router.post('/edit_employee/:id', ensureLoggedIn('/login'), swipeController.edit_employee);
router.get('/view_emp_details/:id', ensureLoggedIn('/login'), swipeController.show_emp_details);
// router.get('/addUserSwipe', ensureLoggedIn('/login'), swipeController.add_user_swipe);
router.get('/add_employee', ensureLoggedIn('/login'), swipeController.show_add_employee);
router.post('/add_employee', ensureLoggedIn('/login'), swipeController.add_employee);
router.get('/all_employees', ensureLoggedIn('/login'), swipeController.show_all_employees);

router.get('/add_employee/swiped', ensureLoggedIn('/login'), swipeController.show_swiped);
router.post('/add_employee/swiped', ensureLoggedIn('/login'), swipeController.add_employee);

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


