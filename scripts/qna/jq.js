

var quiztitle = "Mental QnA";

/**
* Set the information about your questions here. The Danger answer string needs to match
* the Danger choice exactly, as it does string matching. (case sensitive)
*
*/
var quiz = [
    {
        "question": "Q1: During the past 4 weeks, have you had any problems with your work or daily life due to your physical health?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q2: During the past 4 weeks, have you had any problems with your work or daily life due to any emotional problems, such as feeling depressed, sad or anxious?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q3: Have you felt particularly low or down for more than 2 weeks in a row?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q4:  Is there a history of mental disorder in your family?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q5:   Have you seen a therapist in the recent past?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q6: Are you currently taking any medication??",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q7: Have you ever been diagnosed with a mental disorder before?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q8: Do you sleep minimum 6 hours a day?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "No",
        "explanation": "",
    },
    {
        "question": "Q9:  Are you a heavy smoker?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
    {
        "question": "Q9:  Are you alcoholic?",
        "image": "",
        "choices": [
            "Yes",
            "No",

        ],
        "Danger": "Yes",
        "explanation": "",
    },
];


/******* No need to edit below this line *********/
var currentquestion = 0, score = 0, submt = true, picked;

jQuery(document).ready(function ($) {

    /**
     * HTML Encoding function for alt tags and attributes to prevent messy
     * data appearing inside tag attributes.
     */
    function htmlEncode(value) {
        return $(document.createElement('div')).text(value).html();
    }

    /**
     * This will add the individual choices for each question to the ul#choice-block
     *
     * @param {choices} array The choices from each question
     */
    function addChoices(choices) {
        if (typeof choices !== "undefined" && $.type(choices) == "array") {
            $('#choice-block').empty();
            for (var i = 0; i < choices.length; i++) {
                $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
            }
        }
    }

    /**
     * Resets all of the fields to prepare for next question
     */
    function nextQuestion() {
        submt = true;
        $('#explanation').empty();
        $('#question').text(quiz[currentquestion]['question']);
        $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
        if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
            if ($('#question-image').length == 0) {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
            } else {
                $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
            }
        } else {
            $('#question-image').remove();
        }
        addChoices(quiz[currentquestion]['choices']);
        setupButtons();
    }

    /**
     * After a selection is submitted, checks if its the right answer
     *
     * @param {choice} number The li zero-based index of the choice picked
     */
    function processQuestion(choice) {
        if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['Danger']) {
            $('.choice').eq(choice).css({ 'background-color': '#D92623' });
            $('#explanation').html('<strong>Danger!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            score++;
        } else {
            $('.choice').eq(choice).css({ 'background-color': '#50D943' });
            $('#explanation').html('<strong>NoDanger.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        }
        currentquestion++;
        $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
            if (currentquestion == quiz.length) {
                endQuiz();
            } else {
                $(this).text('Respond').css({ 'color': '#222' }).off('click');
                nextQuestion();
            }
        })
    }

    /**
     * Sets up the event listeners for each button.
     */
    function setupButtons() {
        $('.choice').on('mouseover', function () {
            $(this).css({ 'background-color': '#e1e1e1' });
        });
        $('.choice').on('mouseout', function () {
            $(this).css({ 'background-color': '#fff' });
        })
        $('.choice').on('click', function () {
            picked = $(this).attr('data-index');
            $('.choice').removeAttr('style').off('mouseout mouseover');
            $(this).css({ 'border-color': '#222', 'font-weight': 700, 'background-color': '#c1c1c1' });
            if (submt) {
                submt = false;
                $('#submitbutton').css({ 'color': '#000' }).on('click', function () {
                    $('.choice').off('click');
                    $(this).off('click');
                    processQuestion(picked);
                });
            }
        })
    }

    /**
     * Quiz ends, display a message.
     */
    function endQuiz() {
        $('#explanation').empty();
        $('#question').empty();
        $('#choice-block').empty();
        $('#submitbutton').remove();
        $('#question').text("You got " + score + " out of " + quiz.length + " Danger.");
        $(document.createElement('h2')).css({ 'text-align': 'center', 'font-size': '4em' }).text(Math.round(score / quiz.length * 100) + '% Chance of Mental Health Concerns').insertAfter('#question');
    }

    /**
     * Runs the first time and creates all of the elements for the quiz
     */
    function init() {
        //add title
        if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
            $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
        } else {
            $(document.createElement('h1')).text("Quiz").appendTo('#frame');
        }

        //add pager and questions
        if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
            //add pager
            $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
            //add first question
            $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
            //add image if present
            if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
            }
            $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

            //questions holder
            $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

            //add choices
            addChoices(quiz[0]['choices']);

            //add submit button
            $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Respond').css({ 'font-weight': 700, 'color': '#222', 'padding': '30px 0' }).appendTo('#frame');

            setupButtons();
        }
    }

    init();
});