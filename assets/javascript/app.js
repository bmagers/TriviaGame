$(document).ready(function() {

    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&type=multiple",
        method: "GET"
    }).then(function(response) {
        var questions = response.results;
        $("#question").html(questions[0].question);
        // right answer
        var correctAnswer = $("<div class='answer' id='correct'>").html(questions[0].correct_answer);

        $("#question").append(correctAnswer);
        
        var incorrectAnswers = questions[0].incorrect_answers;
        $.each(incorrectAnswers, function(key, value) {
            var incorrectAnswerDiv = $("<div class='answer'>").html(value);
            $("#question").append(incorrectAnswerDiv);
        });






    });

});