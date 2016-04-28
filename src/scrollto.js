'use strict';

import raf from 'raf';

// Easing function used to scroll DOMNodes and the window
const easeOutCubic = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;

// Default options used to scroll DOMNodes and the window
const defaultOptions = {
    horizontal: true,
    vertical: true,
    duration: 500,
    offsetX: 0,
    offsetY: 0,
};

// Map containing all running tweens
let tweens = new Map();

/**
 * Convenience method to set the scrollposition of an element
 * @param  {number} x Horizontal position
 * @param  {number} y Vertical position
 */
Node.prototype.scrollTo = function (x, y) {
    this.scrollLeft = x;
    this.scrollTop = y;
};

/**
 * Smooth scroll an element or window object to a specific position
 * @param  {number} x       Horizontal position
 * @param  {number} y       Vertical position
 * @param  {object} options Object containing options used to scroll the element
 */
Node.prototype.scrollToPosition = window.scrollToPosition = function (x, y, options = {}) {
    options = Object.assign({}, defaultOptions, options);

    // Cancel previous tweens on the DOM element
    if (tweens.has(this)) {
        raf.cancel(tweens.get(this));
	}

    // Set the scroll properties directly on the element when the duration is 0 or less
    if (options.duration <= 0) {
        return this.scrollTo(x, y);
    }

    // Set initial constants needed for easing
    const initialX = this === window ? window.pageXOffset : this.scrollLeft;
    const initialY = this === window ? window.pageYOffset : this.scrollTop;

    const distanceX = x - initialX;
    const distanceY = y - initialY;

    let myStartTime;

    raf(function tick(time) {
        // Set the time the animation started
        if (!myStartTime) {
            myStartTime = time;
        }

        // Calculate the elapsed time
        let myElapsedTime = time - myStartTime;

        // Set the target scroll values when the animation is finished
        if (myElapsedTime >= options.duration) {
            this.scrollTo(x, y);

			return tweens.delete(this);
        }

        // Otherwise calculate the scroll values using the custom easing function
        let myX = easeOutCubic(myElapsedTime, initialX, distanceX, options.duration),
            myY = easeOutCubic(myElapsedTime, initialY, distanceY, options.duration);

        this.scrollTo(myX, myY);

        tweens.set(this, raf(tick.bind(this)));
    }.bind(this));
};

/**
 * Scroll an element or the window to a target element
 * @param  {Node} element Target element to scroll to
 * @param  {object} options Object containing options used to scroll the element
 */
Node.prototype.scrollToElement = window.scrollToElement = function (element, options = {}) {
    options = Object.assign({}, defaultOptions, options);

    // Get the bounding box from the target element
    const boundingBox = element.getBoundingClientRect();

    let myX = (this === window ? window.pageXOffset : this.scrollLeft),
        myY = (this === window ? window.pageYOffset : this.scrollTop);

    // Set horizontal position if this is allowed
    if (options.horizontal) {
        myX += boundingBox.left;
    }

    // Same for vertical position
    if (options.vertical) {
        myY += boundingBox.top;
    }

    // Add offsets
    myX += options.offsetX;
    myY += options.offsetY;

    // Scroll to the position of the element
    this.scrollToPosition(myX, myY, options);
};
