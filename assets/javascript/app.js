var triviaQuestions = [{
    question: "What is the name of the main character?",
    answer: ["subaru", "emilia", "rem", "puck"],
    correctanswer: 0
}, {
    question: "What is the main  genre of the tv show?",
    answer: ["action -adventure", "psychological-action", "comedy-romance", "mecha-adventure"],
    correctanswer: 1
}, {
    question: "Who is the main love interest of subaru?",
    answer: ["ram", "emilia", "rem", "puck"],
    correctanswer: 1
}, {
    question: "What is the tv show derived from?",
    answer: ["manhua", "manga", "manhwa", "light novel"],
    correctanswer: 3
}, {
    question: "Where did subaru get transported from?",
    answer: ["NY", "hong kong", "tokyo", "the past"],
    correctanswer: 2
}, {
    question: "What does everyone call emilia?",
    answer: ["grey hair", "elf", "princess", "white witch"],
    correctanswer: 3
}, {
    question: "Who is puck to emilia?",
    answer: ["mother", "friend", "guardian", "sidekick"],
    correctanswer: 2
}, {
    question: "What is anime?",
    answer: ["comicbook", "japanese cartoon", "reality tv", "movie"],
    correctanswer: 1
}];
var answersCorrect, answersWrong, answerTimedOut, nq, tq, endgame, timedOut, seconds, myT;
$("#start, #restart").click(function () {
    $(this).hide();
    startgame();
});
function startgame() {
    answersCorrect = 0;
    answersWrong = 0;
    answerTimedOut = 0;
    tq = 0;
    nq = triviaQuestions.length;
    endgame = false
    newquestion();
}
function newquestion() {
    $(".question").html("<h2>" + triviaQuestions[tq].question + "</h2>");
    $(".answerlist").empty();
    for (var i = 0; i < 4; i++) {
        var choices = $("<div>");
        choices.text(triviaQuestions[tq].answer[i]);
        choices.attr({ "data-index": i });
        choices.addClass("thisChoice");
        $(".answerlist").append(choices);
    }
    //countdown timer here
    seconds = 10;
    myT = setInterval(myTimer, 1000);

    //setup jquery for click answerlist
    $(".thisChoice").click(function () {
        clearInterval(myT);
        aanswer = this.dataset.index;
        //stop timer
        if (aanswer == triviaQuestions[tq].correctanswer) {
            answersCorrect += 1;
            $("#gif").empty();
            $("#gif").append("<img src='./images/youwin2.gif'>");
            sleep(3000);
            $("#gif").empty();
            // u win the question
            // input animted gif
            // the pause is working where the gif should be playing
        }
        else {
            answersWrong += 1;
            $("#gif").empty();
            $("#gif").append("<img src='./images/youlose2.gif'>");
            sleep(3000);
            $("#gif").empty();
            // u lose question
            // input animated gif
            // the pause is working where the gif should be playing
        }
        //answer right or wrong or timer ends
        // check answer routine for all questions
        tq++;
        if (tq == nq) {
            displayStats();
        }
        else {
            newquestion();
        }
        // stack of how many are right and how many are wrong
    })
}
//displays wrong right and wins as well as timed out answers
function displayStats() {
    $(".answerlist").empty();
    $(".question").empty();
    $(".answerlist").html("<p> number of questions correct " + answersCorrect + "<\p>");
    $(".answerlist").append("<p> number of questions wrong " + answersWrong + "<\p>");
    $(".answerlist").append("<p> number of questions timed out " + answerTimedOut + "<\p>");
    $("#restart").show();
}
function myTimer() {
    $("#timer").html("<h3> time remaining: " + seconds + "</h3>");
    seconds--;
    if (seconds < 0) {
        timedOut = true;
        clearInterval(myT);
        tq++;
        answerTimedOut++;
        if (tq == nq) {
            displayStats();
        }
        else {
            newquestion();
        }
    }
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}