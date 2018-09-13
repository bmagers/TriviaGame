$(document).ready(function() {

    function timer(seconds) {
        var interval = setInterval(function() {          
            if (seconds === 0) {
                $("#timer").text("Time's up!");
                clearInterval(interval);
            } else {
                $("#timer").text(seconds + " seconds left");
                seconds--;
            }
        }, 1000);
    }

    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&type=multiple",
        method: "GET"
    }).then(function(response) {
        var questions = response.results;
        var category = $("<p>").html("Category: " + questions[0].category);
        var question = $("<h2>").html(questions[0].question);
        $("#question").append(category).append(question);
        // right answer
        var correctAnswer = $("<div class='answer' id='correct'>").html(questions[0].correct_answer);

        $("#question").append(correctAnswer);
        
        var incorrectAnswers = questions[0].incorrect_answers;
        $.each(incorrectAnswers, function(key, value) {
            var incorrectAnswerDiv = $("<div class='answer'>").html(value);
            $("#question").append(incorrectAnswerDiv);
        });


        timer(15);



    });

});