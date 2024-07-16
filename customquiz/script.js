const startQuizButton = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const categoryRadioButtons = document.querySelectorAll('input[name="category"]');
let selectedCategory = '';

categoryRadioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        selectedCategory = document.querySelector('input[name="category"]:checked').value;
    });
});

startQuizButton.addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    let apiUrl = `https://opentdb.com/api.php?amount=10`;

    if (selectedCategory) {
        apiUrl += `&category=${selectedCategory}`;
    }
    if (difficulty) {
        apiUrl += `&difficulty=${difficulty}`;
    }
    if (type) {
        apiUrl += `&type=${type}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayQuiz(data.results);
        })
        .catch(error => {
            console.error('Error fetching quiz data:', error);
        });
});

function displayQuiz(questions) {
    quizContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            ${getAnswersHtml(question)}
        `;
        quizContainer.appendChild(questionElement);
    });
}

function getAnswersHtml(question) {
    const answers = [...question.incorrect_answers, question.correct_answer];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    return shuffledAnswers.map(answer => `
        <div>
            <input type="radio" name="question-${question.question}" value="${answer}">
            <label>${answer}</label>
        </div>
    `).join('');
}
