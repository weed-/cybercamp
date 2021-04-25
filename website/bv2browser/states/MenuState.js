/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

/**
 * @class MenuState
 *
 * Used by the StateManager
 *
 * @param {GUIManager} guiManager
 * @param {SoundManager} soundManager
 * @param {InputManager} inputManager
 * @returns {MenuState}
 */
var MenuState = function (guiManager, soundManager, inputManager) {
    /**
     * Return the name of the State
     */
    this.getStateName = function () {
        return "MenuState";
    };

    this.selectedSide = LEFT_PLAYER;
    this.muteSound = false;

    /**
     * Mainloop of State
     */
    this.run = function () {

        this.buttonOnlineHandler = function ()
        {
            this.guiManager.deleteAllGUIElements();
            this.inputManager.setPlayerInputMode(LEFT_PLAYER, INPUTMODE_KEYBOARD);
            stateManager.showOnline();
        };
        this.buttonHumanVsHumanHandler = function ()
        {
            this.guiManager.deleteAllGUIElements();
            this.inputManager.setPlayerInputMode(LEFT_PLAYER, INPUTMODE_KEYBOARD);
            this.inputManager.setPlayerInputMode(RIGHT_PLAYER, INPUTMODE_KEYBOARD);
            stateManager.showGame();
        };
        this.buttonHumanVsCPUHandler = function ()
        {
            this.guiManager.deleteAllGUIElements();
            this.inputManager.setPlayerInputMode(this.selectedSide, INPUTMODE_KEYBOARD);
            this.inputManager.setPlayerInputMode(this.selectedSide === LEFT_PLAYER ? RIGHT_PLAYER : LEFT_PLAYER, INPUTMODE_BOT);
            stateManager.showGame();
        };
        this.buttonToggleSoundHandler = function ()
        {
            this.muteSound = !this.muteSound;
            if (this.muteSound === true) {
                this.buttonToggleSound.text = 'Sound: Off';
                this.soundManager.muteSound(true);
            } else {
                this.buttonToggleSound.text = 'Sound: On';
                this.soundManager.muteSound(false);
            }
        };
        this.buttonToggleSideHandler = function ()
        {
            this.selectedSide = this.selectedSide === LEFT_PLAYER ? RIGHT_PLAYER : LEFT_PLAYER;
            if (this.selectedSide === LEFT_PLAYER) {
                this.buttonHumanVsCPU.text = 'Human vs CPU';
                this.buttonToggleSide.text = 'Offline Side: Left';
            } else {
                this.buttonHumanVsCPU.text = 'CPU vs Human';
                this.buttonToggleSide.text = 'Offline Side: Right';
            }
        };
        this.buttonToggleFullscreenHandler = function ()
        {
            var context = document.getElementById('gamediv');
            if (document.mozFullScreen || document.webkitIsFullScreen) {
                if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else {
                    document.mozCancelFullScreen();
                }
            } else {
                if (context.webkitRequestFullScreen) {
                    context.webkitRequestFullScreen();
                } else {
                    context.mozRequestFullScreen();
                }
            }
        };
    };

    /**
     * @constructor
     *
     * Create GUI-Elements and draws the background
     */
    // Remember managers
    this.soundManager = soundManager;
    this.inputManager = inputManager;
    this.guiManager = guiManager;

    // Prepare text
    var humanVsCPUText = 'Human vs CPU';
    if (this.selectedSide === RIGHT_PLAYER)
    {
        humanVsCPUText = 'CPU vs Human';
    }

    var isSoundMutedText = 'Sound: On';
    if (soundManager.isSoundMuted() === true) {
        isSoundMutedText = 'Sound: Off';
    }

    var selectedSideText = 'Offline Side: Left';
    if (this.selectedSide === RIGHT_PLAYER)
    {
        selectedSideText = 'Offline Side: Right';
    }

    // Background
    guiManager.createImage('Background', backgroundImg, 0, 0);
    guiManager.createOverlay('BackgroundOverlay', 0, 0, 800, 600);

    // Header
    guiManager.createImage('Background', titleImg, 20, 60);

    // Games
    guiManager.createText('Header1', 'Menu:', 40, 320);
    this.buttonOnline = guiManager.createButton('Button1', 'Online', 40, 350,
            function () {
                stateManager.getCurrentState().buttonOnlineHandler();
            });
    this.buttonHumanVsHuman = guiManager.createButton('Button2', 'Human vs Human', 40, 380,
            function () {
                stateManager.getCurrentState().buttonHumanVsHumanHandler();
            });
    this.buttonHumanVsCPU = guiManager.createButton('Button3', humanVsCPUText, 40, 410,
            function () {
                stateManager.getCurrentState().buttonHumanVsCPUHandler();
            });

    // Options
    guiManager.createText('Options', 'Options:', 40, 450);
    this.buttonToggleSound = guiManager.createButton('ToggleSound', isSoundMutedText, 40, 480,
            function () {
                stateManager.getCurrentState().buttonToggleSoundHandler();
            });
    this.buttonToggleSide = guiManager.createButton('ToggleSide', selectedSideText, 40, 510,
            function () {
                stateManager.getCurrentState().buttonToggleSideHandler();
            });
    this.buttonToggleFullscreen = guiManager.createButton('ToggleFullscreen', 'Toggle Fullscreen', 40, 540,
            function () {
                stateManager.getCurrentState().buttonToggleFullscreenHandler();
            });

    // Draw key
    guiManager.createText('Keys', 'Keys:', 420, 375);
    guiManager.createText('FirstPlayer', 'first player', 580, 425);
    guiManager.createText('SecondPlayer', 'second player', 580, 485);
    guiManager.createImage('LeftPlayerKeyLeft', keyImg, 420, 410);
    guiManager.createImage('LeftPlayerKeyUp', keyImg, 470, 410);
    guiManager.createImage('LeftPlayerKeyRight', keyImg, 520, 410);
    guiManager.createImage('RightPlayerKeyLeft', keyImg, 420, 470);
    guiManager.createImage('RightPlayerKeyUp', keyImg, 470, 470);
    guiManager.createImage('RightPlayerKeyRight', keyImg, 520, 470);
    guiManager.setTextColor('black');
    guiManager.createText('LeftPlayerKeyLeftText', 'a', 437, 422);
    guiManager.createText('LeftPlayerKeyUpText', 'w', 487, 422);
    guiManager.createText('LeftPlayerKeyRightText', 'd', 537, 422);
    guiManager.createText('RightPlayerKeyLeftText', 'h', 437, 482);
    guiManager.createText('RightPlayerKeyUpText', 'u', 487, 482);
    guiManager.createText('RightPlayerKeyRightText', 'k', 537, 482);
    guiManager.setTextColor('white');
    guiManager.createText('Copyright', 'Version 1.7 Daniel Knobe' + String.fromCharCode(169), 520, 560);

    // Select first element and redraw screen
    guiManager.selectFirstSelectable();
    drawMenu();
};
