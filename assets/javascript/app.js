$(document).ready(function () {
    var index = 0;
    var countdownTimer = {
        time: 30,
        reset: function () {
            this.time = 30;
            $('.timer').html('<h4>' + this.time + ' seconds remaining</h4>');
        },
        start: function () {
            counter = setInterval(countdownTimer.count, 1000);
        },
        stop: function () {
            clearInterval(counter);
        },
        count: function () {
            countdownTimer.time--;
            console.log(countdownTimer.time);

            if (countdownTimer.time >= 0) {
                $('.timer').html('<h4>' + countdownTimer.time + ' seconds remaining</h4>');
            }
            else {
                index++;
                answerWrong();
                countdownTimer.reset();
                if (index < questionArray.length) {
                    loadQuestion(index);
                } else {
                    $(".answerchoice").hide();
                    showScore();
                }
            }
        }
    };








    var correct = 0;
    var wrong = 0;
    var q1 = {
        question: 'What is jQuery?',
        possibleAnswers: ['A Python library for web scraping',
            'A fast, small, and feature-rich JavaScript library that simplifies DOM traversal and manipulation, and event handling',
            'A Content Delivery Network (CDN) for serving web pages faster'],

        flags: [false, true, false],
        answer: 'A fast, small, and feature-rich JavaScript library that simplifies DOM traversal and manipulation, and event handling'
    };

    var q2 = {
        question: 'What is an array?',
        possibleAnswers: ['A function that returns a single value',
            'A data type that can store only one value at a time',
            'A data type that can be used to store multiple values in a single variable'],
        flags: [false, false, true],
        answer: 'C. A data type that can be used to store multiple values in a single variable'
    };

    var q3 = {
        question: 'Which loop type in JavaScript always executes its code block at least once, even if the condition is false?',
        possibleAnswers: ['for loop',
            'while loop',
            'do/while loop'],
        flags: [false, false, true],
        answer: 'do/while loop'
    };

    var q4 = {
        question: 'How can you rename an imported variable or function in JavaScript modules?',
        possibleAnswers: ['Using the “as” keyword',
            'Using the “rename” keyword',
            'Using the “alias” keyword'],
        flags: [true, false, false],
        answer: 'Using the “as” keyword'
    };

    var q5 = {
        question: 'What is the purpose of scales in D3.js?',
        possibleAnswers: ['To create animation effects',
            'To map data to visual elements such as position or size',
            'To display the visualization in full screen'],
        flags: [false, true, false],
        answer: 'To map data to visual elements such as position or size'
    }





    var questionArray = [q1, q2, q3, q4, q5];

    function loadQuestion(questionSelection) {
        console.log(questionSelection);
        countdownTimer.reset();
        $(".question").html("<h3>" + questionArray[questionSelection].question + "</h3>");
        $("#buttonA").text(questionArray[questionSelection].possibleAnswers[0]).show();
        $("#buttonB").text(questionArray[questionSelection].possibleAnswers[1]).show();
        $("#buttonC").text(questionArray[questionSelection].possibleAnswers[2]).show();



    }




    function setup() {
        index = 0;
        $('.question').append('<button id="startButton">Start</button>');
        $('#startButton').on('click', function () {
            $(this).hide();
            countdownTimer.start();
            loadQuestion(index);
        });
    }

    function getAnswer() {


        $('.answerchoice').on('click', function () {
            console.log('alert', index);
            index++;
            console.log('click', index);
            $(".question").text('');
            $("#buttonA").text('');
            $("#buttonB").text('');
            $("#buttonC").text('');

            loadQuestion();
        })
    }

    function answerCorrect() {
        correct++;
        $(".app").append('<div class="ans" style="color:green">Your answer is Correct </div>');

    }
    function answerWrong() {
        wrong++;
        $(".app").append('<div class="ans" style="color:red">Your answer is Wrong </div>');
    }



    function showScore() {
        $('.question').empty();
        $('.question').append("<h2><p>" + correct + " correct</p></h2>");
        $('.question').append("<h2><p>" + wrong + " incorrect</p></h2>");
        countdownTimer.stop();
        $('.timer').empty();

    }





    setup();
    $('.answerchoice').on('click', function () {
        console.log($(this));
        if (this.id == 'buttonA') {
            var answerChosen = 'A';
        } else if (this.id == 'buttonB') {
            answerChosen = 'B';
        } else if (this.id == 'buttonC') {
            answerChosen = 'C';
        }
        if ((answerChosen == 'A') && (questionArray[index].flags[0] == true)) {
            answerCorrect();
        } else if (answerChosen == 'A') {
            answerWrong();
        }
        if ((answerChosen == 'B') && (questionArray[index].flags[1] == true)) {
            answerCorrect();
        } else if (answerChosen == 'B') {
            answerWrong();
        }
        if ((answerChosen == 'C') && (questionArray[index].flags[2] == true)) {
            answerCorrect();
        } else if (answerChosen == 'C') {
            answerWrong();
        }


        $(".question").text('');
        $("#buttonA").text('');
        $("#buttonB").text('');
        $("#buttonC").text('');

        index++;
        if (index < questionArray.length) {
            loadQuestion(index);
        } else {
            $(".answerchoice").hide();
            showScore();
        }
    });




});