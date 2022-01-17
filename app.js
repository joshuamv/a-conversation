
var currentQuestion = 0;
var canvas          = document.getElementById("canvas1");
var ctx             = canvas.getContext("2d");
canvas.width        = window.innerWidth;
canvas.height       = window.innerHeight;
var startButton     = document.getElementById("startButton");
var sendButton      = document.getElementById("sendButton");
var inputField      = document.getElementById("inputDiv");
var inputFieldActual= document.getElementById("inputField");
var titles          = document.getElementById("titles");
var answer          = document.getElementById("answer");

var particleArray   = [];
var cursorLocation  = document.getElementById("cursor");
var cursor1Location = document.getElementById("cursor1");
var cursor2Location = document.getElementById("cursor2");
var counter         = 10;
var particleNum     = 10000;

// style vars //
var smallTitle     = "font-size: 50px; filter: blur(3px);";
var bigTitle       = "font-size: 70px; filter: blur(4px);";
var showInputField = "opacity: 1; height:100px; margin: 30px 10px 30px 10px;";
var hideInputField = "opacity: 0; height:100px; padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px; margin: 0px;";
var hideButton     = "opacity: 0; height: 0vh; padding: 0px; font-size: 0px; filter: blur(10px);";
var showButton     = "opacity: 1; filter: blur(0px); padding: 10px 30px 10px 30px; font-size: 25px; height: auto;";
var showSendButton = "opacity: 1; filter: blur(0px); font-size: 25px; height: auto; padding: 35px 30px 35px 30px; cursor: pointer;"
var hideSendButton = "opacity: 0; filter: blur(0px); font-size: 25px; height: auto; padding: 35px 30px 35px 30px; cursor: pointer;"
var showTitle      = "opacity: 0.1; filter: blur(5px);";
var hideTitle      = "opacity: 0; filter: blur(100px);";
var rValueDots     = 200;
var gValueDots     = 200;
var bValueDots     = 200;

var gameStage      = 0;

const mouse = {
  x: null,
  y: null,
  radius: 200,
}

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  cursorLocation.setAttribute("style", "top:"+(mouse.y - 10) +"px; left:"+(mouse.x - 10 )+"px;");
  cursor1Location.setAttribute("style", "top:"+(mouse.y - 10) +"px; left:"+(mouse.x - 10 )+"px;");
  cursor2Location.setAttribute("style", "top:"+(mouse.y - 10) +"px; left:"+(mouse.x - 10 )+"px;");
  // cursorLocation.style.width = ((sin(counter*0.11)+15)*15)+"px";
});


//disable enter key for input
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);




// button click //
startButton.addEventListener("click", function(event) {

  if (gameStage == 0) {
    gameStart();
    return;
  }

  if (gameStage == 1) {
    question1();
    return;
  }

  if (gameStage == 2) {
    question2();
    return;
  }

  if (gameStage == 3) {
    question3();
    return;
  }

  if (gameStage == 4) {
    question4();
    return;
  }

});

sendButton.addEventListener("click", function(event) {

  if (gameStage == 0) {
    gameStart();
    return;
  }

  if (gameStage == 1) {
    question1();
    return;
  }

  if (gameStage == 2) {
    question2();
    return;
  }

  if (gameStage == 3) {
    question3();
    return;
  }

  if (gameStage == 4) {
    question4();
    return;
  }

  if (gameStage == 5) {
    question5();
    return;
  }

  if (gameStage == 6) {
    endGame();
    return;
  }

});







ctx.fillStyle = "white";
ctx.font = "100px";
ctx.fillText = ("A", 10, 60);

ctx.strokeStyle = "white";
ctx.strokeRect(0, 0, 100, 100);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random(0,2); //particles radius
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1;
  }
  draw(){
    ctx.fillStyle = "rgb(" + rValueDots + "," + gValueDots + "," + bValueDots + ")";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update(){
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance)/ maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    }
    else {
      if(this.x !== this.baseX){
        let dx = this.x - this.baseX;
        this.x -= dx/10;
      }
      if (this.x !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy/10;
      }
    }
  }
}

function init() {
  particleArray = [];
  for (var i = 0; i < particleNum; i++) { //number of particles
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}

init();
console.log(particleArray);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  // connect();
  requestAnimationFrame(animate);
}

function gameStart() {

    startButton.setAttribute("style", hideButton);

    rValueDots = 210;
    gValueDots = 210;
    bValueDots = 210;

    titles.classList.add('question');
    titles.classList.remove('startTitle');

    setTimeout(function () {
      titles.innerHTML = "This";
      rValueDots = 220;
      gValueDots = 220;
      bValueDots = 220;
    }, 600);

    setTimeout(function () {
      titles.innerHTML = "This is";
      rValueDots = 230;
      gValueDots = 230;
      bValueDots = 230;
    }, 1000);

    setTimeout(function () {
      titles.innerHTML = "This is a";
      rValueDots = 240;
      gValueDots = 240;
      bValueDots = 240;
    }, 1400);

    setTimeout(function () {
      titles.innerHTML = "This is a safe";
      rValueDots = 250;
      gValueDots = 250;
      bValueDots = 250;
    }, 1800);

    setTimeout(function () {
      titles.innerHTML = "This is a safe space";
      rValueDots = 255;
      gValueDots = 255;
      bValueDots = 255;
    }, 2200);

    setTimeout(function () {
      titles.innerHTML = "A";
      rValueDots = 250;
      gValueDots = 250;
      bValueDots = 250;
    }, 4200);

    setTimeout(function () {
      titles.innerHTML = "A place";
      rValueDots = 240;
      gValueDots = 240;
      bValueDots = 240;
    }, 4600);

    setTimeout(function () {
      titles.innerHTML = "A place to";
      rValueDots = 230;
      gValueDots = 230;
      bValueDots = 230;
    }, 5000);

    setTimeout(function () {
      titles.innerHTML = "A place to be";
      rValueDots = 220;
      gValueDots = 220;
      bValueDots = 220;
    }, 5400);

    setTimeout(function () {
      titles.innerHTML = "A place to be heard";
      rValueDots = 210;
      gValueDots = 210;
      bValueDots = 210;
    }, 5800);

    setTimeout(function () {
      titles.innerHTML = "Answer";
      rValueDots = 200;
      gValueDots = 200;
      bValueDots = 200;
    }, 7800);

    setTimeout(function () {
      titles.innerHTML = "Answer from";
      rValueDots = 210;
      gValueDots = 210;
      bValueDots = 210;
    }, 8200);

    setTimeout(function () {
      titles.innerHTML = "Answer from the";
      rValueDots = 220;
      gValueDots = 220;
      bValueDots = 220;
    }, 8600);

    setTimeout(function () {
      titles.innerHTML = "Answer from the heart";
      rValueDots = 230;
      gValueDots = 230;
      bValueDots = 230;
    }, 9000);

    setTimeout(function () {
      rValueDots = 240;
      gValueDots = 240;
      bValueDots = 240;
    }, 9400);

    setTimeout(function () {
      titles.setAttribute("style", hideTitle);
    }, 10400);

    setTimeout(function () {
      titles.innerHTML = "Do you love yourself";
      inputField.setAttribute("style", showInputField);
    }, 10500);

    setTimeout(function () {
      titles.setAttribute("style", bigTitle);
      rValueDots = 250;
      gValueDots = 250;
      bValueDots = 250;
    }, 11300);

    setTimeout(function () {
      titles.innerHTML = "Do you love yourself?";
      rValueDots = 255;
      gValueDots = 255;
      bValueDots = 255;
    }, 11700);

    gameStage = 1;
}

function question1() {

  inputField.classList.add('sentInput');
  inputField.classList.remove('inputDiv');
  sendButton.setAttribute("style", hideSendButton);

  //show answer
  answer.innerHTML = document.querySelector('#inputField').value;
  setTimeout(function () {
    floatAnswer();
    setTimeout(function () {
      inputField.setAttribute("style", hideInputField);
    }, 10);
  }, 200);

  //show next question
  setTimeout(function () {
    hideAnswer();
    setTimeout(function () {
      titles.setAttribute("style", bigTitle);

      setTimeout(function () {
        inputField.setAttribute("style", hideInputField);
      }, 900);

      setTimeout(function () {
        inputField.classList.remove('sentInput');
        inputField.classList.add('inputDiv');
        inputFieldActual.value = "";
      }, 1200);

      setTimeout(function () {
        inputField.setAttribute("style", showInputField);
      }, 4000);

      setTimeout(function () {
        titles.innerHTML = "When";
        rValueDots = 220;
        gValueDots = 220;
        bValueDots = 220;
      }, 5);

      setTimeout(function () {
        titles.innerHTML = "When did";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 400);

      setTimeout(function () {
        titles.innerHTML = "When did you";
        rValueDots = 240;
        gValueDots = 240;
        bValueDots = 240;
      }, 800);

      setTimeout(function () {
        titles.innerHTML = "When did you last";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 1200);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell";
        rValueDots = 255;
        gValueDots = 255;
        bValueDots = 255;
      }, 1600);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell your";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 2000);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell your parents";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 2400);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell your parents I";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 2800);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell your parents I love";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 3200);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell your parents I love you";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 3600);

      setTimeout(function () {
        titles.innerHTML = "When did you last tell your parents I love you?";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 4000);

    }, 2200);
  }, 8200);

  gameStage = 2;
}

function question2() {

  inputField.classList.add('sentInput');
  inputField.classList.remove('inputDiv');
  sendButton.setAttribute("style", hideSendButton);

  //show answer
  answer.innerHTML = document.querySelector('#inputField').value;
  setTimeout(function () {
    floatAnswer();
    setTimeout(function () {
      inputField.setAttribute("style", hideInputField);
    }, 10);
  }, 200);

  //show next question
  setTimeout(function () {
    hideAnswer();
    setTimeout(function () {
      titles.setAttribute("style", bigTitle);

      setTimeout(function () {
        inputField.classList.remove('sentInput');
        inputField.classList.add('inputDiv');
        inputFieldActual.value = "";
      }, 1200);

      setTimeout(function () {
        inputField.setAttribute("style", showInputField);
      }, 4000);

      setTimeout(function () {
        titles.innerHTML = "What's";
        rValueDots = 220;
        gValueDots = 220;
        bValueDots = 220;
      }, 5);

      setTimeout(function () {
        titles.innerHTML = "What's your";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 400);

      setTimeout(function () {
        titles.innerHTML = "What's your biggest";
        rValueDots = 240;
        gValueDots = 240;
        bValueDots = 240;
      }, 800);

      setTimeout(function () {
        titles.innerHTML = "What's your biggest fear";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 1200);

      setTimeout(function () {
        titles.innerHTML = "What's your biggest fear?";
        rValueDots = 255;
        gValueDots = 255;
        bValueDots = 255;
      }, 1600);
    }, 2200);
  }, 8200);

  gameStage = 3;
}

function question3() {

  inputField.classList.add('sentInput');
  inputField.classList.remove('inputDiv');
  sendButton.setAttribute("style", hideSendButton);

  //show answer
  answer.innerHTML = document.querySelector('#inputField').value;
  setTimeout(function () {
    floatAnswer();
  }, 200);

  //show next question
  setTimeout(function () {
    hideAnswer();
    setTimeout(function () {
      titles.setAttribute("style", bigTitle);

      setTimeout(function () {
        inputField.setAttribute("style", hideInputField);
      }, 900);

      setTimeout(function () {
        inputField.classList.remove('sentInput');
        inputField.classList.add('inputDiv');
        inputFieldActual.value = "";
      }, 1200);

      setTimeout(function () {
        inputField.setAttribute("style", showInputField);
      }, 4000);

      setTimeout(function () {
        titles.innerHTML = "When";
        rValueDots = 220;
        gValueDots = 220;
        bValueDots = 220;
      }, 5);

      setTimeout(function () {
        titles.innerHTML = "When was";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 400);

      setTimeout(function () {
        titles.innerHTML = "When was the";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 800);

      setTimeout(function () {
        titles.innerHTML = "When was the last";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 1200);

      setTimeout(function () {
        titles.innerHTML = "When was the last time";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 1600);

      setTimeout(function () {
        titles.innerHTML = "When was the last time you";
        rValueDots = 240;
        gValueDots = 240;
        bValueDots = 240;
      }, 2000);

      setTimeout(function () {
        titles.innerHTML = "When was the last time you cried";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 2400);

      setTimeout(function () {
        titles.innerHTML = "When was the last time you cried?";
        rValueDots = 255;
        gValueDots = 255;
        bValueDots = 255;
      }, 2800);
    }, 2200);
  }, 8200);

  gameStage = 4;
}

function question4() {

  inputField.classList.add('sentInput');
  inputField.classList.remove('inputDiv');
  sendButton.setAttribute("style", hideSendButton);

  //show answer
  answer.innerHTML = document.querySelector('#inputField').value;
  setTimeout(function () {
    floatAnswer();
  }, 200);

  //show next question
  setTimeout(function () {
    hideAnswer();
    setTimeout(function () {
      titles.setAttribute("style", bigTitle);

      setTimeout(function () {
        inputField.setAttribute("style", hideInputField);
      }, 900);

      setTimeout(function () {
        inputField.classList.remove('sentInput');
        inputField.classList.add('inputDiv');
        inputFieldActual.value = "";
      }, 1200);

      setTimeout(function () {
        inputField.setAttribute("style", showInputField);
      }, 4000);

      setTimeout(function () {
        titles.innerHTML = "What";
        rValueDots = 220;
        gValueDots = 220;
        bValueDots = 220;
      }, 5);

      setTimeout(function () {
        titles.innerHTML = "What made";
        rValueDots = 230;
        gValueDots = 230;
        bValueDots = 230;
      }, 400);

      setTimeout(function () {
        titles.innerHTML = "What made you";
        rValueDots = 240;
        gValueDots = 240;
        bValueDots = 240;
      }, 800);

      setTimeout(function () {
        titles.innerHTML = "What made you cry";
        rValueDots = 250;
        gValueDots = 250;
        bValueDots = 250;
      }, 1200);

      setTimeout(function () {
        titles.innerHTML = "What made you cry?";
        rValueDots = 255;
        gValueDots = 255;
        bValueDots = 255;
      }, 1600);
    }, 2200);
  }, 8200);

  gameStage = 5;
}

function question5() {

  inputField.classList.add('sentInput');
  inputField.classList.remove('inputDiv');
  sendButton.setAttribute("style", hideSendButton);

  //show answer
  answer.innerHTML = document.querySelector('#inputField').value;
  setTimeout(function () {
    floatAnswer();
  }, 200);

  //show next question
  setTimeout(function () {
    hideAnswer();
    setTimeout(function () {
      titles.setAttribute("style", bigTitle);

      setTimeout(function () {
        inputField.setAttribute("style", hideInputField);
      }, 900);

      setTimeout(function () {
        inputField.classList.remove('sentInput');
        inputField.classList.add('inputDiv');
        inputFieldActual.value = "";
      }, 1200);

      setTimeout(function () {
        inputField.setAttribute("style", showInputField);
      }, 4000);

      setTimeout(function () {
        titles.innerHTML = "What's";
        rValueDots = 220;
        gValueDots = 220;
        bValueDots = 220;
      }, 5);

      setTimeout(function () {
        titles.innerHTML = "What's your";
        titles.setAttribute("style", "color: rgba(230, 210, 210, 1);");
        rValueDots = 230;
        gValueDots = 210;
        bValueDots = 210;
      }, 400);

      setTimeout(function () {
        titles.innerHTML = "What's your biggest";
        titles.setAttribute("style", "color: rgba(240, 200, 200, 1);");
        rValueDots = 240;
        gValueDots = 200;
        bValueDots = 200;
      }, 800);

      setTimeout(function () {
        titles.innerHTML = "What's your biggest dream";
        titles.setAttribute("style", "color: rgba(255, 190, 190, 1);");
        rValueDots = 255;
        gValueDots = 190;
        bValueDots = 190;
      }, 1200);

      setTimeout(function () {
        titles.innerHTML = "What's your biggest dream?";
        titles.setAttribute("style", "color: rgba(255, 180, 180, 1);");
        rValueDots = 255;
        gValueDots = 180;
        bValueDots = 180;
      }, 1600);
    }, 2200);
  }, 8200);

  gameStage = 6;
}

function endGame() {

    inputField.classList.add('sentInput');
    inputField.classList.remove('inputDiv');
    sendButton.setAttribute("style", hideSendButton);

    //show answer
    answer.innerHTML = document.querySelector('#inputField').value;
    setTimeout(function () {
      floatAnswer();
    }, 200);

    //show next question
    setTimeout(function () {
      hideAnswer();
      setTimeout(function () {
        titles.setAttribute("style", bigTitle);

        setTimeout(function () {
          inputField.setAttribute("style", hideInputField);
        }, 900);

        setTimeout(function () {
          inputField.classList.remove('sentInput');
          inputField.classList.add('inputDiv');
          inputFieldActual.value = "";
        }, 1200);

        setTimeout(function () {
          titles.setAttribute("style", "color: rgba(255, 190, 190, 1);");
          titles.innerHTML = "We";
          rValueDots = 250;
          gValueDots = 200;
          bValueDots = 200;
        }, 5);

        setTimeout(function () {
          titles.setAttribute("style", "color: rgba(255, 230, 230, 1);");
          titles.innerHTML = "We hope";
          rValueDots = 240;
          gValueDots = 200;
          bValueDots = 200;
        }, 400);

        setTimeout(function () {
          titles.setAttribute("style", "color: rgba(255, 240, 240, 1);");
          titles.innerHTML = "We hope";
          rValueDots = 230;
          gValueDots = 200;
          bValueDots = 200;
        }, 800);

        setTimeout(function () {
          titles.setAttribute("style", "color: rgba(255, 255, 255, 1);");
          titles.innerHTML = "We hope this";
          rValueDots = 220;
          gValueDots = 200;
          bValueDots = 200;
        }, 1200);

        setTimeout(function () {
          titles.innerHTML = "We hope this";
          rValueDots = 210;
          gValueDots = 200;
          bValueDots = 200;
        }, 1600);

        setTimeout(function () {
          titles.innerHTML = "We hope this experience";
          rValueDots = 200;
          gValueDots = 200;
          bValueDots = 200;
        }, 2000);

        setTimeout(function () {
          titles.innerHTML = "Has";
          rValueDots = 180;
          gValueDots = 180;
          bValueDots = 180;
        }, 4000);

        setTimeout(function () {
          titles.innerHTML = "Has allowed";
          rValueDots = 160;
          gValueDots = 160;
          bValueDots = 160;
        }, 4400);

        setTimeout(function () {
          titles.innerHTML = "Has allowed you";
          rValueDots = 140;
          gValueDots = 140;
          bValueDots = 140;
        }, 4800);

        setTimeout(function () {
          titles.innerHTML = "Has allowed you to";
          rValueDots = 120;
          gValueDots = 120;
          bValueDots = 120;
        }, 5200);

        setTimeout(function () {
          titles.innerHTML = "Has allowed you to feel";
          rValueDots = 100;
          gValueDots = 100;
          bValueDots = 100;
        }, 5600);

        setTimeout(function () {
          titles.innerHTML = "Has allowed you to feel heard";
          rValueDots = 80;
          gValueDots = 80;
          bValueDots = 80;
        }, 6000);

        setTimeout(function () {
          titles.innerHTML = "This";
          rValueDots = 60;
          gValueDots = 60;
          bValueDots = 60;
        }, 8000);

        setTimeout(function () {
          titles.innerHTML = "This is";
          rValueDots = 40;
          gValueDots = 40;
          bValueDots = 40;
        }, 8400);

        setTimeout(function () {
          titles.innerHTML = "This is your";
          rValueDots = 20;
          gValueDots = 20;
          bValueDots = 20;
        }, 8800);

        setTimeout(function () {
          titles.innerHTML = "This is your conversation";
          rValueDots = 0;
          gValueDots = 0;
          bValueDots = 0;
        }, 9200);

        setTimeout(function () {
          titles.innerHTML = "This is your conversation map";
          rValueDots = 0;
          gValueDots = 0;
          bValueDots = 0;
        }, 9600);

        setTimeout(function () {
          titles.innerHTML = "Thank";
          rValueDots = 0;
          gValueDots = 0;
          bValueDots = 0;
        }, 11600);

        setTimeout(function () {
          titles.innerHTML = "Thank you";
          rValueDots = 0;
          gValueDots = 0;
          bValueDots = 0;
        }, 12000);

        setTimeout(function () {
          titles.innerHTML = "Thank you for";
          rValueDots = 0;
          gValueDots = 0;
          bValueDots = 0;
        }, 12400);

        setTimeout(function () {
          titles.innerHTML = "Thank you for sharing";
          rValueDots = 0;
          gValueDots = 0;
          bValueDots = 0;
        }, 12800);

      }, 2200);
    }, 8200);

    gameStage = 7;
  }

function bgOn() {
  startGame = true;
}

function textInput() {
  sendButton.setAttribute("style", showSendButton);
  sendButton.classList.add('sendButtonHover');
}

function whiteToPurpleDots() {
  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 225;
    bValueDots = 255;
  }, 100);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 200;
    bValueDots = 255;
  }, 200);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 175;
    bValueDots = 255;
  }, 300);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 150;
    bValueDots = 255;
  }, 400);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 125;
    bValueDots = 255;
  }, 500);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 100;
    bValueDots = 255;
  }, 600);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 80;
    bValueDots = 255;
  }, 750);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 60;
    bValueDots = 255;
  }, 900);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 40;
    bValueDots = 255;
  }, 1100);

  setTimeout(function () {
    rValueDots = 255;
    gValueDots = 25;
    bValueDots = 255;
  }, 1300);
}

// function hideAnswer() {
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.25;");
//   }, 100);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.23;");
//   }, 200);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.21;");
//   }, 300);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.19;");
//   }, 400);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.17;");
//   }, 500);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.15;");
//   }, 600);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.13;");
//   }, 700);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.11;");
//   }, 800);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.09;");
//   }, 900);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.06;");
//   }, 1000);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.03;");
//   }, 1100);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.01;");
//   }, 1300);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0;");
//   }, 1500);
// }

function hideAnswer() {
  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 1; color: black; font-size: 300px;");
  }, 1);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.9; color: black; font-size: 300px;");
  }, 100);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.8; color: black; font-size: 300px;");
  }, 200);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.7; color: black; font-size: 300px;");
  }, 300);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.6; color: black; font-size: 300px;");
  }, 400);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.5; color: black; font-size: 300px;");
  }, 500);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.4; color: black; font-size: 300px;");
  }, 600);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.3; color: black;  font-size: 300px;");
  }, 700);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.2; color: black;  font-size: 300px;");
  }, 800);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0.1; color: black; font-size: 300px;");
  }, 900);

  setTimeout(function () {
    answer.setAttribute("style", "display: flex; opacity: 0; color: black; font-size: 300px;");
  }, 1000);
}

function floatAnswer() {
    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.01; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 300px;");
    }, 1);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.05; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 300px;");
    }, 100);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.1; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 310px;");
    }, 200);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.3; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 310px;");
    }, 300);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.5; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 310px;");
    }, 400);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.7; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 310px;");
    }, 500);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.8; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 310px;");
    }, 600);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 0.9; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5));  font-size: 310px;");
    }, 700);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 1; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5));  font-size: 310px;");
    }, 800);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 1; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 310px;");
    }, 900);

    setTimeout(function () {
      answer.setAttribute("style", "display: flex; opacity: 1; color: black; filter: blur(0px) drop-shadow(0px 0px 50px rgba(10, 10, 10, 5)); font-size: 300px;");
    }, 1000);
}

// function floatAnswer() {
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 0px; opacity: 0.01;");
//   }, 100);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 5px; opacity: 0.02;");
//   }, 200);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 10px; filter: blur(6px); opacity: 0.03;");
//   }, 300);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 20px; filter: blur(6px); opacity: 0.04;");
//   }, 400);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 30px; filter: blur(6px); opacity: 0.05;");
//   }, 500);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 40px; filter: blur(6px); opacity: 0.06;");
//   }, 600);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 50px; filter: blur(6px); opacity: 0.07;");
//   }, 750);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 60px; filter: blur(6px); opacity: 0.08;");
//   }, 900);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 70px; filter: blur(5px); opacity: 0.09;");
//   }, 1100);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 80px; filter: blur(5px); opacity: 0.1;");
//   }, 1300);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 100px; filter: blur(5px); opacity: 0.15;");
//   }, 1500);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 120px; filter: blur(5px); opacity: 0.2;");
//   }, 1700);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 140px; filter: blur(6px); opacity: 0.25;");
//   }, 1900);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 160px; filter: blur(6px);");
//   }, 2100);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 180px; filter: blur(6px);");
//   }, 2300);
//
//   setTimeout(function () {
//     answer.setAttribute("style", "display: flex; bottom: 200px; filter: blur(7px);");
//   }, 2500);
// }

animate();

// function connect() {
//   let opacityValue = 1;
//   for (var a = 0; a <  particleArray.length; a++) {
//     for (var b = a; b <  particleArray.length; b++) {
//       let dx = particleArray[a].x - particleArray[b].x;
//       let dy = particleArray[a].y - particleArray[b].y;
//       let distance = Math.sqrt(dx * dx + dy * dy);
//       opacityValue = 1 - (distance/50);
//       ctx.strokeStyle = "rgba(255,255,255," + opacityValue +")";
//
//       // if (distance < 10000) {
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(particleArray[a].x, particleArray[a].y);
//         ctx.lineTo(particleArray[a].x, particleArray[a].y);
//         ctx.stroke();
//       // }
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", startGame);
//
// function startGame() {
//   document.getElementById("questionh1").innerHTML = currentQuestion;
// }
