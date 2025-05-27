document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gamedisplay = document.querySelector('.game_container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let gameOver = false
    let gap = 430

    function startGame() {
        birdBottom -= gravity
        bird.style.left = birdLeft + 'px'
        bird.style.bottom = birdBottom + 'px'
    }
    let timeId = setInterval(startGame, 20)

    function control(e){
        if (e.keyCode === 32) { // 'U' key 32 space 38 up arrow
            jump()
        }
    }

    function jump(){
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log (birdBottom)
    }
    document.addEventListener('keydown', control)
    

    function obstacle(){
        let obstacleleft = 500
        let randomHeight = Math.random() * 70
        let obstacleBottom = randomHeight   
        const generateObstacle= document.createElement('div')
        const generateTopObstacle= document.createElement('div')
        if (!gameOver) {
            generateObstacle.classList.add('generateObstacle')
            generateTopObstacle.classList.add('generateTopObstacle')
        }
        gamedisplay.appendChild(generateObstacle)
        gamedisplay.appendChild(generateTopObstacle)
        generateObstacle.style.left = obstacleleft + 'px'
        generateTopObstacle.style.left = obstacleleft + 'px'
        generateObstacle.style.bottom = obstacleBottom + 'px'
        generateTopObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleleft -= 2
            generateObstacle.style.left = obstacleleft + 'px'
            generateTopObstacle.style.left = obstacleleft + 'px'
            if (obstacleleft === -60) {
                clearInterval(timeInterval)
                gamedisplay.removeChild(generateObstacle)
                gamedisplay.removeChild(generateTopObstacle)
            }
            if (
                obstacleleft > birdLeft - 30 && obstacleleft < birdLeft + 60 && // horizontal collision range
                (
                  birdBottom < obstacleBottom + 153 || // hits bottom obstacle
                  birdBottom > obstacleBottom + gap-200 // hits top obstacle
                ) || birdBottom <=0
              )
            // if (
            //     (obstacleleft > birdLeft - 30 && obstacleleft < birdLeft + 60 &&
            //         (birdBottom < obstacleBottom + 153 && birdBottom > obstacleBottom + gap - 200)) ||
            //     birdBottom <= 0
            //     )    
            {
                gameover()
                clearInterval(timeInterval)
            }
        }
        let timeInterval = setInterval(moveObstacle, 20)
        if (!gameOver) setTimeout(obstacle, 3000)
    }
    obstacle() 

    function gameover(){
        clearInterval(timeId)
        gameOver = true
        console.log('game over')
        document.removeEventListener('keydown', control)
    }
});
