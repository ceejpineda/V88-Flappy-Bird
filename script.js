const flappyBird = (()=>{

    //Global Game Elements
    const game = document.getElementById('game');
    const block = document.querySelector('.block');
    const hole = document.querySelector('.hole');
    const bird = document.getElementById('bird');
    let isJumping = false;
    let isStart = false;
    let score = 0;

    //Menus and buttons
    const startButton = document.getElementById('start');
    const playAgain = document.getElementById('playAgain');
    const scoreContainer = document.getElementById('score');
    const menu = document.querySelector('.mainMenu');
    const gameOverDiv = document.querySelector('.gameOver');


    
    const mainMenu = () =>{
        gameOverDiv.style.display = 'none';
        block.style.display = 'none';
        hole.style.display = 'none';
    }

    const gameOver = () =>{
        gameOverDiv.style.display = 'flex';
        block.style.display = 'none';
        hole.style.display = 'none';
        game.style.display = 'flex';
    }

    const initialize = () =>{
        if(!isStart) return;
        score = 0;
        gameOverDiv.style.display = 'none';
        menu.style.display = 'none';
        game.style.display = 'block';
        block.style.display = 'block';
        hole.style.display = 'block';
        bird.style.display = 'block';
        bird.style.top = '500px';
        bird.style.left = '650px';
        hole.addEventListener('animationiteration', holePosition);
    }

    const holePosition = () =>{
        hole.style.top = -((Math.random()*300)+200) + 'px';
        score++;
        scoreContainer.innerHTML = score;
    }

    const gravity = () =>{
        if(!isStart) return;
        if(isJumping) return;
        bird.style.backgroundImage = 'url(./assets/birdDown.png)' 
        let birdTop = bird.getBoundingClientRect().top;
        let gameBottom = game.getBoundingClientRect().bottom;
        if(birdTop>gameBottom-40){
            isStart = false;
            hole.classList.add('paused');
            block.classList.add('paused');
            setTimeout(gameOver, 1500);
        }
        //bird.style.transform = 'rotate(-45deg)'
        bird.style.top = birdTop+7 +'px';
    }

    const flap = () =>{
        if(!isStart) return;
        if(!isJumping) return;
        //bird.style.transform = 'rotate(0deg)'
        bird.style.backgroundImage = 'url(./assets/birdUp.png)' 
        let jumpCount = 0;
        let birdTop = bird.getBoundingClientRect().top;
        bird.style.top = birdTop - 5 + "px";
        jumpCount++;
    }


    const controls = () =>{
        startButton.addEventListener('click', ()=>{
            isStart = true;
            initialize();
        })
        playAgain.addEventListener('click', ()=>{
            isStart = true;
            score = 0;
            initialize();
            hole.classList.remove('paused');
            block.classList.remove('paused');
        })

        window.addEventListener('keydown', (e)=>{
            if(e.repeat) return;
            isJumping = true;
        })
        window.addEventListener('keyup', (e)=>{
            isJumping = false;
        })
    }

    const checkHit = () =>{
        let blockPos = block.getBoundingClientRect();
        let holePos = hole.getBoundingClientRect();
        let birdPos = bird.getBoundingClientRect();

        if(Math.abs(blockPos.left - birdPos.left)<10 && birdPos.top<holePos.top){
            isStart = false;
            hole.classList.add('paused');
            block.classList.add('paused');
            setTimeout(gameOver, 1500);
        } 

        if(Math.abs(blockPos.left - birdPos.left)<10 && birdPos.bottom>holePos.bottom){
            isStart = false;
            hole.classList.add('paused');
            block.classList.add('paused');
            setTimeout(gameOver, 1500);
        }
        
    }



    return {initialize, gravity, controls, flap, checkHit, mainMenu}

})();

flappyBird.mainMenu();
//flappyBird.initialize();
flappyBird.controls();
setInterval(flappyBird.gravity, 20);
setInterval(flappyBird.checkHit, 10);
setInterval(flappyBird.flap, 10);
