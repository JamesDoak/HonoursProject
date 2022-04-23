<!-- # WPD2-CW2
This repo has been created specifically to hold my Web Platform Development 2 coursework - Training Planner

# Mission Statement

In the age of Covid 19, we've grown accustomed to being indoors, largely due to the ever recurring lockdown's. With this, we've unfortunately become less active than we once were. Our aim is to hopefully allow you to create some exercise plans of your own, where you can keep a record of your current and achieved goals, and even share them with others!

# Installation
In order to install all dependencies required for your local environment, please enter the following into your terminal:

```npm install```

To **run** the program just type the following command into the terminal:

```npm run build``` 

This will start the server at the following address:

```http://www.localhost:4000/```

To **close** the program, press the following buttons:

```CTRL+C``` - when prompted enter ``` Y ``` then hit ```Enter```
This will terminate the server.

# What does this application do?

## Registration

If you'd like to use our application, we need you to make an account with us.

Patrons will be asked to enter their:

        - Email Address
        - Password (this will be salted, and will not be saved in the clear)

![image](https://user-images.githubusercontent.com/72918556/117379272-075e0e80-aecf-11eb-818e-5486b3594439.png)

Registration View




## Login

In order for our application to log your information, we require that you log into the system. 

Users will be asked to log in with their:
    
        - Email Address
        - Password

![image](https://user-images.githubusercontent.com/72918556/117379449-6a4fa580-aecf-11eb-851e-f45d53364b0b.png)

Login View




## Home

The home page has been designed to display all open plans entered by the user, filtered by descending date, and will provide a running total of open plans the user currently needs to complete.

Functionally, this page will allow users to:

    - Add a new weekly plan, assigning a maximum of 3 exercises per plan, with their respective reps/km/minutes.
    - Mark their plan as having been completed.
    - Share plans with others, viewable by both anonymous, and logged in users. *this is irreversible*
    - Edit their selected plan.
    - Delete their selected plan. *this is irreversible*
    - Filter their plans by week - showing every other plan for that selected week. (extra feature)
    - Remove the week filter.
    - Provide a breakdown on screen, of their plan details, showing:
        - Plan name
        - Date entered
        - Week number
        - Date range of the selected week
        - All exercises, with their respective reps/km/minutes.
        
![image](https://user-images.githubusercontent.com/72918556/117508020-d12c9780-af7f-11eb-9cc9-3a9dda65a7ac.png)

UserDashboard View



## My Achievements

Here, you'll be able to view all goals you've completed, with a running total of your achieved trophies.

Functionally speaking, this page will show:
  
    - The plan name.
    - The exercises assigned to the plan.
    - The total reps/km/minutes assigned to the exercise.
    - The date it was set to be completed by.
    - The week it was planned for.
    - The planned week date range.

![image](https://user-images.githubusercontent.com/72918556/117508108-f02b2980-af7f-11eb-8581-251039715d24.png)

MyAchievements View




## Public Plans

Part of our aim is to allow users to share their goals with other people on the site, in the hopes of incentivising them to attempt these goals themselves! Of course, having achieved your goals, you've every right to gloat too!

Functionally, this page will be available to both anonymous, and logged in users, allowing them to view:
     
     - Show the current amount of public plans we have in the system.
     - The date the plan was shared, and who shared it.
     - The exercises associated with the plan, and their respective reps/km/minutes.
     - Allow the user to set the plan they like, as a new plan of their own. (extra feature)
     
![image](https://user-images.githubusercontent.com/72918556/117546357-f07c0100-b021-11eb-8fd8-09324183066c.png)

PublicPlans View




## About (Extra)

Here, you'll view our mission statement, and current location.

Functionally, this page is available to both anonymous, and logged in users.

![image](https://user-images.githubusercontent.com/72918556/117378951-53f51a00-aece-11eb-9946-1cb5eae24377.png)

AboutUs View




## Contact

If you have any feedback you want to relay to us, or wish to report any bugs, you can do it here, if you so choose. We aim to get back to you as soon as humanly possible!

Functionally, this page is available to both anonymous, and logged in users.

However, there are two independant pages for these user types; 
One will be suited to anon users, where they will be required to enter their:

     - First Name
     - Last Name
     - Email Address
     - Message

![image](https://user-images.githubusercontent.com/72918556/117379194-d8e03380-aece-11eb-8605-2ff64f01e872.png)

AnonContact View
     
   
The other will be suited to logged in users, where they will only be required to enter their message, as their email address will be logged and entered on submission. Like so:

![image](https://user-images.githubusercontent.com/72918556/117378985-68391700-aece-11eb-8de6-f3ae97b1f6a7.png)

LoggedInContact View




## Add Plan

As mentioned, users may enter a new plan, therefore, functionally, this page will allow users to:

    - Select a date (which is used for both sorting, and determining the week)
    - Enter a plan name (with a max char count of 8)
    - Select three exercises, and assign reps/km/minutes to them.

![image](https://user-images.githubusercontent.com/72918556/117379531-90754580-aecf-11eb-9c47-7e949543ab55.png)

AddPlan View



## Edit Plan

Edit plan allows users to edit whichever plan theyve chosen, but will only allow them to change:

    - All three exercises
    - Respective reps/km/minutes

![image](https://user-images.githubusercontent.com/72918556/117379579-a84cc980-aecf-11eb-8377-4608959effe5.png)

EditPlan View


## Functionality as required by the scope that has been implemented.

        - The breakdown of exercise goals, linked to the week - forcing a minimum of 3 goals per plan.
        - Achivement status.
        - Date range of the week that the plan is for.
        - Plans can be added (with goals).
        - Plans can be modified (with goals).
        - Plans can be deleted.
        - Plans can be defined for weeks, months, and even years in the future.
        - Plans can be "achieved", or in other words, completed.
        - Users can see their incomplete plans, and goals, coupled with the week they were planned for.
        - Plans can be shared to the public domain (technically share, though not using a share link).

        - The application was designed using Node.js, and Node express, running NedB for storage.

        - Install guide has been implemented.
        - Run guide has been implemented.
        - Git has been utilised appropriately during development.



## Additional functionality not requested in initial scope


        - Browsing as an anonymous user.
        - Filtering the weeks by selected week.
        - A count, outlining how many plans there are by the user, how many achievements they have, and the amount of public plans in the system.
        - Google map integration for the about us page.
        - A contact form for user messages.
        - Extensive custom CSS.
        - Users have an option in "Public Plans" to "Set this plan" directly, pulling the information into a new post.
 -->
