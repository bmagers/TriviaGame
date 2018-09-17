$(document).ready(function() {

    function gamePlay() {

        $.ajax({
            url: "https://opentdb.com/api.php?amount=10&type=multiple",
            method: "GET"
        }).then(function(response) {
            var questions = response.results;
            var current = 0;
            var rightAnswers = 0;
            var wrongAnswers = 0;
            var timeoutAnswers = 0;
            var interval;
            var secondsLeft;

            function askQuestion() {

                if (current < 10) {

                    var category = $("<p>").addClass("category").html(questions[current].category);
                    var question = $("<h2>").html(questions[current].question);
                    $("#question").empty().append(category).append(question);
                    var answers = questions[current].incorrect_answers;
                    var correctAnswer = questions[current].correct_answer;
                    answers.push(correctAnswer);
                    answers.sort();
                    $.each(answers, function(index, value) {
                        var newDiv = $("<div>").addClass("answer").html(value);
                        if (value === correctAnswer) {
                            newDiv.attr("id", "correctAnswer");
                        }
                        $("#question").append(newDiv);
                    });
                    secondsLeft = 15;

                    interval = setInterval(function() {     
                        if (secondsLeft === 0) {
                            timeoutAnswers++;
                            $("#missed").html("Missed: " + timeoutAnswers);
                            $("#timer").text("Time's up!");
                            clearInterval(interval);
                            $("#correctAnswer").addClass("correctAnswer");
                            setTimeout(function() {
                                current++;
                                askQuestion();
                            }, 4000)
                        } else {
                            $("#timer").text(secondsLeft + " seconds left");
                            secondsLeft--;
                        }
                    }, 1000);

                    $(".answer").on("click", function() {
                        clearInterval(interval);
                        $(".answer").off("click"); 
                        if (this.id === "correctAnswer") {
                            rightAnswers++;
                            $("#right").html("Right: " + rightAnswers);
                            $("#timer").text("RIGHT");
                            $(this).addClass("correctAnswer");
                        } else {
                            wrongAnswers++;
                            $("#wrong").html("Wrong: " + wrongAnswers);
                            $("#timer").text("WRONG");
                            $(this).addClass("incorrectAnswer");
                            setTimeout(function() {
                                $("#correctAnswer").addClass("correctAnswer");
                            }, 2000);             
                        }
                        setTimeout(function() {
                            current++;
                            askQuestion();
                        }, 4000);
                    });

                } else {

                    $("#timer").text("Thanks for playing! Press any key to play again.");
                    document.onkeyup = function() {
                        $("#right").text("");
                        $("#wrong").text("");
                        $("#missed").text("");
                        gamePlay();
                    }
                    
                }
            }
            askQuestion();
        });
    }
    gamePlay();

});