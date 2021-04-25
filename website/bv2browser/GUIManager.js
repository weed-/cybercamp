/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */


/**
 * @class GUIImageElement
 *
 * @param {String} id
 * @param {String} img
 * @param {Number} x
 * @param {Number} y
 * @returns {GUIImageElement}
 */
var GUIImageElement = function (id, img, x, y)
{
    "use strict";
    // Dynamic data
    this.id = id;
    this.img = img;

    this.x = x;
    this.y = y;

    // Static data
    this.selectable = false;

    // Functions
    this.draw = function (context) {
        context.drawImage(this.img, this.x, this.y);
    };
};


/**
 * @class GUIOverlayElement
 *
 * @param {String} id
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {GUIOverlayElement}
 */
var GUIOverlayElement = function (id, x, y, width, height)
{
    "use strict";
    // Dynamic data
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'black';

    // Static data
    this.selectable = false;

    // Functions
    this.draw = function (context) {
        context.fillStyle = this.color;
        context.globalAlpha = 0.8;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1.0;
    };
};


/**
 * @class GUITextElement
 *
 * @param {String} id
 * @param {String} text
 * @param {Number} x
 * @param {Number} y
 * @param {Number} size
 * @param {Font} font
 * @param {Color} color
 * @returns {GUITextElement}
 */
var GUITextElement = function (id, text, x, y, size, font, color)
{
    "use strict";
    // Dynamic data
    this.id = id;
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = font;
    this.color = color;

    // Static data
    this.selectable = false;

    // Functions
    this.draw = function (context) {
        context.font = this.size + "pt " + this.font;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    };
};


/**
 * @class GUIButtonElement
 *
 * @param {String} id
 * @param {String} text
 * @param {Number} x
 * @param {Number} y
 * @param {Number} size
 * @param {Font} font
 * @param {Color} color
 * @param {Function} handler
 * @returns {GUIButtonElement}
 */
var GUIButtonElement = function (id, text, x, y, size, font, color, handler)
{
    "use strict";
    // Dynamic data
    this.id = id;
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = font;
    this.textColor = color;
    this.color = color;
    this.handler = handler;
    
    // Measure text
    var context = renderManager.context2D;
    context.textAlign = 'left';
    
    context.textBaseline = 'top';
    context.font = this.size + "pt " + this.font;
    var measure = context.measureText(text);
    this.width = measure.width;
    this.height = 30;

    // Static data
    this.selectable = true;
    this.selected = false;

    // Functions
    this.draw = function (context) {
        context.font = this.size + "pt " + this.font;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    };

    this.select = function () {
        var rnd = Math.round(Math.random() * 255);
        this.color = 'rgb(' + rnd + ', 0, ' + (255 - rnd) + ')';
        this.selected = true;
    };

    this.unselect = function () {
        this.color = this.textColor;
        this.selected = false;
    };
    
    this.isMouseover = function (x, y) {
        if ((this.x <= x) &&
            (this.x + this.width >= x) &&
            (this.y <= y) &&
            (this.y + this.height >= y))
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.onmouseup = function () {
        this.handler();
    };

    this.press = function () {
        this.handler();
    };
};



/**
 * @class GuiManager
 *
 * Manager for Input and Drawing of GUI-Elements
 */
var GUIManager = function () {
    "use strict";
    /*
     * Set the fontfamily which should be loaded via css before
     *
     * @params {String} textFontFamily TextFontFamily
     */
    this.setTextFontFamily = function (textFontFamily) {
        this.textFontFamily = textFontFamily;
    };

    /*
     * Set the font size
     *
     * @params {Number} textSize TextSize
     */
    this.setTextSize = function (textSize) {
        this.textSize = textSize;
    };

    /*
     * Set the font color
     *
     * @params {String} textColor Color of the font
     */
    this.setTextColor = function (textColor) {
        this.textColor = textColor;
    };

    /*
     * Creates a GUI Element for text
     *
     * @params {String} id ID of element
     * @params {String} text Text of the element
     * @params {Number} x X-Coordinate of element
     * @params {Number} y Y-Coordinate of element
     *
     * @returns {Object} textElement GUI-Element
     */
    this.createText = function (id, text, x, y) {
        var textElement = new GUITextElement(id, text, x, y, this.textSize, this.textFontFamily, this.textColor);

        this.registerGUIElement(textElement);

        return textElement;
    };

    /*
     * Creates a GUI Element for button
     *
     * @params {String} id ID of element
     * @params {String} text Text of the element
     * @params {Number} x X-Coordinate of element
     * @params {Number} y Y-Coordinate of element
     *
     * @returns {Object} textElement GUI-Element
     */
    this.createImage = function (id, img, x, y) {
        var imageElement = new GUIImageElement(id, img, x, y);

        this.registerGUIElement(imageElement);

        return imageElement;
    };

    this.createOverlay = function (id, x, y, width, height) {
        var imageElement = new GUIOverlayElement(id, x, y, width, height);

        this.registerGUIElement(imageElement);

        return imageElement;
    };


    /*
     * Creates a GUI Element for button
     *
     * @params {String} id ID of element
     * @params {String} text Text of the element
     * @params {Number} x X-Coordinate of element
     * @params {Number} y Y-Coordinate of element
     * @params {Function} handler
     *
     * @returns {Object} textElement GUI-Element
     */
    this.createButton = function (id, text, x, y, handler) {
        var buttonElement = new GUIButtonElement(id, text, x, y, this.textSize, this.textFontFamily, this.textColor, handler);

        this.registerGUIElement(buttonElement);

        return buttonElement;
    };

    /*
     * Will be called, if a GUI relevant key was pressed
     * Does manage the via mouse selected items and manages the input for them too
     *
     * @params {Object} event Eventobject of the event
     */
    this.onKeyDown = function (event) {
        var i;
        if (event.keyCode === 13) {

            for (i = 0; i < this.registry.length; i++)
            {
                if (this.registry[i].selectable && this.registry[i].selected) {
                    this.registry[i].press();
                    break;
                }
            }
        }
        // Arrowkeys
        if (event.keyCode === 38) {
            var selectedOld;
            for (i = 0; i < this.registry.length; i++)
            {
                if (this.registry[i].selectable && this.registry[i].selected) {
                    this.registry[i].unselect();
                    selectedOld = i;
                    break;
                }
            }
            for (i = 1; i <= this.registry.length; i++)
            {
                if (this.registry[((selectedOld + this.registry.length - i) % this.registry.length)].selectable) {
                    this.registry[((selectedOld + this.registry.length - i) % this.registry.length)].select();
                    break;
                }
            }

        }

        if (event.keyCode === 40) {
            var selectedOld;
            for (i = 0; i < this.registry.length; i++)
            {
                if (this.registry[i].selectable && this.registry[i].selected) {
                    this.registry[i].unselect();
                    selectedOld = i;
                    break;
                }
            }
            for (i = 1; i <= this.registry.length; i++)
            {
                if (this.registry[((selectedOld + i) % this.registry.length)].selectable) {
                    this.registry[((selectedOld + i) % this.registry.length)].select();
                    break;
                }
            }
        }
        this.drawGUIElements(this.context);
    };
    
    this.onMouseUp = function(event) {
        var canvas = renderManager.canvas;
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;  
        var x = (event.clientX - rect.left) * scaleX;
        var y = (event.clientY - rect.top) * scaleY;
        
        
        for (i = 0; i < this.registry.length; i++)
        {
            if (this.registry[i].selectable && this.registry[i].isMouseover(x, y)) {
                this.registry[i].onmouseup();
                this.drawGUIElements(this.context);
                break;
            }
        }
    };
    
    this.onMouseMove = function (event) {
        var i;
        var found = false;
        
        var canvas = renderManager.canvas;
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;  
        var x = (event.clientX - rect.left) * scaleX;
        var y = (event.clientY - rect.top) * scaleY;
        
        
        for (i = 0; i < this.registry.length; i++)
        {
            if (this.registry[i].selectable && this.registry[i].isMouseover(x, y)) {
                found = true;
                break;
            }
        }
        
        if (found === true)
        {
            renderManager.canvas.style.cursor="pointer";            
        }
        else
        {
            renderManager.canvas.style.cursor="default";    
        }
    };

    /*
     * Selects the first element if the Gui
     *
     * @params {Object} event Eventobject of the event
     */
    this.selectFirstSelectable = function () {
        var i;
        for (i = 0; i < this.registry.length; i++)
        {
            if (this.registry[i].selectable) {
                this.registry[i].select();
                break;
            }
        }
    };


    /*
     * Deletes all existing GUI-Elements
     */
    this.deleteAllGUIElements = function () {
        this.registry = [];
    };

    /**
     * Deletes a single GUI-Element
     */
    this.deleteGUIElement = function (element) {
        var elementIndex = this.registry.indexOf(element);

        if (elementIndex !== -1)
        {
            this.registry.splice(elementIndex, 1);
        }
    };

    /*
     * Deletes all existing GUI-Elements
     * @params {Object} element GuiElement which we want to register
     */
    this.registerGUIElement = function (element) {
        this.registry.push(element);
    };

    this.drawGUIElements = function () {
        var context = renderManager.context2D;
        var i;
        for (i = 0; i < this.registry.length; i++)
        {
            this.registry[i].draw(context);
        }
    };


    /**
     * @constructor
     *
     * Sets defaults and create registry
     */
    this.textFontFamily = 'Blobby';
    this.textSize = 20;
    this.textColor = '#FFFFFF';
    this.registry = [];
};
