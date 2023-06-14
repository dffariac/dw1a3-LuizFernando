let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers ++;
    }

    currentQuestion ++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 33) {
        document.querySelector('.scoreText1').innerHTML = 'Transmita o que aprendeu. Força, maestria. Mas fraqueza, insensatez, fracasso também. Sim, fracasso acima de tudo. O maior professor, o fracasso é.';
    } else if (points < 66) {
        document.querySelector('.scoreText1').innerHTML = 'Lembre-se: seu foco determina a sua realidade.';
    } else {
        document.querySelector('.scoreText1').innerHTML = 'A Força é forte em minha família. Meu pai a tem, eu a tenho e... você também a tem!';
    }

    document.querySelector('.scorePct').innerHTML = `Você acertou ${points}% das questões!`;
    document.querySelector('.scoreText2').innerHTML = `${correctAnswers} de ${questions.length} respostas corretas.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}