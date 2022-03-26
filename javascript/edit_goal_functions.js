var exercises = [
    'Pull-ups (Reps)', 
    'Push-Ups (Reps)',
    'Bent Knee Push-up (Reps)',
    'Sit-Ups (Reps)', 
    'Star Jumps (Reps)',
    'Pull-Downs (Reps)',
    'Squats (Reps)',
    'Jump Squats (Reps)', 
    'Lunges (Reps)', 
    'Burpees (Reps)', 
    'Crunches (Reps)',
    'Glute Bridge (Reps)',
    'Supermans (Reps)',
    'Downward-facing Dog (Reps)',
    'Side Lunge (Reps)',
    '5KG Dumbbell Lifts (Reps)', 
    '10KG Dumbbell Lifts (Reps)', 
    '15KG Dumbbell Lifts (Reps)',
    'Side Planks (Mins)',
    'Planks (Mins)',
    'Single Leg Stand (Mins)',
    'Standing Calf Raises (Mins)',
    'Cycle (KM)',
    'Walk (KM)',
    'Brisk Walk (KM)',
    'Run (KM)',
    'Jog (KM)',
    'Swim (KM)',
    'Row (KM)']

    select = document.getElementById( 'ex1' );

    for( exercise in exercises ) {

    select.add( new Option( exercises[exercise] ) );

    };

    
    select = document.getElementById( 'ex2' );

    for( exercise in exercises ) {

    select.add( new Option( exercises[exercise] ) );

    };

    
    select = document.getElementById( 'ex3' );

    for( exercise in exercises ) {

    select.add( new Option( exercises[exercise] ) );

    };


function incrementValue()
{
    var value = parseInt(document.getElementById('n1').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('n1').value = value;
}	

function incrementValue2()
{
    var value = parseInt(document.getElementById('n2').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('n2').value = value;
}	
function incrementValue3()
{
    var value = parseInt(document.getElementById('n3').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('n3').value = value;
}	
