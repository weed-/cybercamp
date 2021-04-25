/**
 * @author: Daniel Knobe
 * @copyright: Daniel Knobe
 */


/**
 * Constants
 */
var TIMEOUT_MAX = 2.5;

//Blobby Settings
var BLOBBY_HEIGHT = 89.0;
var BLOBBY_WIDTH = 75.0;
var BLOBBY_UPPER_SPHERE = 19.0;
var BLOBBY_UPPER_RADIUS = 25.0;
var BLOBBY_LOWER_SPHERE = 13.0;
var BLOBBY_LOWER_RADIUS = 33.0;

// Volley Ball Net
var NET_POSITION_X = 400.0;
var NET_RADIUS = 7.0;
var NET_SPHERE_POSITION = 284.0;

//Ball Settings
var BALL_RADIUS = 31.5;

var GROUND_PLANE_HEIGHT_MAX = 500.0;
var GROUND_PLANE_HEIGHT = GROUND_PLANE_HEIGHT_MAX - BLOBBY_HEIGHT / 2.0;

//Border Settings
var LEFT_PLANE = 0.0;
var RIGHT_PLANE = 800.0;

// Gamefeeling relevant constants
var BLOBBY_ANIMATION_SPEED = 0.5;
var BLOBBY_JUMP_ACCELERATION = 15.1;
var BLOBBY_SPEED = 4.5;

// This is exactly the half of the gravitation
var BLOBBY_JUMP_BUFFER = 0.44;
var GRAVITATION = 0.88;
var BALL_GRAVITATION = 0.28;
var STANDARD_BALL_HEIGHT = 269.0 + BALL_RADIUS;

var BALL_COLLISION_VELOCITY = 13.125;

/**
 * @class Physic
 *
 * Here all the physicstuff happens
 */
var Physic = function ()
{
    this.blobVelocity = [new Vector(0.0, 0.0), new Vector(0.0, 0.0)];
    this.blobPosition = [new Vector(200.0, GROUND_PLANE_HEIGHT),
        new Vector(600.0, GROUND_PLANE_HEIGHT)];

    this.ballPosition = new Vector(200.0, STANDARD_BALL_HEIGHT);
    this.ballVelocity = new Vector(0.0, 0.0);

    this.currentBlobbyAnimationSpeed = [0.0, 0.0];
    this.blobState = [0.0, 0.0];

    this.isBallValid = true;
    this.isGameRunning = false;
    this.timeSinceBallout = 0;
    this.lastHitIntensity = 0;
    this.ballHitByBlob = [false, false];

    this.physicStep = function (inputManager)
    {
        // Compute independent actions
        this.handleBlob(LEFT_PLAYER, inputManager);
        this.handleBlob(RIGHT_PLAYER, inputManager);

        // Ball Gravitation
        if (this.isGameRunning)
        {
            this.ballVelocity.y += BALL_GRAVITATION;
        }

        // move ball
        this.ballPosition.y += this.ballVelocity.y;
        this.ballPosition.x += this.ballVelocity.x;


        // Collision detection
        if (this.isBallValid)
        {
            this.checkBlobbyBallCollision(LEFT_PLAYER);
            this.checkBlobbyBallCollision(RIGHT_PLAYER);
        }
        // Ball to ground Collision
        else if (this.ballPosition.y + BALL_RADIUS > 500.0)
        {
            this.ballVelocity = this.ballVelocity.reflectY().scaleY(0.5);
            this.ballVelocity = this.ballVelocity.scaleX(0.55);
            this.ballPosition.y = 500.0 - BALL_RADIUS;
        }

        if (this.ballHitPlayer(LEFT_PLAYER) || this.ballHitPlayer(RIGHT_PLAYER))
        {
            this.isGameRunning = true;
        }

        // Border Collision
        if (this.ballPosition.x - BALL_RADIUS <= LEFT_PLANE && this.ballVelocity.x < 0.0)
        {
            this.ballVelocity = this.ballVelocity.reflectX();
        } else if (this.ballPosition.x + BALL_RADIUS >= RIGHT_PLANE && this.ballVelocity.x > 0.0)
        {
            this.ballVelocity = this.ballVelocity.reflectX();
        } else if (this.ballPosition.y > NET_SPHERE_POSITION &&
                Math.abs(this.ballPosition.x - NET_POSITION_X) < BALL_RADIUS + NET_RADIUS)
        {
            this.ballVelocity = this.ballVelocity.reflectX();
            this.ballPosition = this.ballPosition.addVector(this.ballVelocity);
        } else
        {
            // Net Collisions
            var tmp = new Vector(0, 0);
            tmp.vectorByDots(this.ballPosition, new Vector(NET_POSITION_X, NET_SPHERE_POSITION));
            var ballNetDistance = tmp.getLength();

            if (ballNetDistance < NET_RADIUS + BALL_RADIUS)
            {
                tmp.vectorByDots(this.ballPosition, new Vector(NET_POSITION_X, NET_SPHERE_POSITION));
                tmp = tmp.normalise();
                this.ballVelocity = this.ballVelocity.reflect(tmp);
                this.ballVelocity = this.ballVelocity.scale(0.75);
                while (ballNetDistance < NET_RADIUS + BALL_RADIUS)
                {
                    this.ballPosition = this.ballPosition.addVector(this.ballVelocity);
                    tmp.vectorByDots(this.ballPosition, new Vector(NET_POSITION_X, NET_SPHERE_POSITION));
                    ballNetDistance = tmp.getLength();
                }
            }
        }
        // Collision between blobby and the net
        if ((this.blobPosition[LEFT_PLAYER].x + BLOBBY_LOWER_RADIUS) > NET_POSITION_X - NET_RADIUS)
        {
            this.blobPosition[LEFT_PLAYER].x = NET_POSITION_X - NET_RADIUS - BLOBBY_LOWER_RADIUS;
        }

        if ((this.blobPosition[RIGHT_PLAYER].x - BLOBBY_LOWER_RADIUS) < NET_POSITION_X + NET_RADIUS)
        {
            this.blobPosition[RIGHT_PLAYER].x = NET_POSITION_X + NET_RADIUS + BLOBBY_LOWER_RADIUS;
        }

        // Collision between blobby and the border
        if (this.blobPosition[LEFT_PLAYER].x < LEFT_PLANE)
        {
            this.blobPosition[LEFT_PLAYER].x = LEFT_PLANE;
        }

        if (this.blobPosition[RIGHT_PLAYER].x > RIGHT_PLANE)
        {
            this.blobPosition[RIGHT_PLAYER].x = RIGHT_PLANE;
        }
    };


    this.blobbyHitGround = function (player)
    {
        if (player === LEFT_PLAYER)
        {
            if (this.blobPosition[LEFT_PLAYER].y >= GROUND_PLANE_HEIGHT)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            if (player === RIGHT_PLAYER)
            {
                if (this.blobPosition[RIGHT_PLAYER].y >= GROUND_PLANE_HEIGHT)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            } 
            else
            {                
                return false;
            }
        }
    };

    this.resetAreaClear = function ()
    {
        if (this.blobbyHitGround(LEFT_PLAYER) && this.blobbyHitGround(RIGHT_PLAYER))
        {
            return true;
        }
        return false;
    };

    this.reset = function (player)
    {
        if (player === LEFT_PLAYER)
        {
            this.ballPosition = new Vector(200.0, STANDARD_BALL_HEIGHT);
        } else
        if (player === RIGHT_PLAYER)
        {
            this.ballPosition = new Vector(600.0, STANDARD_BALL_HEIGHT);
        } else
        {
            this.ballPosition = new Vector(400.0, 450.0);
        }

        this.ballVelocity.clear();

        this.blobState[LEFT_PLAYER] = 0.0;
        this.blobState[RIGHT_PLAYER] = 0.0;

        this.isGameRunning = false;
        this.isBallValid = true;

        this.lastHitIntensity = 0.0;
    };

    this.ballHitRightGround = function ()
    {
        if (this.isBallValid)
        {
            if ((this.ballPosition.y > GROUND_PLANE_HEIGHT) && (this.ballPosition.x > NET_POSITION_X))
            {
                return true;
            }
        }
        return false;
    };

    this.ballHitLeftGround = function ()
    {
        if (this.isBallValid)
        {
            if (this.ballPosition.y > GROUND_PLANE_HEIGHT && this.ballPosition.x < NET_POSITION_X)
            {
                return true;
            }
        }
        return false;
    };

    this.setBallValidity = function (validity)
    {
        this.isBallValid = validity;
    };

    this.roundFinished = function ()
    {
        if (this.resetAreaClear())
        {
            if (!this.isBallValid)
            {
                if (this.ballVelocity.y < 1.5 && this.ballVelocity.y > -1.5 && this.ballPosition.y > 430)
                {
                    return true;
                }
            }
        }
        if (this.timeSinceBallout > TIMEOUT_MAX)
        {
            return true;
        }
        return false;
    };

    this.playerTopBallCollision = function (player)
    {
        var tmp = new Vector(0.0, 0.0);
        tmp.vectorByDots(this.ballPosition, new Vector(this.blobPosition[player].x, this.blobPosition[player].y - BLOBBY_UPPER_SPHERE));
        if (tmp.getLength() <= BALL_RADIUS + BLOBBY_UPPER_RADIUS)
        {
            return true;
        }
        return false;
    };

    this.playerBottomBallCollision = function (player)
    {
        var tmp = new Vector(0.0, 0.0);
        tmp.vectorByDots(this.ballPosition, new Vector(this.blobPosition[player].x, this.blobPosition[player].y + BLOBBY_LOWER_SPHERE));
        if (tmp.getLength() <= BALL_RADIUS + BLOBBY_LOWER_RADIUS)
        {
            return true;
        }
        return false;
    };

    this.ballHitPlayer = function (player)
    {
        return this.ballHitByBlob[player];
    };

    this.checkBlobbyBallCollision = function (player)
    {
        var tmp = new Vector(0, 0);
        var blobpos;
        var circlepos;
        // Check for bottom circles
        if (this.playerBottomBallCollision(player))
        {
            tmp.vectorByDots(this.ballVelocity, this.blobVelocity[player]);
            this.lastHitIntensity = tmp.getLength();

            blobpos = this.blobPosition[player];
            circlepos = new Vector(blobpos.x, blobpos.y + BLOBBY_LOWER_SPHERE);

            tmp.vectorByDots(this.ballPosition, circlepos);
            tmp.x = -tmp.x;
            tmp.y = -tmp.y;
            this.ballVelocity = tmp;

            this.ballVelocity = this.ballVelocity.normalise();
            this.ballVelocity = this.ballVelocity.scale(BALL_COLLISION_VELOCITY);
            this.ballPosition = this.ballPosition.addVector(this.ballVelocity);
            this.ballHitByBlob[player] = true;
        } else if (this.playerTopBallCollision(player))
        {
            tmp.vectorByDots(this.ballVelocity, this.blobVelocity[player]);
            this.lastHitIntensity = tmp.getLength();

            blobpos = this.blobPosition[player];
            circlepos = new Vector(blobpos.x, blobpos.y - BLOBBY_UPPER_SPHERE);

            tmp.vectorByDots(this.ballPosition, circlepos);
            tmp.x = -tmp.x;
            tmp.y = -tmp.y;
            this.ballVelocity = tmp;

            this.ballVelocity = this.ballVelocity.normalise();
            this.ballVelocity = this.ballVelocity.scale(BALL_COLLISION_VELOCITY);
            this.ballPosition = this.ballPosition.addVector(this.ballVelocity);
            this.ballHitByBlob[player] = true;
        }
    };

    // Animations
    this.blobbyAnimationStep = function (player)
    {
        if (this.blobState[player] < 0.0)
        {
            this.currentBlobbyAnimationSpeed[player] = 0.0;
            this.blobState[player] = 0.0;
        }
        if (this.blobState[player] >= 3.5)
        {
            this.currentBlobbyAnimationSpeed[player] = -BLOBBY_ANIMATION_SPEED;
        }

        this.blobState[player] += this.currentBlobbyAnimationSpeed[player];

        if (this.blobState[player] >= 4.0)
        {
            this.blobState[player] = 4.0;
        }
    };

    this.blobbyStartAnimation = function (player)
    {
        if (this.currentBlobbyAnimationSpeed[player] === 0.0)
        {
            this.currentBlobbyAnimationSpeed[player] = BLOBBY_ANIMATION_SPEED;
        }
    };

    this.handleBlob = function (player, inputManager)
    {
        // Reset ball to blobby collision
        this.ballHitByBlob[player] = false;
        var input = inputManager.getPlayerInput(player);
        if (input.up === 1)
        {
            if (this.blobbyHitGround(player))
            {
                this.blobVelocity[player].y = -BLOBBY_JUMP_ACCELERATION;
                this.blobbyStartAnimation(player);
            }
            this.blobVelocity[player].y -= BLOBBY_JUMP_BUFFER;
        }
        if (((input.left === 1) || (input.right === 1)) && this.blobbyHitGround(player))
        {
            this.blobbyStartAnimation(player);
        }

        this.blobVelocity[player].x =
                (input.right === 1 ? BLOBBY_SPEED : 0.0) -
                (input.left === 1 ? BLOBBY_SPEED : 0.0);

        // Acceleration Integration
        this.blobVelocity[player].y = this.blobVelocity[player].y + GRAVITATION;

        // Compute new position
        this.blobPosition[player] = this.blobPosition[player].addVector(this.blobVelocity[player]);

        if (this.blobPosition[player].y > GROUND_PLANE_HEIGHT)
        {
            if (this.blobVelocity[player].y > 3.5)
            {
                this.blobbyStartAnimation(player);
            }

            this.blobPosition[player].y = GROUND_PLANE_HEIGHT;
            this.blobVelocity[player].y = 0.0;
        }
        this.blobbyAnimationStep(player);
    };

    this.blobbyHitGround = function (player)
    {
        if (player === LEFT_PLAYER)
        {
            if (this.blobPosition[LEFT_PLAYER].y >= GROUND_PLANE_HEIGHT)
            {
                return true;
            } else
            {
                return false;
            }
        } else if (player === RIGHT_PLAYER)
        {
            if (this.blobPosition[RIGHT_PLAYER].y >= GROUND_PLANE_HEIGHT)
            {
                return true;
            } else
            {
                return false;
            }
        } else
        {
            return false;
        }
    };

    this.dampBall = function ()
    {
        this.ballVelocity = this.ballVelocity.scale(0.6);
    };

    this.getBlobJump = function (player)
    {
        return !this.blobbyHitGround(player);
    };

    this.getBallActive = function ()
    {
        return this.isGameRunning;
    };

    /**
     * Returns the current position of the ball
     *
     * @returns {Vector}
     */
    this.getPhysicBallPositon = function ()
    {
        return this.ballPosition;
    };

    /**
     * Sets the current position of the ball
     *
     * @param {Vector} position
     * @returns {undefined}
     */
    this.setPhysicBallPosition = function (position)
    {
        this.ballPosition = position;
    };

    /**
     * Returns the current state of the blobbyanimations
     *
     * @returns {Number|Array}
     */
    this.getBlobbyAnimationStates = function ()
    {
        return this.blobState;
    };

    /**
     * Returns the position of the blobs
     *
     * @returns {Vector|Array}
     */
    this.getBlobbyPositions = function ()
    {
        return this.blobPosition;
    };

    /**
     * Sets the whole physic
     * 
     * @param {Physic} physic
     * @returns {undefined}
     */
    this.setPhysic = function (physic)
    {
        this.blobVelocity = physic.blobVelocity;
        this.blobPosition = physic.blobPosition;

        this.ballPosition = physic.ballPosition;
        this.ballVelocity = physic.ballVelocity;

        this.currentBlobbyAnimationSpeed = physic.currentBlobbyAnimationSpeed;
        this.blobState = physic.blobState;

        this.isBallValid = physic.isBallValid;
        this.isGameRunning = physic.isGameRunning;
        this.timeSinceBallout = physic.timeSinceBallout;
        this.lastHitIntensity = physic.lastHitIntensity;
        this.ballHitByBlob = physic.ballHitByBlob;
    };
};

module.exports = Physic;
