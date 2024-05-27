let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
 ];
 
let currentQuestionIndex = 0;

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('textOfQuestion').innerText = question.question;
    document.getElementById('testOfOption1').innerText = question.choice1;
    document.getElementById('testOfOption2').innerText = question.choice2;
    document.getElementById('testOfOption3').innerText = question.choice3;
    document.getElementById('testOfOption4').innerText = question.choice4;
    document.querySelector('.question').classList.remove('answered');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
let options = document.getElementsByClassName('option');
for (let i = 0; i < options.length; i++) {
    
    options[i].addEventListener('click', function() {
        if (options[i].parentElement.parentElement.classList.contains("answered")) {
            return;
        }

        options[i].parentElement.parentElement.classList.add("answered");
        let selectedOption = this.id;
        let correctOption = 'option' + questions[currentQuestionIndex].answer;

        if (selectedOption === correctOption) {
            this.classList.add('correct');
        } else {
            this.classList.add('incorrect');
        }
        
        let numVal = document.querySelector('.valueOfNumber');
        numVal.innerText = parseInt(numVal.innerText.split('/')[0]) + 1 + '/3';

        
        if (this.classList.contains('correct')) {
            let scoreVal = document.querySelector('.valueOfScore');
            scoreVal.innerText = parseInt(scoreVal.innerText) + 10;
        }
        
        
        let progressBar = document.getElementById('progressBar');
        progressBar.value = parseInt(progressBar.value) + 1;
        
        
        setTimeout(function() {
            
            options[i].classList.remove('correct', 'incorrect');

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                
                let endScreen = document.getElementById('lastSc');
                let finalScore = document.getElementById('fScore');
                finalScore.innerText = document.querySelector('.valueOfScore').innerText;
                endScreen.classList.remove('hidden');
            }
        },800); 

        let playAgainButton = document.getElementById('playAgain');
        let goHomeButton = document.getElementById('goHome');

        playAgainButton.addEventListener('click', function() {
            
            document.getElementById('lastSc').classList.add('hidden');

            
            currentQuestionIndex = 0;
            document.querySelector('.valueOfScore').innerText = '0';
            document.getElementById('progressBar').value = 0;
            document.querySelector('.valueOfNumber').textContent = '0/3'; 
           
            
            displayQuestion();
        });

        goHomeButton.addEventListener('click', function() {
            
            window.location.href = 'index.html'; 
        });
    });

    
}


shuffleArray(questions);
displayQuestion();