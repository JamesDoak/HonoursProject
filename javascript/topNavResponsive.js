//this function will add a hamburger to the menu, when the screen
//falls under a particular page size.
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//Author: James Doak / Anthony Lockhart - Group 23