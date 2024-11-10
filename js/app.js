document.addEventListener('DOMContentLoaded', () => {
   const dino = document.querySelector('.dino')
   const grid = document.querySelector('.grid')
   const alert = document.getElementById('alert')
   let gravity = 0.9
   let isJumping = false
   let isGameOver = false
   let position = 0
   let fen = 0
   let scoreInterval = null
   let speed = 2;
   const maxSpeed = 8;
   const acceleration = 0.000005;

   function again() {
      window.location.assign("../index.html")
   }
   
   function control(e) {
      if (e.code === "R" || e.code === "r"){
        again()
      }else {
        if (!isJumping) {
         jump()
        }
      }
   }

   function jump() {
    isJumping = true
    let count = 0
     let timerId = setInterval(function () {
      if (count === 15 ) {
        clearInterval(timerId)
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId)
            isJumping = false
          }
          position -= 5
          count--
          position = position * gravity
          dino.style.bottom = position + 'px'
        }, 20)
      }
      position += 30
      count++
      position = position * gravity
      dino.style.bottom = position + 'px'
     },20)
   }

   document.addEventListener('contextmenu',function(e){
      e.preventDefault();
   })

   function mouse_jump() {
      if(!isJumping) {
          jump()
      }
   }

   document.addEventListener('keydown', control)
   document.addEventListener('mousedown', mouse_jump)

   function updateScore() {
       if (!isGameOver) {
           fen += 0.01;
           alert.innerHTML = '分数：' + fen.toFixed() + '分';
       }
   }

   scoreInterval = setInterval(updateScore, 20);

   function updateSpeed() {
       if (!isGameOver && speed < maxSpeed) {
           speed += acceleration;
       }
   }

   function generateObstacles() {
    if (!isGameOver) {
       let randomTime = Math.random() * (1000 - speed * 50) + (1000 - speed * 50)
    
       let obstaclePosition = grid.offsetWidth
       const obstacle = document.createElement('div')
       obstacle.classList.add('obstacle')
       grid.appendChild(obstacle)
       obstacle.style.left = obstaclePosition + 'px'

       let timerId = setInterval(function () {
         if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60 ) {
           clearInterval(timerId)
           clearInterval(scoreInterval)
           if (fen > window.localStorage.getItem('bestScore')) {
             alert.innerHTML = '游戏结束！新纪录：' + fen.toFixed() + '分'
             window.localStorage.setItem('bestScore', fen)
           }else {
             alert.innerHTML = '游戏结束！分数：' + fen.toFixed() + '分'
           }
           isGameOver = true
           while (grid.firstChild) {
             grid.removeChild(grid.lastChild)
           } 
         }
         updateSpeed();
         obstaclePosition -= speed;
         obstacle.style.left = obstaclePosition + 'px'
       }, 5)
       
       if (!isGameOver) {
           setTimeout(generateObstacles, randomTime)
       }
    }
   }

   generateObstacles();
})
