document.addEventListener('DOMContentLoaded', () => {
   const dino = document.querySelector('.dino')
   const grid = document.querySelector('.grid')
   const alert = document.getElementById('alert')
   let gravity = 0.9
   let isJumping = false
   let isGameOver = false
   function control(e) {
      if (e.code === "Space"|| e.code === "ArrowUp"|| e.code === "w") {
        if (!isJumping) {
         jump()
        }
      }

   }
   let position = 0
   let fen = 0
   function jump() {
    isJumping = true
    let count = 0
     let timerId = setInterval(function () {

      // move down
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

      // move up
      position += 30
      count++
      position = position * gravity
      dino.style.bottom = position + 'px'
     },20)
   }
   document.addEventListener('contextmenu',function(e){
			e.preventDefault();
   })

   document.addEventListener('keydown', control)
   document.addEventListener('mousedown', jump)
 
   function generateObstacles() {
    if (!isGameOver) {
       let randomTime = Math.random() * 3000 + 80
    
    let obstaclePosition = 1000 
      const obstacle = document.createElement('div')
      obstacle.classList.add('obstacle')
      grid.appendChild(obstacle)
      obstacle.style.left = obstaclePosition + 'px'

      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60 ) {
          clearInterval(timerId)
          alert.innerHTML = '游戏结束！新纪录：' + fen.toFixed() + '分'
          isGameOver = true
          // remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild)
          } 
        }
        obstaclePosition -= 10
        fen += 0.02
        if(isGameOver === false){
            alert.innerHTML = '分数：' + fen.toFixed() + '分'
        }
        obstacle.style.left = obstaclePosition + 'px'
      }, 20)
      setTimeout(generateObstacles, randomTime)
    }
  
    }
    generateObstacles()
})
