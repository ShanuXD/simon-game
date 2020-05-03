var user_patten = [];
var game_patten = [];
var level = 0;
var start = false;
var button_color = ["red", "blue", "yellow", "green"];


//so if press any key from the key board then the game will start
function start_game() {

    if (!start) {
        $("#level-title").text("level " + 0);
        nextSequence();
        start = true;
    }
}

$(document).keypress(start_game);


//store the chosen color and check if it is the right color
$(".btn").click(function() {
    var chosen_color = $(this).attr("id");
    user_patten.push(chosen_color);
    playSound(chosen_color);
    Animate_btn(chosen_color);
    checkAnswer(user_patten.length - 1);
});
//check if the clicked color is right or worng
//1000 mini sec is lyk  1min 
function checkAnswer(check_index_value) {
    if (game_patten[check_index_value] === user_patten[check_index_value]) {

        if (game_patten.length === user_patten.length) {
            setTimeout(function() {
                //a alert("check");
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game_over");
        $("#level-title").text("Game Over!!! Press any key to play again")
        setTimeout(function() {
            $("body").removeClass("game_over");
        }, 200);

        startOver();
    }

}

function auto_play_selected_color(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}


function nextSequence() {
    user_patten = [];
    level++;
    $("#level-title").text("Level " + level);
    var rand_index = Math.floor(Math.random() * 4);
    var rand_color = button_color[rand_index];
    game_patten.push(rand_color);

    var i = 0;
    setInterval(function() {
        if (i < game_patten.length) {
            auto_play_selected_color(game_patten[i]);
        }
        i++;


    }, 600)
}

function startOver() {

    level = 0;
    start = false;
    game_patten = [];
}

/* below code use for animating the pressed btn and making sound*/

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function Animate_btn(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100)
}