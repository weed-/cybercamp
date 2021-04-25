/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * Simple dump jump bot which only follows the ball
 */

/**
 * Callback
 */
var botInputCallback = function getBotInput(player)
{
    playerInput = new Input();
    gameLogic = stateManager.getCurrentState().gameLogic;
    physic = gameLogic.physic;

    ballPosition = physic.getPhysicBallPositon();
    blobPosition = physic.getBlobbyPositions();

    if (player === RIGHT_PLAYER) {
        if (gameLogic.ballDown === false) {
            playerInput.up = 1;
            if (ballPosition.x + 40 < blobPosition[player].x) {
                playerInput.left = 1;
            } else {
                playerInput.left = 0;
            }
            if (ballPosition.x + 20 > blobPosition[player].x) {
                playerInput.right = 1;
            } else {
                playerInput.right = 0;
            }
        } else {
            playerInput.up = 0;
            if (630 > blobPosition[player].x) {
                playerInput.right = 1;
                playerInput.left = 0;
            } else {
                playerInput.right = 0;
                if (650 < blobPosition[player].x) {
                    playerInput.left = 1;
                } else {
                    playerInput.left = 0;
                }
            }
        }
    } else
    {
        if (gameLogic.ballDown === false) {
            playerInput.up = 1;
            if (ballPosition.x - 20 < blobPosition[player].x) {
                playerInput.left = 1;
            } else {
                playerInput.left = 0;
            }
            if (ballPosition.x - 40 > blobPosition[player].x) {
                playerInput.right = 1;
            } else {
                playerInput.right = 0;
            }
        } else {
            playerInput.up = 0;
            if (170 < blobPosition[player].x) {
                playerInput.left = 1;
                playerInput.right = 0;
            } else {
                playerInput.left = 0;
                if (150 > blobPosition[player].x) {
                    playerInput.right = 1;
                } else {
                    playerInput.right = 0;
                }
            }
        }
    }

    return playerInput;
};

/**
 * Return Callback called by InputManager
 */
function createBotInput() {
    return botInputCallback;
}

var BotInput = function (player) {
    this.player = player;

    this.input = botInputCallback;
};
