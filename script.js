//Credits:
//Button sample by Mellau via freesound.org
//Card press sample by NenadSimic via freesound.org
//Card snap sample by alparbalazs via freesound.org
//Background music sample by joshuaempyre via freesound.org
//Win jingle music sample by sonically_sound via freesound.org

let cards = [];
let font;
let buttonPress, cardPress, cardSnap, gameMusic, winJingle;
let Cyberlaws, FraudAndDevices, FraudAndComputers, Communication, Interception, UnlawfulAccess, lawBook, lockedComp, lockedOut, question2, Chip;
let CyberlawsImg, FraudAndDevicesImg, FraudAndComputersImg, CommunicationImg, pInterceptionImg, UnlawfulAccessImg, lawBookImg, LockedComputerImg, LockedOutImg, Question2Img, ChipImg;
let center1, center2, center3, center4, center5;
let slider, sliderY, volume0Img, volume1Img, gameAmp, effectAmp, muted, prevAmp;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 255;
let fadeSpeed = -1.5;
let confirm = false;
let cancel = false;
let round2 = false;
let gameNum = 1;
let cardPressed = false;
let playOnce = true;
audio = true;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4
//second question = 5

function setCardsoffScreen() { //moves images based on which screen is displayed
  Communication.pos = { x: -100, y: -100 };
  FraudAndComputers.pos = { x: -100, y: -100 };
  FraudAndDevices.pos = { x: -100, y: -100 };
  UnlawfulAccess.pos = { x: -100, y: -100 };
  Interception.pos = { x: -100, y: -100 };
  Cyberlaws.pos = { x: -300, y: -300 };
  if (screen === 0) {
    lawBook.scale = 0.0006 * width;
    lawBook.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lawBook.pos = { x: -100000, y: -200 };
  } if (screen === 3) {
    lockedComp.pos = { x: -100000, y: -200 };
  }
  else {
    lockedComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    lockedOut.pos = { x: -100000, y: -200 };
  }
  else {
    lockedOut.pos = { x: -100000, y: -200 };
  }

  if (round2 === true) {
    Communication.pos = { x: -100, y: -100 };
    FraudAndComputers.pos = { x: -100, y: -100 };
    FraudAndDevices.pos = { x: -100, y: -100 };
    UnlawfulAccess.pos = { x: -100, y: -100 };
    Interception.pos = { x: -100, y: -100 };
    CyberlawsImg.pos = { x: -300, y: -300 }; //changed here
    if (screen === 0) {
      lawBook.scale = 0.0006 * width;
      lawBook.pos = { x: width * .5, y: height * .5 };
    }
    else {
      lawBook.pos = { x: -100000, y: -200 };
    } if (screen === 3) {
      lockedComp.pos = { x: -100000, y: -200 };
    }
    else {
      lockedComp.pos = { x: -100000, y: -200 };
    }
    if (screen === 4) {
      lockedOut.pos = { x: -100000, y: -200 };
    }
    else {
      lockedOut.pos = { x: -100000, y: -200 };
    }
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height + 80) {
      buttonPress.play();
      if (screen == 3) {
        winJingle.stop();
        gameMusic.loop();
      }
      if (gameNum == 1) {
        screen = 2;
        FraudAndDevices.position = createVector(width * .5, height - 70);
        FraudAndComputers.position = createVector(width * .8, height - 70);
        Communication.position = createVector(width * .2, height - 70);
        Interception.position = createVector(width * .35, height - 70);
        UnlawfulAccess.position = createVector(width * .65, height - 70);
      }
      else if (gameNum == 2) {
        screen = 5;
        FraudAndDevices.position = createVector(width * .65, height - 40);
        FraudAndComputers.position = createVector(width * .2, height - 125);
        Communication.position = createVector(width * .8, height - 125);
        Interception.position = createVector(width * .35, height - 40);
        UnlawfulAccess.position = createVector(width * .5, height - 125);
      }

      Cyberlaws.pos = { x: width * .3, y: height / 2 - 10 };
      lawBook.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen == 2 && confirm && !cancel) { //checks if user wins or loses from submit prompt
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
      if (
        dist(FraudAndDevices.x, FraudAndDevices.y, center1.x, center1.y) < 1 &&
        dist(FraudAndComputers.x, FraudAndComputers.y, center2.x, center2.y) < 1 &&
        dist(Communication.x, Communication.y, center3.x, center3.y) < 1 &&
        dist(Interception.x, Interception.y, center4.x, center4.y) < 1 &&
        dist(UnlawfulAccess.x, UnlawfulAccess.y, center5.x, center5.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }
  else if (screen === 3 && gameNum == 1) { // If on the instructions/restart/lose screen
    // Press begin button or restart button pressed
    console.log(gameNum);
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      gameNum++;
      screen = 5;
      round2Setup();
      // Set positions for round 2
      FraudAndDevices.position = createVector(width * .65, height - 40);
      FraudAndComputers.position = createVector(width * .2, height - 125);
      Communication.position = createVector(width * .8, height - 125);
      Interception.position = createVector(width * .35, height - 40);
      UnlawfulAccess.position = createVector(width * .5, height - 125);
      lockedComp.position = createVector(-400, -400);
      lawBook.position = createVector(-400, -400);
      Cyberlaws.pos = { x: width * .3, y: height / 2 - 30 };
    }
  }
  else if (screen === 3) {
    // Press begin button or restart button pressed
    console.log("screen 3");
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      gameNum--;
      winJingle.stop();
      screen = 2;
      // Show question for round 1
      setup();
      showQ1();
      // Set positions for round 1
      FraudAndDevices.position = createVector(width * .5, height - 70);
      FraudAndComputers.position = createVector(width * .8, height - 70);
      Communication.position = createVector(width * .2, height - 70);
      Interception.position = createVector(width * .35, height - 70);
      UnlawfulAccess.position = createVector(width * .65, height - 70);
      // Set positions for other elements in round 1
      Cyberlaws.pos = { x: width * .3, y: height / 2 - 10 };
    }

  }

  //If on the round 2 game screen
  else if (screen == 5 && confirm && !cancel) {
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
      if (
        dist(FraudAndDevices.x, FraudAndDevices.y, center1.x, center1.y) < 1 &&
        dist(FraudAndComputers.x, FraudAndComputers.y, center2.x, center2.y) < 1 &&
        dist(Communication.x, Communication.y, center3.x, center3.y) < 1 &&
        dist(Interception.x, Interception.y, center4.x, center4.y) < 1 &&
        dist(UnlawfulAccess.x, UnlawfulAccess.y, center5.x, center5.y) < 1
      ) {
        console.log("you win!");
        round2 = true;
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }

  //If on the round 1 game screen
  if (screen === 2) {
    cardPressed = true;
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://www.oas.org/juridico/spanish/us_cyb_law_int_commun.pdf');
    }
  }
  //If on the round 2 game screen
  else if (screen === 5) {
    cardPressed = true;
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://www.oas.org/juridico/spanish/us_cyb_law_int_commun.pdf');
    }
  }

    // mute button pressed
    let buttonCenterDist = dist(mouseX, mouseY, 40, height - 40);
    if (buttonCenterDist < 25) { muted = !muted; }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    if (cardPressed) {
      cardPress.play();
      cardPressed = false;
    }
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 50 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 50):
        if (card.x != center1.x && card.y != center1.y) {
          cardSnap.play();
        }
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 50 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 50):
        if (card.x != center2.x && card.y != center2.y) {
          cardSnap.play();
        }
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 50 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 50):
        if (card.x != center3.x && card.y != center3.y) {
          cardSnap.play();
        }
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 50 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 50):
        if (card.x != center4.x && card.y != center4.y) {
          cardSnap.play();
        }
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 50 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 50):
        if (card.x != center5.x && card.y != center5.y) {
          cardSnap.play();
        }
        card.position = center5;
        snapped = true;
        break;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() { //submit screen appears if all the cards have been snapped to a position
  let numSnapped = 0;
  for (let card of cards) {
    if (
      dist(card.x, card.y, center1.x, center1.y) < 1 ||
      dist(card.x, card.y, center2.x, center2.y) < 1 ||
      dist(card.x, card.y, center3.x, center3.y) < 1 ||
      dist(card.x, card.y, center4.x, center4.y) < 1 ||
      dist(card.x, card.y, center5.x, center5.y) < 1
    ) {
        numSnapped++;
    }
  }
  if (numSnapped == 5) {
    confirm = true;
  }
}

function preload() { //load fonts, images and sounds
  CyberlawsImg = loadImage('assets/CyberLaws/1/Cyberlaws.png');
  FraudAndDevicesImg = loadImage('assets/CyberLaws/1/FraudAndDevices.png');
  FraudAndComputersImg = loadImage('assets/CyberLaws/1/FraudAndComputers.png');
  CommunicationImg = loadImage('assets/CyberLaws/1/Communication.png');
  InterceptionImg = loadImage('assets/CyberLaws/1/Interception.png');
  UnlawfulAccessImg = loadImage('assets/CyberLaws/1/UnlawfulAccess.png');
  lawBookImg = loadImage('assets/CyberLaws/1/lawBook.png');
  LockedComputerImg = loadImage('assets/CyberLaws/1/lockedComputer.png');
  LockedOutImg = loadImage('assets/CyberLaws/1/lockedout.png');
  winJingle = loadSound('assets/CyberLaws/1/winJingle.wav');

  font = loadFont('assets/CyberLaws/2/MechaRx20Regular-j9Zy9.otf');
  font2 = loadFont('assets/CyberLaws/2/Metropolis-Regular.otf');
  ChipImg = loadImage('assets/CyberLaws/2/Chip.png');
  buttonPress = loadSound('assets/CyberLaws/2/buttonPress.wav');
  cardPress = loadSound('assets/CyberLaws/2/cardPress.wav');
  cardSnap = loadSound('assets/CyberLaws/2/cardSnap.wav');
  gameMusic = loadSound('assets/CyberLaws/2/gameMusic.wav');
  Question2Img = loadImage('assets/CyberLaws/2/round2Question.png');
  illegalImg = loadImage('assets/CyberLaws/2/illegal_5.png');
  involves_2Img = loadImage('assets/CyberLaws/2/Involves_2.png');
  ProhibitsImg = loadImage('assets/CyberLaws/2/prohibitsM_3.png');
  PossessionImg = loadImage('assets/CyberLaws/2/prohibitsP_1.png');
  unauthorizedImg = loadImage('assets/CyberLaws/2/unauthorized_4.png');
  volume0Img = loadImage('assets/CyberLaws/2/volume0.png');
  volume1Img = loadImage('assets/CyberLaws/2/volume1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ////////////////////////////////////////////
  ////////////////// GAME 1 //////////////////
  ////////////////////////////////////////////

  center1 = createVector(width * .7, height * .285);
  center2 = createVector(width * .7, height * .388);
  center3 = createVector(width * .7, height * .49);
  center4 = createVector(width * .7, height * .6);
  center5 = createVector(width * .7, height * .705);

  soundFormats('wav');
  gameMusic.loop();

  Cyberlaws = new Sprite(width / 2, height / 2 - 10);
  Cyberlaws.addImage(CyberlawsImg);
  Cyberlaws.collider = 'k';
  Cyberlaws.scale = .0003 * width;

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  lawBook = new Sprite(width * .505, height * .5);
  lawBook.addImage(lawBookImg);
  lawBook.collider = 'k';
  lawBookImg.scale = .0006 * width;

  lockedOut = new Sprite(width / 2, height * .5);
  lockedOut.addImage(LockedOutImg);
  lockedOut.collider = 'k';
  lockedOut.pos = { x: -400, y: -400 };

  lockedComp = new Sprite(width / 2, height * .5);
  lockedComp.addImage(LockedComputerImg);
  lockedComp.collider = 'k';
  lockedComp.pos = { x: -400, y: -400 };

  FraudAndDevices = new cards.Sprite(width * .5, height - 70);
  FraudAndDevices.addImage(FraudAndDevicesImg);
  FraudAndDevices.scale = 0.000425 * width;
  cards[0] = FraudAndDevices;
  FraudAndDevices.originalPosition = createVector(width * .5, height - 70);

  FraudAndComputers = new cards.Sprite(width * .8, height - 70);
  FraudAndComputers.addImage(FraudAndComputersImg);
  FraudAndComputers.scale = 0.000425 * width;
  cards[1] = FraudAndComputers;
  FraudAndComputers.originalPosition = createVector(width * .8, height - 70);

  Communication = new cards.Sprite(width * .2, height - 70);
  Communication.addImage(CommunicationImg);
  Communication.scale = 0.000425 * width;
  cards[2] = Communication;
  Communication.originalPosition = createVector(width * .2, height - 70);

  Interception = new cards.Sprite(width * .35, height - 70);
  Interception.addImage(InterceptionImg);
  Interception.scale = 0.000425 * width;
  cards[3] = Interception;
  Interception.originalPosition = createVector(width * .35, height - 70);

  UnlawfulAccess = new cards.Sprite(width * .65, height - 70);
  UnlawfulAccess.addImage(UnlawfulAccessImg);
  UnlawfulAccess.scale = 0.000425 * width;
  cards[4] = UnlawfulAccess;
  UnlawfulAccess.originalPosition = createVector(width * .65, height - 70);


  Communication.pos = { x: -100, y: -100 };
  FraudAndComputers.pos = { x: -100, y: -100 };
  FraudAndDevices.pos = { x: -100, y: -100 };
  Interception.pos = { x: -100, y: -100 };
  UnlawfulAccess.pos = { x: -100, y: -100 };
  Cyberlaws.pos = { x: -200, y: -200 };
  lawBook.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  lockedOut.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };

    // adjust volumes
    gameAmp = 0.15;
    effectAmp = 0.5;

    gameMusic.amp(gameAmp);
    buttonPress.amp(effectAmp);
    cardPress.amp(effectAmp);
    cardSnap.amp(effectAmp);
    winJingle.amp(effectAmp);

    // set up volume control
    slider = createSlider(0, 1, 1, 0);
    muted = false;
    prevAmp = 1;
    sliderY = height + 10;
}

////////////////////////////////////////////
////////////////// GAME 2 //////////////////
////////////////////////////////////////////

function round2Setup() {
  center1 = createVector(width * .74, height * .27);
  center2 = createVector(width * .74, height * .373);
  center3 = createVector(width * .74, height * .47);
  center4 = createVector(width * .74, height * .57);
  center5 = createVector(width * .74, height * .665);

  //variable names unchanged
  Cyberlaws = new Sprite(width / 2, height / 2 - 10);
  Cyberlaws.addImage(Question2Img);
  Cyberlaws.collider = 'k';
  Cyberlaws.scale = .00075 * width;

  winJingle.stop();
  gameMusic.loop();

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  FraudAndDevices = new cards.Sprite(width * .65, height - 40);
  FraudAndDevices.addImage(PossessionImg);
  FraudAndDevices.scale = 0.0003 * width;
  cards[0] = FraudAndDevices;
  FraudAndDevices.originalPosition = createVector(width * .65, height - 40);

  FraudAndComputers = new cards.Sprite(width * .2, height - 125);
  FraudAndComputers.addImage(involves_2Img);
  FraudAndComputers.scale = 0.0003 * width;
  cards[1] = FraudAndComputers;
  FraudAndComputers.originalPosition = createVector(width * .2, height - 125);

  Communication = new cards.Sprite(width * .8, height - 125);
  Communication.addImage(ProhibitsImg);
  Communication.scale = 0.0003 * width;
  cards[2] = Communication;
  Communication.originalPosition = createVector(width * .8, height - 125);

  Interception = new cards.Sprite(width * .35, height - 40);
  Interception.addImage(unauthorizedImg);
  Interception.scale = 0.0003 * width;
  cards[3] = Interception;
  Interception.originalPosition = createVector(width * .35, height - 40);

  UnlawfulAccess = new cards.Sprite(width * .5, height - 125);
  UnlawfulAccess.addImage(illegalImg);
  UnlawfulAccess.scale = 0.0003 * width;
  cards[4] = UnlawfulAccess;
  UnlawfulAccess.originalPosition = createVector(width * .5, height - 125);


  Communication.pos = { x: -100, y: -100 };
  FraudAndComputers.pos = { x: -100, y: -100 };
  FraudAndDevices.pos = { x: -100, y: -100 };
  Interception.pos = { x: -100, y: -100 };
  UnlawfulAccess.pos = { x: -100, y: -100 };
  Cyberlaws.pos = { x: -200, y: -200 };
  lawBook.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  lockedOut.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };
}

function draw() {
  // Set up the screen
  clear();
  background("white");


  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    showGameScreen(1);
  }
  else if (screen === 3) {
    showScreenWin();
  }
  else if (screen === 4) {
    showScreenLose();
  }
  else if (screen === 5) {
      showGameScreen(2);
  }

    // if all blanks are filled, ask to submit
    checkIfConfirm();

    //Check if we win!!!
    if (confirm && !cancel) {

        // submit back text
        rectMode(CORNER)
        const c = color(0, 179, 115);
        fill(255);
        noStroke();
        rect(width / 2 - 140, height - 130, 300, 110, 10);

        fill(0);
        textSize(20);
        textAlign(LEFT);
        text('Submit Answer?', width / 2 - 95, height - 105);

        // submit button
        fill(c);
        rect(width / 2 + 20, height - 80, 120, 40, 10);

        fill(255);
        textSize(17);
        text("Submit", width / 2 + 42, height - 60);

        // cancel button
        const r = color(195, 16, 16);
        fill(r);
        rect(width / 2 - 120, height - 80, 120, 40, 10);

        fill(255);
        text("Cancel", width / 2 - 105, height - 60);
    }

    volumeControl();
}

function windowResized() { //Adjusts size of canvas and screen elements based on screen size 
  resizeCanvas(windowWidth, windowHeight);
  if (screen === 2) {
    Cyberlaws.scale = .0003 * width;
    Cyberlaws.pos = { x: width * .3, y: height / 2 - 10 };
    FraudAndComputers.scale = 0.000425 * width;
    FraudAndComputers.originalPosition = createVector(width * .8, height - 70);
    FraudAndDevices.scale = 0.000425 * width;
    FraudAndDevices.originalPosition = createVector(width * .5, height - 70);
    Communication.scale = 0.000425 * width;
    Communication.originalPosition = createVector(width * .2, height - 70);
    Interception.scale = 0.000425 * width;
    Interception.originalPosition = createVector(width * .35, height - 70);
    UnlawfulAccess.scale = 0.000425 * width;
    UnlawfulAccess.originalPosition = createVector(width * .65, height - 70);
    center1 = createVector(width * .7, height * .285);
    center2 = createVector(width * .7, height * .388);
    center3 = createVector(width * .7, height * .49);
    center4 = createVector(width * .7, height * .6);
    center5 = createVector(width * .7, height * .705);
  }
  else if (screen === 5) {
    Cyberlaws.scale = .00075 * width;
    Cyberlaws.pos = { x: width * .3, y: height / 2 - 30 };
    FraudAndComputers.scale = 0.0003 * width;
    FraudAndComputers.originalPosition = createVector(width * .2, height - 125);
    FraudAndDevices.scale = 0.0003 * width;
    FraudAndDevices.originalPosition = createVector(width * .65, height - 40);
    Communication.scale = 0.0003 * width;
    Communication.originalPosition = createVector(width * .8, height - 125);
    Interception.scale = 0.0003 * width;
    Interception.originalPosition = createVector(width * .35, height - 40);
    UnlawfulAccess.scale = 0.0003 * width;
    UnlawfulAccess.originalPosition = createVector(width * .5, height - 125);
    center1 = createVector(width * .74, height * .27);
    center2 = createVector(width * .74, height * .373);
    center3 = createVector(width * .74, height * .47);
    center4 = createVector(width * .74, height * .57);
    center5 = createVector(width * .74, height * .665);
  }
}
function showStartScreen() {
    // set background
    setCardsoffScreen();
    const c = color(48, 116, 180);
    background(c);

    // load background image
    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    // back of center image
    rectMode(CENTER);
    fill(255);
    rect(width / 2, height / 2, width * .21, height * .5, 10);

    // title text
    fill(255);
    rect(width / 2, height / 8, 800, height / 10, 10);

    fill(0); // Black color
    textSize(60);
    textFont(font);
    textAlign(CENTER, CENTER); // Text alignment
    text("Cybercrime Laws", width / 2, height / 8);

    // Play button
    fill(255);
    noStroke();
    rect(width / 2, height - 100, 200, 40, 10);

    fill(0);
    textSize(20);
    text("Play", width / 2, height - 100);
}


function showInstructionScreen() {
    // set background
    setCardsoffScreen();
    background("white");

    // load background image
    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    // title text
    fill(0);
    textFont(font);
    rectMode(CENTER);
    rect(width / 2, height / 4 + 10, 600, height / 10, 10);

    const c = color(48, 116, 180);

    // Set text properties
    fill(c); // Blue color
    textSize(32); // Font size
    textAlign(CENTER, CENTER); // Text alignment
    textFont(font);
    text("Instructions", width / 2, height / 4 + 10);

    // Begin button
    fill(0);
    rect(width / 2, height - 100, 200, 40, 10);

    fill(255);
    textSize(20);
    text("Begin", width / 2, height - 100);

    // instructions text
    textSize(20); // Adjusted font size
    textAlign(CENTER, CENTER); // Adjusted text alignment

    fill(color(0));
    textFont(font2); // change font
    let textX = width / 2; // X position for the additional text
    let textY = height / 2 + 85; // Starting Y position for the additional text
    let textLeading = 24; // Line spacing
    let textWidth = 465; // Width of the text block
    let additionalText = "Your objective is to correctly place each card into its designated slot.\n\nTo play, click and hold on a card, then drag it to the numbered slot where you think it belongs.\n\nRelease the mouse to drop the card into place.\n\nWhen all cards have been placed, you'll see an option to check your answers.\n\nIf you're correct, you'll have the option to \nplay again.";

    text(additionalText, textX, textY, textWidth, height); // Display additional text with specified width and height
}

function showGameScreen(questionNum) {
    playOnce = true;

    // set background
    const c = color(48, 116, 180);
    background(c);

    // load background image
    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    // center image rectangle & game text
    if (questionNum == 1) {
        showQ1();
    }
    else if (questionNum == 2) {
        showQ2();
    }
    
    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);

    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 80, height - 35, 138, 38, 10);

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    textFont(font);
    text("Learn More", width - 80, height - 35);  // Learn More Button Text

    fill(255);
    noStroke();

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);

    // numbered circles
    fill(0);
    noStroke();
    circle(center1.x, center1.y, 45);
    circle(center2.x, center2.y, 45);
    circle(center3.x, center3.y, 45);
    circle(center4.x, center4.y, 45);
    circle(center5.x, center5.y, 45);

    fill(255);
    noStroke();
    textSize(30);
    textAlign(CENTER);
    textFont('Courier New');
    text("1", center1.x + 1, center1.y + 2);
    text("2", center2.x, center2.y + 2);
    text("3", center3.x, center3.y + 2);
    text("4", center4.x, center4.y + 2);
    text("5", center5.x, center5.y + 2);

    // arrows
    strokeWeight(5);
    stroke(0);
    line(center1.x * .65, center1.y, center1.x * .85, center1.y);
    line(center1.x * .825, center1.y - 20, center1.x * .85, center1.y);
    line(center1.x * .825, center1.y + 20, center1.x * .85, center1.y);

    line(center2.x * .65, center2.y, center2.x * .85, center2.y);
    line(center2.x * .825, center2.y - 20, center2.x * .85, center2.y);
    line(center2.x * .825, center2.y + 20, center2.x * .85, center2.y);

    line(center3.x * .65, center3.y, center3.x * .85, center3.y);
    line(center3.x * .825, center3.y - 20, center3.x * .85, center3.y);
    line(center3.x * .825, center3.y + 20, center3.x * .85, center3.y);

    line(center4.x * .65, center4.y, center4.x * .85, center4.y);
    line(center4.x * .825, center4.y - 20, center4.x * .85, center4.y);
    line(center4.x * .825, center4.y + 20, center4.x * .85, center4.y);

    line(center5.x * .65, center5.y, center5.x * .85, center5.y);
    line(center5.x * .825, center5.y - 20, center5.x * .85, center5.y);
    line(center5.x * .825, center5.y + 20, center5.x * .85, center5.y);

    strokeWeight(0);
    textFont(font);

    for (let card of cards) {
        handleDragging(card);
        snapToCenter(card);
    }
}

function showQ1() {
    // center image rectangle
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 10, width / 1.5, height / 1.75, 10);

    // game text
    noStroke();
    strokeWeight(1);
    rectMode(CENTER);
    rect(width / 2, 87.5, 900, 160, 10);

    // Display text content
    textSize(18);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER); // Text alignment
    textFont(font2);

    text("The following image provided shows several US federal laws related to cybercrimes.\n\nRearrange the list so that each law matches its correct description."
        , width / 2, 87, 880, 360);
}

function showQ2() {
    // center image rectangle
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 25, width / 1.3, height / 1.75, 10);

    // game text
    noStroke();
    strokeWeight(1);
    rectMode(CENTER);
    rect(width / 2, 87.5, 900, 140, 10);

    // Display text content
    textSize(18);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER); // Text alignment
    textFont(font2);

    text("Match the federal U.S. laws with their general definition.\n\n(Derived from slides from Dr. Wilson's Penetration Testing course at UF)"
        , width / 2, 87, 900, 360);
}

function showScreenWin() {
    if (playOnce) {
        gameMusic.stop();
        winJingle.play();
    }

    playOnce = false;

    // set background
    setCardsoffScreen();
    const c = color(0, 179, 115);
    background(c);

    // load background image
    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    //display win image
    fill(255);
    rectMode(CORNER);
    rect(width * .33, height * .33, width * .35, height * .48, 10);

    let imgX2 = lockedComp.width + 14;
    let imgY2 = lockedComp.height - 55;
    scale(.00095 * width);
    image(LockedComputerImg, imgX2, imgY2);
    scale(1 / (.00095 * width));

    //Animate alpha value for fading effect
    alphaValue += fadeSpeed;
    if (alphaValue >= 255 || alphaValue <= 140) {
        fadeSpeed *= -1; //Reverse the fade direction
    }

  if (gameNum == 1) { // 1st game
      // win title text
      fill(255, alphaValue);
      rectMode(CENTER);
      rect(width / 2, height * .2, width * .33, height * .2, 10);

      fill(0, alphaValue);
      textSize(32);
      textAlign(CENTER, CENTER);
      textFont(font);
      text("You Win this round!\n\nContinue to next round!", width / 2, height * .2);

      //Next button
      fill(255);
      rect(width / 2, height - 100, 200, 40, 10);

      fill(0);
      textSize(20);
      text("Next", width / 2, height - 100);
  }
  else if (gameNum != 1) { // 2nd game
      // win title text
      fill(255, alphaValue);
      rectMode(CENTER);
      rect(width / 2, height * .2, width * .33, height * .2, 10);

      fill(0, alphaValue);
      textSize(32);
      textAlign(CENTER, CENTER);
      textFont(font);
      text("You Win!\n\nThanks for playing!", width / 2, height * .2);

      //Restart button
      fill(255);
      rect(width / 2, height - 100, 200, 40, 10);

      fill(0);
      textSize(20);
      text("Restart", width / 2, height - 100);
  }

}

function showScreenLose() {
    // set background
    setCardsoffScreen();
    const r = color(195, 16, 16);
    background(r);

    // load background image
    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    //display lose image
    fill(255);
    rectMode(CORNER);
    rect(width * .33, height * .33, width * .35, height * .48, 10);

    let imgX2 = lockedOut.width + 20;
    let imgY2 = lockedOut.height - 20;
    scale(.001 * width);
    image(LockedOutImg, imgX2, imgY2);
    scale(1 / (.001 * width));

    //Set title text
    fill(255, alphaValue);
    rectMode(CENTER);
    rect(width / 2, height * .2, width * .2, height * .2, 10);

    fill(0, alphaValue);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont(font);
    text("Not Quite!\n\nTry again?", width / 2, height * .2);

    //Animate alpha value for fading effect
    alphaValue += fadeSpeed;
    if (alphaValue >= 255 || alphaValue <= 140) {
        fadeSpeed *= -1; //Reverse the fade direction
    }

    //Restart button
    fill(255);
    rect(width / 2, height - 100, 200, 40, 10);

    fill(0);
    textSize(20);
    text("Restart", width / 2, height - 100);
}


function volumeControl() {
    // mute button
    fill(0);
    circle(40, height - 40, 50);

    fill(235);
    circle(40, height - 40, 44);

    // button images
    let x = 990;
    let y = 34250;

    if (muted) {
        scale(.000013 * width);
        image(volume0Img, x, y);
        scale(1 / (.000013 * width));
    }
    else {
        scale(.000013 * width);
        image(volume1Img, x, y);
        scale(1 / (.000013 * width));
    }

    // volume slider movement
    let buttonCenterDist = dist(mouseX, mouseY, 40, height - 40);

    if (sliderY > height - 50 && mouseX < 250 && mouseY > height - 80) { // mouse in general area
        sliderY -= 5;
    }
    else if (sliderY <= height + 10 && (mouseX >= 250 || mouseY <= height - 80)) { // mouse outside general area
        sliderY += 5;
    }

    // volume slider
    slider.position(90, sliderY);

    fill(0);
    circle(95, sliderY + 10, 30);
    circle(220, sliderY + 10, 30);
    rectMode(CENTER);
    rect(157.5, sliderY + 10, 125, 30);

    fill(235);
    circle(95, sliderY + 10, 24);
    circle(220, sliderY + 10, 24);
    rectMode(CENTER);
    rect(157.5, sliderY + 10, 125, 24);

    // slider volume logic
    let currAmp = slider.value();

    // if the slider is moved while muted, unmute
    if (muted && (prevAmp != currAmp)) { muted = false; }

    if (currAmp <= 0) { muted = true; }

    if (!muted) {
        gameMusic.amp(gameAmp * currAmp);
        buttonPress.amp(effectAmp * currAmp);
        cardPress.amp(effectAmp * currAmp);
        cardSnap.amp(effectAmp * currAmp);
        winJingle.amp(effectAmp * currAmp);
    }
    else {
        gameMusic.amp(0);
        buttonPress.amp(0);
        cardPress.amp(0);
        cardSnap.amp(0);
        winJingle.amp(0);
    }

    prevAmp = currAmp;
}