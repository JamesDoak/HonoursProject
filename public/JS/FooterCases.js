
switch (!0) {
    
    case /publicPlans/.test(window.location.pathname):
        document.getElementById("publicPlans").classList.add("active");
        break;
    case /aboutUs/.test(window.location.pathname):
        document.getElementById("aboutUs").classList.add("active");
        break;
    case /contactUs/.test(window.location.pathname):
        document.getElementById("contactUs").classList.add("active");
        break;
    case /login/.test(window.location.pathname):
        document.getElementById("login").classList.add("active");
        break;
    case /public_plans/.test(window.location.pathname):
        document.getElementById("public").classList.add("active");
        break;
    case /my_achievements/.test(window.location.pathname):
        document.getElementById("achievements").classList.add("active");
        break;
    // case /my_planner/.test(window.location.pathname):
    //     document.getElementById("myPlans").classList.add("active");
    //     break;
    case /about/.test(window.location.pathname):
        document.getElementById("about").classList.add("active");
        break;
    case /contact/.test(window.location.pathname):
        document.getElementById("contact").classList.add("active");
        break;
    case /edit_goal/.test(window.location.pathname):
        document.getElementById("home").classList.add("active");
        break;
    case /register/.test(window.location.pathname):
            document.getElementById("login").classList.add("active");
        break;
    case /add_goal/.test(window.location.pathname):
        document.getElementById("home").classList.add("active");
        break;
    case /./.test(window.location.pathname):
        document.getElementById("home").classList.add("active");
        break;
    default:
        
    }