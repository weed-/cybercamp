/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

/**
 * @class GameState
 *
 * Used by the StateManager
 *
 * @param {GUIManager} guiManager
 * @param {SoundManager} soundManager
 * @param {InputManager} inputManager
 * @returns {GameState}
 */
var GameState = function (guiManager, soundManager, inputManager) {
    /**
     * Return the name of the State
     */
    this.getStateName = function () {
        return "GameState";
    };

    /**
     * Mainloop of State
     */
    this.run = function () {
        var playerwin = this.gameLogic.step(this.inputManager, this.soundManager);

        setRendererBallPosition(this.gameLogic.physic.getPhysicBallPositon());
        setBlobbyAnimationStates(this.gameLogic.physic.getBlobbyAnimationStates());
        setBlobbyPositions(this.gameLogic.physic.getBlobbyPositions());
        setScoresAndServingPlayer(this.gameLogic.leftScore, this.gameLogic.rightScore, this.gameLogic.servingPlayer);

        drawGame();

        if (playerwin !== -1) {
            this.guiManager.deleteAllGUIElements();
            stateManager.showWin(playerwin);
        }
    };
    this.buttonCloseHandler = function ()
    {
        this.guiManager.deleteAllGUIElements();
        stateManager.showMenu();
    };

    /**
     * @constructor
     *
     * Set the state to game
     * Inject some depencies and connect them with the state by reference
     */
    this.guiManager = guiManager;
    this.soundManager = soundManager;
    this.inputManager = inputManager;
    this.gameLogic = new GameLogic();
    
    guiManager.createButton('Button1', 'Close', 700, 550,
            function () {
                stateManager.getCurrentState().buttonCloseHandler();
            });

    guiManager.selectFirstSelectable();
};