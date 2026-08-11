var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).ready(function () {
  $(document).on("keydown", function () {
   if (!started) {
    started = true;
    nextSequence();
   }
  })
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
                }, 1000
            )
        }
    } else{
        var wrongSound = new Audio("./sounds/wrong.mp3")
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
            },
            200
        );
        started = false;
        gamePattern = [];
        level = 0;
        $("#level-title").text("Game Over, Press Any Key to Restart");
    };    
}




function nextSequence() {
    if(started) {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColours[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }
};


$(".btn").click(function(){
    if(started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function playSound(name) {
    if(started){
        switch(name) {
            case "red":
                var redSound = new Audio("./sounds/red.mp3");
                redSound.play();
                break;
            case "blue":
                var blueSound = new Audio("./sounds/blue.mp3");
                blueSound.play();
                break;
            case "green":
                var greenSound = new Audio("./sounds/green.mp3");
                greenSound.play();
                break;
            case "yellow":
                var yellowSound = new Audio("./sounds/yellow.mp3");
                yellowSound.play();
                break;
            default: console.log("fehler");
        }
    }
};

function animatePress(currentColour) {
    if(started) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
            }, 
            100
        )
    }
};



