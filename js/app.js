// 添加横屏检测函数
function checkOrientation() {
    if (window.innerWidth < 768) {  // 仅在移动设备上检查
        if (window.innerHeight > window.innerWidth) {  // 竖屏
            isGameOver = true;
            document.getElementById('desert').style.display = 'none';
        } else {  // 横屏
            isGameOver = false;
            document.getElementById('desert').style.display = 'block';
            // 如果没有仙人掌，重新开始生成
            if (!document.querySelector('.obstacle')) {
                generateObstacles();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
   const dino = document.querySelector('.dino')
   const grid = document.querySelector('.grid')
   const alert = document.getElementById('alert')
   let gravity = 0.9
   let isJumping = false
   let isGameOver = false
   let position = 0
   let fen = 0

   // 初始化横竖屏检测
   checkOrientation();
   window.addEventListener('orientationchange', () => {
       setTimeout(checkOrientation, 100); // 添加延时以确保屏幕旋转完成
   });
   window.addEventListener('resize', checkOrientation);

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
        }, 20) // 下落速度
      }

      // move up
      position += 30
      count++
      position = position * gravity
      dino.style.bottom = position + 'px'
     },20)  // 上升速度
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
 
   function generateObstacles() {
    if (!isGameOver) {
       let randomTime = Math.random() * 400 + 800
    
       let obstaclePosition = grid.offsetWidth
       const obstacle = document.createElement('div')
       obstacle.classList.add('obstacle')
       grid.appendChild(obstacle)
       obstacle.style.left = obstaclePosition + 'px'

       let timerId = setInterval(function () {
         if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60 ) {
           clearInterval(timerId)
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
         obstaclePosition -= 3
         if(isGameOver === false) {
           fen += 0.008
         }
         if(isGameOver === false){
             alert.innerHTML = '分数：' + fen.toFixed() + '分'
         }
         obstacle.style.left = obstaclePosition + 'px'
       }, 10) // 移动速度
       
       if (!isGameOver) {
           setTimeout(generateObstacles, randomTime)
       }
    }
   }

   // 确保游戏开始时生成仙人掌
   if (!isGameOver) {
       generateObstacles();
   }
})
