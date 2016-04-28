# scrollto.js
Smooth scroll to a specific position or target element

## Examples
```javascript
import scrollTo from 'scrollto.js';

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
$ npm install isvisible.js --save
```

## License
The MIT License (MIT)

Copyright (c) 2016 Patrick Pietens

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
