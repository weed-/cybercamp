/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

// Current scene
var ballPositionR = new Vector(0, 0);
var animationStateR = [0.0, 0.0];
var blobPositionR = [new Vector(0.0, 0.0), new Vector(0.0, 0.0)];
var blobScoresR = [0, 0];
var servingPlayerR = -1;

var RenderManager = function ()
{
    this.canvas = document.getElementById("screen");
    this.context2D = this.canvas.getContext("2d");
};

// load blobby images
var blobby1Img = new Array(5);
var blobby2Img = new Array(5);
for (var i = 0; i < 5; i++)
{
    blobby1Img[i] = new Image();
    blobby2Img[i] = new Image();
    blobby1Img[i].src = "data/img/" + i + "b.png";
    blobby2Img[i].src = "data/img/" + i + "r.png";
}

// load font
var fontImg = new Array(11);
for (var i = 0; i < 11; i++)
{
    fontImg[i] = new Image();
    fontImg[i].src = "data/img/f" + i + ".png";
}

var backgroundImg = new Image();
backgroundImg.src = "data/img/strand1.png";

var ballImg = new Image();
ballImg.src = "data/img/ball01.png";

var pokalImg = new Image();
pokalImg.src = "data/img/pokal.png";

var titleImg = new Image();
titleImg.src = "data/img/titel.png";

var keyImg = new Image();
keyImg.src = "data/img/key.png";

function drawMenu()
{
    guiManager.drawGUIElements();
}

function drawWin()
{
    this.drawMenu();
}

function drawGame()
{
    canvas = renderManager.context2D;
    canvas.drawImage(backgroundImg, 0, 0);
    canvas.fillRect(ballPositionR.x - 2, 5, 5, 5);
    canvas.drawImage(ballImg, ballPositionR.x - BALL_RADIUS, ballPositionR.y - BALL_RADIUS);
    canvas.drawImage(
            blobby1Img[Math.round(animationStateR[LEFT_PLAYER])],
            blobPositionR[LEFT_PLAYER].x - BLOBBY_WIDTH / 2,
            blobPositionR[LEFT_PLAYER].y - BLOBBY_HEIGHT / 2);

    canvas.drawImage(
            blobby2Img[Math.round(animationStateR[RIGHT_PLAYER])],
            blobPositionR[RIGHT_PLAYER].x - BLOBBY_WIDTH / 2,
            blobPositionR[RIGHT_PLAYER].y - BLOBBY_HEIGHT / 2);

    canvas.fillStyle = "rgb(255, 255, 255)";

    if (blobScoresR[RIGHT_PLAYER] > 9) {
        canvas.drawImage(fontImg[1], 724, 20);
        canvas.drawImage(fontImg[blobScoresR[RIGHT_PLAYER] - 10], 748, 20);
    } else {
        canvas.drawImage(fontImg[0], 724, 20);
        canvas.drawImage(fontImg[blobScoresR[RIGHT_PLAYER]], 748, 20);
    }

    if (blobScoresR[LEFT_PLAYER] > 9)
    {
        canvas.drawImage(fontImg[1], 44, 20);
        canvas.drawImage(fontImg[blobScoresR[LEFT_PLAYER] - 10], 68, 20);
    } else {
        canvas.drawImage(fontImg[0], 44, 20);
        canvas.drawImage(fontImg[blobScoresR[LEFT_PLAYER]], 68, 20);
    }

    //canvas.fillText  (leftScore, 30, 20);
    //canvas.fillText  (rightScore, 740, 20);
    if (servingPlayerR === RIGHT_PLAYER)
        canvas.drawImage(fontImg[10], 700, 20);
    else if (servingPlayerR === LEFT_PLAYER)
        canvas.drawImage(fontImg[10], 20, 20);
    
    guiManager.drawGUIElements();
}

function setRendererBallPosition(vector)
{
    ballPositionR = vector;
}

function setBlobbyAnimationStates(state)
{
    animationStateR = state;
}

function setBlobbyPositions(positions)
{
    blobPositionR = positions;
}

function setScoresAndServingPlayer(leftScore, rightScore, servingPlayer)
{
    blobScoresR[LEFT_PLAYER] = leftScore;
    blobScoresR[RIGHT_PLAYER] = rightScore;
    servingPlayerR = servingPlayer;
}
