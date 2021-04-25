/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * Structure to get the whole thing running
 * Create all needed Manager and inject them.
 */
function onStart() {
    renderManager = new RenderManager; // TODO: set var when render Manager will be injected correct
    
    guiManager = new GUIManager();
    var inputManager = new InputManager();
    var soundManager = new SoundManager();

    stateManager = new StateManager(guiManager, soundManager, inputManager);
    mainLoop();
}

function mainLoop() {
    stateManager.currentState.run();
    setTimeout(mainLoop, DELAY_BETWEEN_FRAMES);
}

if (window.addEventListener) {
    addEventListener("load", onStart, false);
    addEventListener("click", function( event ) {        
    guiManager.onMouseUp(event);
});
    addEventListener("mousemove", function( event ) {        
    guiManager.onMouseMove(event);
});
} else {
    attachEvent("onload", onStart);
}
