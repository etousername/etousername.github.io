const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

// background
ctx.fillStyle = "#000"
ctx.fillRect(0, 0, 700, 400)

var score1 = 0
var score2 = 0

var gamePause = true

var leftPlayer = {
    x: 10, 
    y: 150
}
var rightPlayer = {
    x: 680,
    y: 150
}


var centerX = canvas.width / 2;                                         
var centerY = canvas.height / 2;                                                                                  

var ball = {
    x: centerX,
    y: centerY
}

function drawBall(){
    ctx.beginPath();                                              
    ctx.arc(ball.x, ball.y, 10, 1 * Math.PI, 0.9999 * Math.PI, false);
    ctx.lineWidth = 5;
    // line color                                                     
    ctx.strokeStyle = "white";                                    
    ctx.stroke();
}
var ballSpeed = {
    x: 1.8,
    y: 0.5
}
var ballDirectionY = false
var ballDirectionX = false

// Отрисовка игры
function drawGame () {
    ctx.fillStyle = "#000"
    ctx.fillRect(ball.x - 14, ball.y - 13, 28, 27) // стирается прошлый кадр мяча

    // Move up or down
    if(ball.y < 10){
        ballDirectionY = true // down
    } else if (ball.y > 390) { ballDirectionY = false} //up
    if(ballDirectionY) {
        ball.y += ballSpeed.y
    } else {
        ball.y -= ballSpeed.y
    }
    // Move up or down

    
    if(ball.x < leftPlayer.x + 15 && ball.y > leftPlayer.y && ball.y < leftPlayer.y + 100) { // Если мяч прикасается к левому игроку
        sound();
        ballDirectionX = true
        if(ball.y > leftPlayer.y + 80) {
            if(ballSpeed.y == 0.8) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.8)
            ballDirectionY = true
        } else if(ball.y > leftPlayer.y + 55 && ball.y < leftPlayer.y + 80) {
            if(ballSpeed.y == 0.5) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.5)
            ballDirectionY = true
        } else if(ball.y > leftPlayer.y + 45 && ball.y < leftPlayer.y + 55) {
            if(ballSpeed.y == 0.2) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.2)
            ballDirectionY = false
        } else if(ball.y > leftPlayer.y + 20 && ball.y < leftPlayer.y + 45) {
            if(ballSpeed.y == 0.5) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.5) 
            ballDirectionY = false
        } else if(ball.y < leftPlayer.y + 20) {
            if(ballSpeed.y == 0.8) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.8)
            ballDirectionY = false
        } else {
            alert("Error: calc up or down direction")
        }
    }
    if(ball.x > rightPlayer.x - 15 && ball.y > rightPlayer.y - 10 && ball.y < rightPlayer.y + 110){ // Если мяч прикасается к правому игроку
        sound();
        ballDirectionX = false;
        if(ball.y > rightPlayer.y + 80) {
            if(ballSpeed.y == 0.8) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.8)
            ballDirectionY = true
        } else if(ball.y > rightPlayer.y + 55 && ball.y < rightPlayer.y + 80) {
            if(ballSpeed.y == 0.5) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.5)
            ballDirectionY = true
        } else if(ball.y > rightPlayer.y + 45 && ball.y < rightPlayer.y + 55) {
            if(ballSpeed.y == 0.2) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.2)
            ballDirectionY = true
        } else if(ball.y > rightPlayer.y + 20 && ball.y < rightPlayer.y + 45) {
            if(ballSpeed.y == 0.5) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.5) 
            ballDirectionY = false
        } else if(ball.y < rightPlayer.y + 20) {
            if(ballSpeed.y == 0.8) {ballSpeed.y += 0.1} else(ballSpeed.y = 0.8)
            ballDirectionY = false
        } else {
            alert("Error: calc up or down direction")
        }
    } 
    
    if(ballDirectionX){        // если направление по х влево 
        ball.x += ballSpeed.x  // прибавляется значение скороски по х
    } else {                   // иначе 
        ball.x -= ballSpeed.x  // значение отнимается
    }
    
    // Проверка не вышел ли мячик за пределы поля
    if(ball.x < 5) {  // левый край
        gamePause = true
        clearInterval(drawInterval)
        $('.press_space').fadeIn()
        score2++
        $('.score').text(score1 + " : " + score2)
    } else if(ball.x > 695){ // правый край
        gamePause = true
        clearInterval(drawInterval)
        $('.press_space').fadeIn()
        score1++
        $('.score').text(score1 + " : " + score2)
    }

    removePlayers(leftPlayer)
    removePlayers(rightPlayer)
    if(leftPlayerMove > 0 && leftPlayerMove != 0 && leftPlayer.y != 12) {
        leftPlayer.y -= 1
        leftPlayerMove -= 1
    } else if(leftPlayerMove < 0 && leftPlayerMove != 0 && leftPlayer.y != 288) {
        leftPlayer.y += 1
        leftPlayerMove += 1
    } else{leftPlayerMove = 0}
    if(rightPlayerMove > 0 && rightPlayerMove != 0 && rightPlayer.y != 12) {
        rightPlayer.y -= 1
        rightPlayerMove -= 1
    } else if(rightPlayerMove < 0 && rightPlayerMove != 0 && rightPlayer.y != 288) {
        rightPlayer.y += 1
        rightPlayerMove += 1
    } else {rightPlayerMove = 0}

    drawPlayers()
    drawBall()
    
    // center line
    ctx.fillStyle = "#fff"
    ctx.fillRect(349, 0, 2, 400)
}




function drawPlayers(){
    // left player
    ctx.fillStyle = "#fff"
    ctx.fillRect(leftPlayer.x, leftPlayer.y, 10, 100)
    // right player
    ctx.fillStyle = "#fff"
    ctx.fillRect(rightPlayer.x, rightPlayer.y, 10, 100)
}
function removePlayers(howPlayer){
    ctx.fillStyle = "#000"
    ctx.fillRect(howPlayer.x, howPlayer.y, 10, 100)
}

document.addEventListener("keydown", controlPlayers) // Отслеживание нажатий на клавиатуру
var leftPlayerMove = 0
var rightPlayerMove = 0
function controlPlayers(){
if(!gamePause){
    if(event.code == "KeyW" && leftPlayer.y != 12) {
        removePlayers(leftPlayer)
        leftPlayerMove += 46
    } else if( event.code == "KeyS" && leftPlayer.y != 288){
        removePlayers(leftPlayer)
        leftPlayerMove -= 46
    } else if(event.code == "ArrowUp" && rightPlayer.y != 10){
        removePlayers(rightPlayer)
        rightPlayerMove += 46
    } else if(event.code == "ArrowDown" && rightPlayer.y != 290){
        removePlayers(rightPlayer)
        rightPlayerMove -= 46
    }
}
}



function startDraw(){
    drawBall()
    drawPlayers()
    // center line
    ctx.fillStyle = "#fff"
    ctx.fillRect(349, 0, 2, 400)
}


$('.two_player').click(function(){
    startDraw()
    $('.select_mode').toggle()
    $('#game').fadeIn()
    $('.press_space').fadeIn()
})
var drawInterval
document.addEventListener("keyup", startGame)
function startGame(){
    if(event.code == "Space" && gamePause == true && $('.select_mode').css("display") == "none") {
        $('.press_space').fadeOut()
        $('.score').fadeIn()
        
        // background
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 700, 400)

        // переменные в дефолт
        ballSpeed = {x: 1.8, y: 0.5}
        leftPlayer = {x: 10, y: 150}
        rightPlayer = {x: 680, y: 150}
        
        centerX = canvas.width / 2;                                         
        centerY = canvas.height / 2;                                                                                  
        
        ball = {x: centerX, y: centerY}
        
        ballDirectionY = false
        ballDirectionX = false
        startDraw()
        gamePause = false
        drawInterval = setInterval(drawGame, 1)
    }

}




// sound
function sound (){
    var audio = new Audio(); // Создаём новый элемент Audio
	 audio.src = 'sound2.mp3'; // Указываем путь к звуку 
    audio.autoplay = true; // Автоматически запускаем
    audio.volume = 0.2
}
