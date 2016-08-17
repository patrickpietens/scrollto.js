# scrollto.js
Smooth scroll to a specific position or target element

## Examples
```javascript
import 'scrollto.js';

// Scroll the window object to a specific position
window.scrollToPosition(100, 100);

// Or scroll an element with overflow auto or scroll
let myFoo = document.getElementById('foo');
myFoo.scrollToPosition(300, 10, { duration: 300 });

// Scroll the window to the element with id bar
let myBar = document.getElementById('bar');
window.scrollToElement(myBar);

// Vertically scroll the window to element bar with an offset of 100px
window.scrollToElement(myBar, { horizontal: false, offsetY: 100 });
```

## Scroll options
```javascript
{
    duration: 500,
    horizontal: true,
    vertical: true,
    offsetX: 0,
    offsetY: 0,
}
```

## Installation
```bash
$ npm install scrollto.js --save
```
