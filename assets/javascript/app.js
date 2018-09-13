$(document).ready(function() {

    var current = 0;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var timeoutAnswers = 0;
    var interval;
    var secondsLeft;

    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&type=multiple",
        method: "GET"
    }).then(function(response) {
        var questions = response.results;
        console.log(questions);

        function askQuestion() {

            if (current < 10) {

                secondsLeft = 15;

                interval = setInterval(function() {     
                    if (secondsLeft === 0) {
                        timeoutAnswers++;
                        $("#timer").text("Time's up!");
                        clearInterval(interval);
                        current++;
                        askQuestion();
                    } else {
                        $("#timer").text(secondsLeft + " seconds left");
                        secondsLeft--;
                    }
                }, 1000);

                var category = $("<p>").html("Category: " + questions[current].category);
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
                        console.log("correct answer is " + value);
                    }
                    $("#question").append(newDiv);
                });
                $(".answer").on("click", function() {
                    clearInterval(interval);
                    $(".answer").off("click"); 
                    if (this.id === "correctAnswer") {
                        rightAnswers++;
                        $("#timer").text("RIGHT");
                        $(this).addClass("correctAnswer");
                    } else {
                        wrongAnswers++;
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
                $("#timer").text("No more questions.");
            }

        }

        askQuestion();

    });

});