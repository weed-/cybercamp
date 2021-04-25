/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

var socket;

/**
 * @class OnlineSelectState
 *
 * Used by the StateManager
 *
 * @param {GUIManager} guiManager
 * @param {SoundManager} soundManager
 * @param {InputManager} inputManager
 * @returns {OnlineSelectState}
 */
var OnlineSelectState = function (guiManager, soundManager, inputManager) {
    /**
     * Return the name of the State
     */
    this.getStateName = function () {
        return "OnlineSelectState";
    };

    /**
     * Mainloop of State
     */
    this.run = function () {
        if (this.funmatchButton.pressed()) {
            this.guiManager.deleteAllGUIElements();
            this.inputManager.setPlayerInputMode(LEFT_PLAYER, INPUTMODE_KEYBOARD);
            stateManager.showOnline();
            this.socket.emit("join", false);
        }

        if (this.rankedButton.pressed()) {
            this.guiManager.deleteAllGUIElements();
            this.inputManager.setPlayerInputMode(LEFT_PLAYER, INPUTMODE_KEYBOARD);
            stateManager.showOnline();
            this.socket.emit("join", true);
        }
    };

    /**
     * @constructor
     *
     * Create GUI-Elements and draws the background
     */
    this.soundManager = soundManager;
    this.inputManager = inputManager;
    this.guiManager = guiManager;

    // Create socket
    this.socket = io('http://localhost:8000');
    socket = this.socket;

    // Ranked game
    this.rankedButton = guiManager.createButton('RankedButton', 'Bewertetes Spiel', 90, 350);
    this.rankedText = guiManager.createText('RankedInfo', 'Nur für angemeldete Spieler', 90, 380);
    this.nameText = guiManager.createText('Name', "", 90, 380);
    this.scoreText = guiManager.createText('Score', "", 90, 410);

    // Funmatch
    this.funmatchButton = guiManager.createButton('Fast', 'Schnelles Spiel', 550, 350);

    // Tranfer session and register callback
    this.socket.rankedText = this.rankedText;
    this.socket.nameText = this.nameText;
    this.socket.scoreText = this.scoreText;
    this.socket.on("clientstop", function (data) {
        if ((data.name !== "") && (data.score !== 0))
        {
            this.rankedText.innerHTML = "";
            this.nameText.innerHTML = "Name: " + data.name;
            this.scoreText.innerHTML = "Punkte: " + data.score;
        }
    });
    this.socket.emit("clientstop", "123");

    guiManager.selectFirstSelectable();

    drawMenu();
};
