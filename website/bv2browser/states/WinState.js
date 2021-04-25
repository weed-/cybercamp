/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

/**
 * @class WinState
 *
 * Used by the StateManager
 *
 * @param {GUIManager} guiManager
 * @param {Number} player
 * @returns {GameState}
 */
var WinState = function (guiManager, player) {
    /**
     * Return the name of the State
     */
    this.getStateName = function () {
        return "WinState";
    };

    /**
     * Mainloop of State
     */
    this.run = function () {
    };
    
    this.buttonReturnToMainmenuHandler = function ()
    {
        this.guiManager.deleteAllGUIElements();
        stateManager.showMenu();
    };
    
    /**
     * @constructor
     *
     * Sets the player who has won the match and draw the background
     */
    this.guiManager = guiManager;
    
    // Background
    guiManager.createImage('Background', backgroundImg, 0, 0);
    guiManager.createOverlay('BackgroundOverlay', 0, 0, 800, 600);
    
    // Header
    guiManager.createImage('Background', titleImg, 20, 60);
    
    // Winscreen
    guiManager.createText('Text1', (player === LEFT_PLAYER ? 'left ' : 'right ') + 'player has won the match!!!', 300, 400);
    this.buttonReturnToMainmenu = guiManager.createButton('Button1', 'Return to mainmenu', 330, 450,
            function () {
                stateManager.getCurrentState().buttonReturnToMainmenuHandler();
            });
    guiManager.createImage("Pokal", pokalImg, 30, 200);
    
    guiManager.createText('Copyright', 'Version 1.7 Daniel Knobe' + String.fromCharCode(169), 520, 560);

    guiManager.selectFirstSelectable();

    drawWin();
};
