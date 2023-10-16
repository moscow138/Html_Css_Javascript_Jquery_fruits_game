var playing = false;
var score;
var trialsleft;
var step ;
var action;
var fruits = ['apple','orange','pear','peach','watermelon','grapes','cherries','mango','banana'];

$(document).ready(function(){
    
    //click on start reset button
    $("#startreset").click(function() {
        
          //check if we are are playing
    if(playing == true){
       
        //reload page
        location.reload();
    
        
       }else {
           
        document.getElementById("slicesound").play();
           //set playing to true
           playing = true;
           
           $("#gameover").hide();
           
           //set score to 0
           score =0;
           $("#scorevalue").html(score);
           
           //display trials left
           
           $("#trialsleft").show();
           //set trialsleft to 3
           trialsleft = 3;
           
           addHearts(); //function
           
           //change button text to Reset button
           $("#startreset").html("Reset Game");
           
           //Start sending fruits
           startAction();       
         
       }     
        
    });
    
         //increase score
        $("#fruit1").mouseover(function(){
            score++;
            
            $("#scorevalue").html(score);
            
            //play slice sound
            document.getElementById("kongfu").play();
            
            //stop fruits
            clearInterval(action);
            
            //hide fruit with animation


        $("#fruit1").hide({effect:'explode'});
            
            //send new fruits
            setTimeout(startAction,500);
        
            
        }); 
           
  //FUNCTION
function addHearts() {
    
    $("#trialsleft").empty();
     for(i=0; i< trialsleft; i++) {
               
               $("#trialsleft").append('<img src="images/heart.png" class="life"> ');
           } 
}

function startAction() {
    
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left' : 460 * Math.random(), 'top': -60});
    
    
//generate a random step
step = 1+ Math.round(5*Math.random());
    
    //move fruits down every 10ms
    
    action = setInterval(function(){
        
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        
           //check if fruit is too low
    if($("#fruit1").position().top > $("#fruitsContainer").height()) {
       
        //check if trial is left
       if(trialsleft > 1 ) {
       
            $("#fruit1").show();
             chooseFruit();
    $("#fruit1").css({'left' : 460 * Math.random(), 'top': -60});
    
//generate a random step
step = 1+ Math.round(5*Math.random());
           
           //reduce life by 1
           trialsleft --;
           
           //populate trials box
           addHearts();
          
         }else {
             
             playing = false; //we are not playing anymore
             
              document.getElementById("slicesound").pause();
             
             //show gameover box
             $("#gameover").show();
             $("#gameover").html('<p> game over </p> <p> your score is: ' + score +'</p>');
             
             //hide life box
             $("#trialsleft").hide();
             
             //change startreset button to start
             $("#startreset").html("Start Game");
             
             //stop fruits from coming
             stopAction();
             
         }     
        
       }
        
    },10);
   
}

function chooseFruit() {

    $("#fruit1").attr('src', 'images/'+fruits[Math.round(8*Math.random())] +'.png');
    
}

function stopAction() {
    
    clearInterval(action);
    $("#fruit1").hide();
}



    
});