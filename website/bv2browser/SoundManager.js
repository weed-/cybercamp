/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 *
 * @file
 */

/**
 * @class Soundfile
 *
 * Soundfile holds one audiofile and can handle channels for this file
 *
 * @param {String} filePath
 * @param {Number} maxChannels
 * @returns {Soundfile}
 */
var Soundfile = function (filePath, maxChannels)
{
    /*
     * Plays sound on the next LRU channel
     */
    this.play = function ()
    {
        this.channels[this.channelcounter].play();
        this.channelcounter = (this.channelcounter + 1) % this.maxChannels;
    };

    /**
     * @constructor
     *
     * Load the file and create all channels
     * Choose a good count of channels to save resources
     *
     * @params {String} filePath Path to file
     * @params {Number} maxChannels Maximum channel count
     */
    this.channelcounter = 0;
    this.maxChannels = maxChannels;
    this.filePath = filePath;
    this.channels = new Array();

    for (i = 0; i < maxChannels; i++)
    {
        this.channels[i] = new Audio();
        this.channels[i].src = filePath;
        this.channels[i].load();
    }
};

/**
 * @class SoundManager
 *
 * Manager for soundfiles
 */
var SoundManager = function () {
    /**
     * Loads a .ogg File
     *
     * @param {String} identifier Identifier for this file
     * @param {String} filePath Path to the file
     * @param {Number} channels Number of channels for this audiofile
     */
    this.loadSound = function (identifier, filePath, channels) {
        this.buffer[identifier] = new Soundfile(filePath, channels);
    };

    /**
     * Plays a before loaded File using the identifier
     *
     * @param {String} identifier Identifier for this file
     */
    this.playSound = function (identifier) {
        if (!this.mute) {
            this.buffer[identifier].play();
        }
    };

    /**
     * Mutes or unmutes the sound
     *
     * @param {Boolean} mute Set true to mute sound
     */
    this.muteSound = function (mute) {
        this.mute = mute;
    };

    /**
     * Returns the mute status
     *
     * @returns {Boolean} True if sound is muted
     */
    this.isSoundMuted = function () {
        return this.mute;
    };

    /**
     * @constructor
     *
     * Initialize attributes and load sounds for the game
     */
    this.buffer = new Array();
    this.mute = false;

    this.loadSound('whistle', 'data/snd/whistle.ogg', 3);
    this.loadSound('touch', 'data/snd/touch.ogg', 6);
};
