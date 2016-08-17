'use strict';

import raf from 'raf';

// Helper function which is used to ease the scrolling
const easeOutCubic = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;

// Helper function to clamp a value between a min and max value
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Default options used when a new scroll is initiated
const defaultOptions = {
    horizontal: true,
    vertical: true,
    duration: 500,
    easing: easeOutCubic,
    offsetX: 0,
    offsetY: 0,
};

export function scrollToPosition(target, x, y, options = {}) {
    return new Promise((resolve, reject) => {
        options = Object.assign({}, defaultOptions, options);

        // Cancel previous tweens on the DOM element
        if (!!target._scrollRequest) {
            raf.cancel(target._scrollRequest);
    	}

        // Set the scroll properties directly on the element when the duration is 0 or less
        if (options.duration <= 0) {
            target.scrollTo(x, y);
            return resolve(target);
        }

        // Get the initial position of the target element
        const initialX = (target === window) ? window.pageXOffset : target.scrollLeft;
        const initialY = (target === window) ? window.pageYOffset : target.scrollTop;

        // Calculate the max scroll positions
        const limitX = target.scrollWidth - target.innerWidth;
        const limitY = target.scrollHeight - target.innerHeight;

        // Calculate the
        const distanceX = clamp(x, 0, limitX) - initialX;
        const distanceY = clamp(y, 0, limitY) - initialY;

        let myStartTime;

        target._scrollRequest = raf(function tick(time) {
            // Set the time the animation started
            if (!myStartTime) {
                myStartTime = time;
            }

            // Calculate the elapsed time
            let myElapsedTime = time - myStartTime;

            // Set the target scroll values when the animation is finished
            if (myElapsedTime >= options.duration) {
                target.scrollTo(x, y);

                // Cleanup temporary variables
                raf.cancel(target._scrollRequest);
                target._scrollRequest = null;

                return resolve(target);
            }

            // Otherwise calculate the scroll values using the custom easing function
            let myX = options.easing(myElapsedTime, initialX, distanceX, options.duration),
                myY = options.easing(myElapsedTime, initialY, distanceY, options.duration);

            target.scrollTo(myX, myY);
            target._scrollRequest = raf(tick);
        });
    });
}

export function scrollToElement(target, element, options = {}) {
    options = Object.assign({}, defaultOptions, options);

    // Get the bounding box from the target element
    const boundingBox = element.getBoundingClientRect();

    let myX = (target === window ? window.pageXOffset : this.scrollLeft),
        myY = (target === window ? window.pageYOffset : this.scrollTop);

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
    return scrollToPosition(target, myX, myY, options);
}

if (!Node.prototype.scrollTo) {
    /**
     * Convenience method to set the scroll position of an element. The description is identical to window.scrollTo.
     * @param  {number} x Horizontal position
     * @param  {number} y Vertical position
     */
    Node.prototype.scrollTo = function (x, y) {
        this.scrollLeft = x;
        this.scrollTop = y;
    };
}

if (!('scrollWidth' in window)) {
    /**
     * Convencience property to get the scrollWidth of the document. The description is identical to element.scrollWidth.
     */
    Object.defineProperty(window, 'scrollWidth', {
        get: () => Math.max(
            document.body.clientWidth,
            document.documentElement.clientWidth,
            document.documentElement.scrollWidth
        ),
    });
}

if (!('scrollHeight' in window)) {
    /**
     * Convencience property to get the scrollWidth of the document. The description is identical to element.scrollWidth.
     */
    Object.defineProperty(window, 'scrollHeight', {
        get: () => Math.max(
            document.body.clientHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight
        ),
    });
}

if (!Node.prototype.scrollToPosition) {
    /**
     * Smooth scroll an element or window object to a specific position
     * @param  {number} x       Horizontal position
     * @param  {number} y       Vertical position
     * @param  {object} options Object containing options used to scroll the element
     */
    Node.prototype.scrollToPosition = window.scrollToPosition = function (x, y, options = {}) {
        return scrollToPosition(this, x, y, options);
    };
}

if (!Node.prototype.scrollToElement) {
    /**
     * Scroll an element or the window to a target element
     * @param  {Node} element Target element to scroll to
     * @param  {object} options Object containing options used to scroll the element
     */
    Node.prototype.scrollToElement = window.scrollToElement = function (element, options = {}) {
        return scrollToElement(this, element, options);
    };
}
