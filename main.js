const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

//캔버스 내 위치구조는 좌상단에서 시작된다

//공 만들기
let x = canvas.width/2;
let y = canvas.height - 30;
let cx = 2;
let cy = -2
const ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = "#00f7ff";
    ctx.fill();
    ctx.closePath();
}

//paddle 만들기
const paddleWidth = 75;
const paddleHeight = 10;
let paddleX = (canvas.width-paddleWidth) / 2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff00b7";
    ctx.fill();
    ctx.closePath();
}

//키보드 오른쪽 왼쪽을 누른것을 알게 하기 위함
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//오른쪽키, 왼쪽키를 를 눌렀을 때 false를 ture로 바꿔주기
function keyDownHandler(event) {
    if(event.keyCode === 39) {
        rightPressed = true;
    }
    else if(event.keyCode === 37) {
        leftPressed = true;
    } 
}
//키보드에서 손을 땠을 때 false 로 바꿔주기
function keyUpHandler(event) {
    if(event.keyCode === 39) {
        rightPressed = false;
    }
    else if(event.keyCode === 37) {
        leftPressed = false;
    }
}

//실행
function draw() {
    //캔버스 내용 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawBall();
    drawPaddle();
    //벽에 공이 부딪혔을때 튕겨지게 하기
    if(x + cx > canvas.width - ballRadius || x + cx < ballRadius) {
        cx = -cx;
    }
    if(y + cy < ballRadius) {
        cy = -cy
    } 
    //바닥에 부딪혔을 때
    else if (y + cy > canvas.height - ballRadius) {
        //paddle안에서 부딪혔을 때 
        if(x > paddleX && x < paddleX + paddleWidth) {
            cy = -cy
        } 
        else {
        //패들 밖으로 부딪혔을 때 game over 띄우기
        alert("GAME OVER");
        //현재 페이지 새로고침 해서 처음으로 돌아가기
        document.location.reload();
        }
    }
    //오른쪽키, 왼쪽키 눌렀을 때 paddle이 이동하게 해주기
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += cx;
    y += cy;
}

setInterval(draw, 10);


/*
function changeBallColor() {
    const colorChart = ['a', 'b' ,'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let color = "#";
    for(i = 0; i < 6; i++) {
        const ranIndex = Math.floor(Math.random() * colorChart.length);
        color += colorChart[ranIndex];
    }
    return color;
}
*/

