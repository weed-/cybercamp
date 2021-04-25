/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * Keyboard input for human players
 */


// Marker for players (is key pressed or not)
var playerKeyboardInput = [new Input(), new Input()];

/*
 * Left player key down processing
 */
function onKeyDownLeftPlayer(event)
{
    var consumed = true;

    if (event.keyCode === 65) {
        playerKeyboardInput[LEFT_PLAYER].left = 1;
    } else if (event.keyCode === 68) {
        playerKeyboardInput[LEFT_PLAYER].right = 1;
    } else if (event.keyCode === 87) {
        playerKeyboardInput[LEFT_PLAYER].up = 1;
    } else {
        consumed = false;
    }

    return consumed;
}

/*
 * Left player key up processing
 */
function onKeyUpLeftPlayer(event)
{
    if (event.keyCode === 65) {
        playerKeyboardInput[LEFT_PLAYER].left = 0;
    }
    if (event.keyCode === 68) {
        playerKeyboardInput[LEFT_PLAYER].right = 0;
    }
    if (event.keyCode === 87) {
        playerKeyboardInput[LEFT_PLAYER].up = 0;
    }
}

/*
 * Right player key down processing
 */
function onKeyDownRightPlayer(event)
{
    var consumed = true;

    if (event.keyCode === 72) {
        playerKeyboardInput[RIGHT_PLAYER].left = 1;
    } else if (event.keyCode === 75) {
        playerKeyboardInput[RIGHT_PLAYER].right = 1;
    } else if (event.keyCode === 85) {
        playerKeyboardInput[RIGHT_PLAYER].up = 1;
    } else {
        consumed = false;
    }

    return consumed;
}

/*
 * Right player up down processing
 */
function onKeyUpRightPlayer(event)
{
    if (event.keyCode === 72) {
        playerKeyboardInput[RIGHT_PLAYER].left = 0;
    }
    if (event.keyCode === 75) {
        playerKeyboardInput[RIGHT_PLAYER].right = 0;
    }
    if (event.keyCode === 85) {
        playerKeyboardInput[RIGHT_PLAYER].up = 0;
    }
}

/**
 * Callback for key down events which an player or
 * the gui can consume
 */
function onKeyDown(event)
{
    var consumed = false;

    // Process keyevent for left player
    consumed = (onKeyDownLeftPlayer(event) === true) ? true : onKeyDownRightPlayer(event);

    // If keyevent is not processed, check if it is an event for the gui
    if (consumed === false) {
        stateManager.guiManager.onKeyDown(event);
    }
}

/**
 * Callback for key up events which an player or
 * the gui can consume
 */
function onKeyUp(event)
{
    onKeyUpLeftPlayer(event);
    onKeyUpRightPlayer(event);
}

/**
 * Returns the pressed keys of player
 */
function resetPlayerKeys(player) {
    playerKeyboardInput[player].left = 0;
    playerKeyboardInput[player].right = 0;
    playerKeyboardInput[player].up = 0;
}

/**
 * Returns the pressed keys of all players
 */
function resetKeys() {
    resetPlayerKeys(LEFT_PLAYER);
    resetPlayerKeys(RIGHT_PLAYER);
}

/**
 * Callback called by InputManager
 */
var keyBoardInputCallback = function getKeyboardInput(player)
{
    return playerKeyboardInput[player];
};

/**
 * Return Callback called by InputManager
 */
function createKeyboardInput() {
    resetKeys();
    return keyBoardInputCallback;
}

var KeyboardInput = function (player) {
    this.player = player;

    this.input = keyBoardInputCallback;
};


document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;
