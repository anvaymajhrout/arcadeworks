const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

fetch('https://gateway.marvel.com/v1/public/characters?apikey=plsenteryourapikeyhere')
  .then(response => response.json())
  .then(data => {
    questions = generateQuestions(data.data.results);
    showQuestion();
  });

function generateQuestions(characters) {
  return characters.map(character => ({
    question: `What is the real name of  ${character.name} (try the best)?`,
    options: shuffleOptions([character.name, ...generateRandomNames(characters, character.name)]),
    answer: character.name
  }));
}

function generateRandomNames(characters, correctName) {
  const names = characters.map(c => c.name).filter(name => name !== correctName);
  return names.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function shuffleOptions(options) {
  return options.sort(() => 0.5 - Math.random());
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    question.options.forEach(option => {
      const optionEl = document.createElement('div');
      optionEl.classList.add('option');
      optionEl.textContent = option;
      optionEl.addEventListener('click', () => selectOption(option));
      optionsEl.appendChild(optionEl);
    });
  } else {
    showScore();
  }
}

function selectOption(selectedOption) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    score++;
  }
  currentQuestionIndex++;
  showQuestion();
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  showQuestion();
});

function showScore() {
  scoreContainer.textContent = `Your score is: ${score} / ${questions.length}`;
}
