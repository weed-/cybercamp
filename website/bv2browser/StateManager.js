/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * @class StateManager
 *
 * @param {Object} guiManager
 * @param {Object} soundManager
 * @param {Object} inputManager
 * @returns {StateManager}
 */
var StateManager = function (guiManager, soundManager, inputManager) {
    /*
     * Changes to Online State
     */
    this.showOnline = function () {
        if (this.currentState.getStateName() !== "OnlineState") {
            delete this.currentState;
            this.currentState = new OnlineState(this.guiManager, this.soundManager, this.inputManager);
        }
    };

    /*
     * Changes to Game State
     */
    this.showGame = function () {
        if (this.currentState.getStateName() !== "GameState") {
            delete this.currentState;
            this.currentState = new GameState(this.guiManager, this.soundManager, this.inputManager);
        }
    };

    /*
     * Changes to Menu State
     */
    this.showMenu = function () {
        if (this.currentState.getStateName() !== "MenuState") {
            delete this.currentState;
            this.currentState = new MenuState(this.guiManager, this.soundManager, this.inputManager);
        }
    };

    /*
     * Changes to WinScreen State
     *
     * @params {Number} player Player ID
     */
    this.showWin = function (player) {
        delete this.currentState;
        this.currentState = new WinState(this.guiManager, player);
    };

    /**
     * Returns current State
     *
     * @returns {WinState|MenuState|OnlineState|GameState}
     */
    this.getCurrentState = function () {
        return this.currentState;
    };

    /**
     * @constructor
     *
     * Set the state to menu
     * Inject some depencies and connect them with the state by reference
     */
    this.guiManager = guiManager;
    this.soundManager = soundManager;
    this.inputManager = inputManager;

    this.currentState = new MenuState(this.guiManager, this.soundManager, this.inputManager);
};

