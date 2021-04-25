/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

// Enum for possible inputs
var INPUTMODE_NONE = 0;
var INPUTMODE_KEYBOARD = 1;
var INPUTMODE_BOT = 2;
var INPUTMODE_EXTERNAL = 3;

// Struct for blobby input
var Input = function ()
{
    this.left = 0;
    this.right = 0;
    this.up = 0;
};

/**
 * @class InputManager
 *
 * Mangages all available inputs for players of the game and gui
 */
var InputManager = function ()
{
    this.playerInput = [null, null];

    this.getPlayerInput = function (player) {
        if (this.playerInput[player] !== null)
        {
            return this.playerInput[player].input(player);
        }

        return new Input();
    };

    this.setPlayerInputMode = function (player, mode) {
        switch (mode) {
            case INPUTMODE_KEYBOARD:
                this.setPlayerInput(player, new KeyboardInput());
                break;
            case INPUTMODE_BOT:
                this.setPlayerInput(player, new BotInput());
                break;
            default:
                this.setPlayerInput(-1, null);
                break;
        }
    };

    this.setPlayerInput = function (player, input)
    {
        this.playerInput[player] = input;
    };
};
