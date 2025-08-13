let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let h4 = document.querySelector('h4');
let started = false;
let level = 0;

let highestScore = 0;
let highestScoreDisplay = document.querySelector("h3");


document.addEventListener('keypress', function () {
    if(started == false){
        console.log("Game is started");
        started = true;
        levelUp();
    }
});
function levelUp() {
    userSeq = [];
    level++;
    h4.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function() {
        btn.classList.remove("gameFlash");
    },500);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    },500);
}
function btnPress() {
    let btn = this;
    console.log(btn);
    userFlash(btn);
    
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    // correct so far…
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    // wrong answer
    if (level > highestScore) {
      highestScore = level - 1;
      highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }

    h4.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;

    document.body.classList.add('red-flash');
   
    setTimeout(function () {
      document.body.classList.remove('red-flash');
    }, 500);

    reset();
  }
}

function reset() {
    level = 0;
    started = false;
    userSeq = [];
    gameSeq = [];
}