$(document).ready(function () {
    const words = {
        easy: [
            { english: "always", ukrainian: "завжди" },
            { english: "never", ukrainian: "ніколи" },
        ],
        medium: [            { english: "sometimes", ukrainian: "іноді" },
            { english: "often", ukrainian: "часто" },
            { english: "rarely", ukrainian: "рідко" },
        ],
        hard: [
            { english: "hardly", ukrainian: "ледве" },
            { english: "quickly", ukrainian: "швидко" },
            { english: "happily", ukrainian: "щасливо" },
        ],
    };

    let selectedDifficulty = 'easy';
    let currentWords = words[selectedDifficulty];
    let currentStep = 1;
    let correctCount = 0;
    let incorrectCount = 0;
    let totalSteps = currentWords.length;

    $('input[name="difficulty"]').on('change', function () {
        selectedDifficulty = $(this).val();
        currentWords = words[selectedDifficulty];
        currentStep = 1;
        correctCount = 0;
        incorrectCount = 0;
        totalSteps = currentWords.length;
        shuffle(currentWords);
        updateUI();
    });

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function updateUI() {
        $('#word-card').text(currentWords[currentStep - 1].english);
        $('#current-step').text(currentStep);
        $('#total-steps').text(totalSteps);
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
        $('#translation-input').val('');
    }

    $('#check-button').on('click', function () {
        const userInput = $('#translation-input').val().trim().toLowerCase();
        const correctAnswer = currentWords[currentStep - 1].ukrainian.toLowerCase();

        if (userInput === correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else {
            $('#result-text').text(`Ви завершили! Правильно: ${correctCount}, неправильно: ${incorrectCount}`);
            $('#result-modal').fadeIn();
        }
    });

    $('#restart-button').on('click', function () {
        currentStep = 1;
        correctCount = 0;
        incorrectCount = 0;
        shuffle(currentWords);
        updateUI();
        $('#result-modal').fadeOut();
    });

    shuffle(currentWords);
    updateUI();
});

