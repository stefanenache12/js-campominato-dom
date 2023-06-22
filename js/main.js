const playButton = document.getElementById('play');
const cellContainer = document.querySelector('.mycontainer');
const gameOverContainer = document.querySelector('.end-game');
const restartButton = document.getElementById('restart');
const scoreContainer = document.getElementById('score');
const endGameMsg = document.getElementById('end-game-msg');
let gameOver = false;
let score = 0;

const randomNumbers = [];

let x = 0;

playButton.addEventListener('click',
    function(){

        let difficulty = document.getElementById('difficoltà').value;
        cellContainer.innerHTML = '';
        
        if(difficulty == 'Facile'){

            x = 100;

            cellGenerator();
            cellContainer.classList.remove('medio','legendario');
            cellContainer.classList.add('facile');
            bombGenerator();
            
        } else if (difficulty == 'Medio'){

            x = 81;
            cellGenerator();
            cellContainer.classList.remove('facile','legendario');
            cellContainer.classList.add('medio');
            bombGenerator();
            
        } else {

            x = 49;
            cellGenerator();
            cellContainer.classList.add('legendario');
            bombGenerator();
        }  
    }   
)

restartButton.addEventListener('click',
    function(){
    location.reload('');
})




/* 
    FUNCTIONS
*/

function cellGenerator (){

    for (let i = 1; i <= x; i++) {

        let newCell = document.createElement('div');
        newCell.classList.add('cell-style','cell-'+ i);
        cellContainer.append(newCell);
        newCell.innerHTML = i;

        newCell.addEventListener('click',
        function click () {

            if (gameOver) {
                return; 
            }
                
            this.classList.toggle('active');
                
                for (let j = 0; j < randomNumbers.length; j++) {

                    if(this.innerHTML == randomNumbers[j]){

                        this.classList.add('bomb-color');
                        gameOverContainer.classList.add('game-over');
                        endGameMsg.innerHTML = 'GAME OVER';
                        gameOver = true;
                        scoreContainer.innerHTML = ('Score ' + score);
                    }
                }  
                
                if(score == x - 16){
                    gameOverContainer.classList.add('game-over');
                    endGameMsg.innerHTML = 'HAI VINTO';
                    scoreContainer.innerHTML = ('Score ' + score);
                    endGameMsg.classList.add('text-success');

                }

                this.removeEventListener('click', click);

                score++;
            }
        )
    } 
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function bombGenerator (){
    while (randomNumbers.length < 16) {
        const aNumber = randomNumber(1, x);
        
        if (!randomNumbers.includes(aNumber)) {
            randomNumbers.push(aNumber);
        }   
        
        console.log(aNumber);
    }
}

