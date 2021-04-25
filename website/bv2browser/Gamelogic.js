/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */


/**
 * @class GameLogic
 *
 * Handles the lgoic and the state of one game
 *
 * @returns {GameLogic}
 */
var GameLogic = function () {
    this.leftScore = 0;
    this.rightScore = 0;

    this.squishLeft = 0;
    this.squishRight = 0;

    this.leftHitcount = 0;
    this.rightHitcount = 0;

    this.servingPlayer = -1;
    this.ballDown = false;
    this.playerwin = -1;

    this.physic = new Physic();

    this.step = function (inputManager, soundManager)
    {
        this.physic.physicStep(inputManager);

        // Protection of multiple hit counts when the ball is squeezed
        if (0 === this.squishLeft)
        {
            if (this.physic.ballHitPlayer(LEFT_PLAYER))
            {
                if (soundManager !== null)
                {
                    soundManager.playSound("touch");
                }
                this.leftHitcount++;
                this.rightHitcount = 0;
                this.squishLeft = 1;
            }
        } else
        {
            this.squishLeft += 1;
            if (this.squishLeft > 9)
            {
                this.squishLeft = 0;
            }
        }

        if (0 === this.squishRight)
        {
            if (this.physic.ballHitPlayer(RIGHT_PLAYER))
            {
                if (soundManager !== null)
                {
                    soundManager.playSound("touch");
                }
                this.rightHitcount++;
                this.leftHitcount = 0;
                this.squishRight = 1;
            }
        } else
        {
            this.squishRight += 1;
            if (this.squishRight > 9)
            {
                this.squishRight = 0;
            }
        }

        if (this.physic.ballHitLeftGround() || this.leftHitcount > 3)
        {
            if (soundManager !== null)
            {
                soundManager.playSound("whistle");
            }
            if (this.leftHitcount > 3)
            {
                this.physic.dampBall();
            }
            if (this.servingPlayer === RIGHT_PLAYER)
            {
                this.rightScore++;
            }
            this.servingPlayer = RIGHT_PLAYER;
            this.physic.setBallValidity(0);
            this.ballDown = true;
            this.rightHitcount = 0;
            this.leftHitcount = 0;
            this.squishRight = 0;
            this.squishLeft = 0;
        }

        if (this.physic.ballHitRightGround() || this.rightHitcount > 3)
        {
            if (soundManager !== null)
            {
                soundManager.playSound("whistle");
            }
            if (this.rightHitcount > 3)
            {
                this.physic.dampBall();
            }
            if (this.servingPlayer === 0)
            {
                this.leftScore++;
            }
            this.servingPlayer = LEFT_PLAYER;
            this.physic.setBallValidity(0);
            this.ballDown = true;
            this.rightHitcount = 0;
            this.leftHitcount = 0;
            this.squishRight = 0;
            this.squishLeft = 0;
        }

        if (this.physic.roundFinished())
        {
            this.ballDown = false;
            this.physic.reset(this.servingPlayer);
        }

        if (this.leftScore >= 15 && this.leftScore >= this.rightScore + 2)
        {
            this.playerwin = LEFT_PLAYER;
        }
        if (this.rightScore >= 15 && this.rightScore >= this.leftScore + 2)
        {
            this.playerwin = RIGHT_PLAYER;
        }

        return this.playerwin;
    };

    this.setGameLogic = function (gameLogic)
    {
        this.leftScore = gameLogic.leftScore;
        this.rightScore = gameLogic.rightScore;

        this.squishLeft = gameLogic.squishLeft;
        this.squishRight = gameLogic.squishRight;

        this.leftHitcount = gameLogic.leftHitcount;
        this.rightHitcount = gameLogic.rightHitcount;

        this.servingPlayer = gameLogic.servingPlayer;
        this.ballDown = gameLogic.ballDown;
        this.playerwin = gameLogic.playerwin;

        this.physic.setPhysic(gameLogic.physic);
    };
};

module.exports = GameLogic;