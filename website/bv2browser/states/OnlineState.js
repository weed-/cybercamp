/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */

/**
 * @class OnlineState
 *
 * Used by the StateManager
 *
 * @param {GUIManager} guiManager
 * @param {SoundManager} soundManager
 * @param {InputManager} inputManager
 * @returns {GameState}
 */
var OnlineState = function (guiManager, soundManager, inputManager) {
    /**
     * @constructor
     *
     * Set the state to game
     * Inject some depencies and connect them with the state by reference
     */
    this.guiManager = guiManager;
    this.soundManager = soundManager;
    this.inputManager = inputManager;

    // Connect to server
    this.socket = io('https://Rover.cschenk.net');
    this.socket.par = this;

    // Create input
    this.oldInput = new Input();

    // Initialize status
    this.gameIsRunning = false;
    this.gameIsDisconnected = false;

    // Background
    guiManager.createImage('Background', backgroundImg, 0, 0);
    guiManager.createOverlay('BackgroundOverlay', 0, 0, 800, 600);

    // Header
    guiManager.createImage('Title', titleImg, 20, 60);
    
    // Waitingscreen
    guiManager.createText('Text1', 'Waiting for opponent', 300, 400);
    this.close = guiManager.createButton('Button1', 'Close', 700, 550,
            function () {
                stateManager.getCurrentState().buttonCloseHandler();
            });
    guiManager.selectFirstSelectable();


    /**
     * Return the name of the State
     */
    this.getStateName = function () {
        return "OnlineState";
    };

    /**
     * Mainloop of State
     */
    this.run = function () {
        if (this.gameIsRunning === false)
        {
            if (this.gameIsDisconnected === true)
            {
                // Game is not running so we draw the disconnectstate
                this.guiManager.deleteAllGUIElements();
                // Background
                guiManager.createImage('Background', backgroundImg, 0, 0);
                guiManager.createOverlay('BackgroundOverlay', 0, 0, 800, 600);
                // Header
                guiManager.createImage('Title', titleImg, 20, 60);
                
                guiManager.createText('Disconnected', 'opponent is disconnected', 290, 400);
                this.close = guiManager.createButton('Button1', 'Close', 700, 550,
                        function () {
                            stateManager.getCurrentState().buttonCloseHandler();
                        });
                guiManager.selectFirstSelectable();
                drawMenu();
                this.gameIsDisconnected = false;
            } else
            {
                // Game is not running so we draw the waitstate
            }

        } else
        {
            // We only transfer input if new data is available
            // The rest will be done by network
            var newInput = this.inputManager.getPlayerInput(LEFT_PLAYER);
            if (this.oldInput !== newInput)
            {
                this.socket.emit('input', this.inputManager.getPlayerInput(LEFT_PLAYER));
            }
            this.oldInput.left = newInput.left;
            this.oldInput.right = newInput.right;
            this.oldInput.up = newInput.up;
        }
    };


    /**
     * Network events
     */
    this.socket.on('logic', function (gameLogicJson) {
        if (this.par.gameIsRunning === false)
        {
            guiManager.deleteAllGUIElements();
            this.close = guiManager.createButton('Button1', 'Close', 700, 550,
                    function () {
                        stateManager.getCurrentState().buttonCloseHandler();
                    });
            guiManager.selectFirstSelectable();
        }

        this.par.gameIsRunning = true;

        // Update
        var gameLogic = new GameLogic();
        gameLogic.setGameLogic(gameLogicJson);

        // Update positions for renderer
        setRendererBallPosition(gameLogic.physic.getPhysicBallPositon());
        setBlobbyAnimationStates(gameLogic.physic.getBlobbyAnimationStates());
        setBlobbyPositions(gameLogic.physic.getBlobbyPositions());
        setScoresAndServingPlayer(gameLogic.leftScore, gameLogic.rightScore, gameLogic.servingPlayer);

        // Draw game
        drawGame();
    });

    this.socket.on('win', function (winner) {
        this.par.socket.disconnect();
        this.par.guiManager.deleteAllGUIElements();
        stateManager.showWin(winner);
    });

    this.socket.on('disconnect', function () {
        this.par.gameIsRunning = false;
        this.par.gameIsDisconnected = true;
    });

    this.socket.on('ps', function (msg) {
        this.par.soundManager.playSound(msg);
    });
    
    this.buttonCloseHandler = function ()
    {
            this.socket.disconnect();
            this.guiManager.deleteAllGUIElements();
            stateManager.showMenu();
    };
};
