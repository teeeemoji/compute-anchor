# Compute Anchor

![](https://img.shields.io/travis/com/teeeemoji/compute-anchor.svg)

This is a small package, listening `scroll` or `wheel` or `touchmove` event of the given DOM element, for compute the most compatible anchor in AnchorList.
And its 

## Getting Started

### Prerequisites

This package support both pc and mobile.

### Installing

```shell
$ npm install compute-anchor
```

### Usage

```javascript
let dispose = computeAnchor({// add event listener on element
    element: document.getElementById('container'),
    anchors: ['title', 'getting start', 'installing', 'usage'],
    callback: anchor => console.log(anchor),
    offset: {
      top: 80,
      bottom: 0
    }
})

dispose()// remove event listener on element
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### computeAnchor

[src/compute-anchor.js:26-33](https://git@github.com/:teeeemoji/compute-anchor/blob/fa70417ed30c70c140592850b58c99fc10c2446e/src/compute-anchor.js#L26-L33 "Source code on GitHub")

This function accept an element and some other options, to start listening element's event for compute anchor

#### Parameters

-   `options`  {Object}
    -   `options.element`  {DOMNode}
           which dom element contains all anchors and its scrollable (optional, default `window`)
    -   `options.events`  {String\[]}
           which events will add on `options.elements` (optional, default `['scroll','resize']`)
    -   `options.anchors`  {String\[]}
           all anchors you care about, and it just anchor name, don't start with `#`
    -   `options.callback`  {Function}
           callback will invoke when compute handler returns a new anchor
           if compute handler returns the same result, callback will not be invoked
           `callback(anchor){}`
    -   `options.defaultAnchor`  {String}
           if can't find any fit anchor, callback will receive defaultAnchor (optional, default `''`)
    -   `options.offset`  {Number\[]}
           offset[0] is top offset, offset[1] is bottom offset
           when your input element has some fixed top or fixed bottom children, options.offset if useful (optional, default `[0,0]`)
    -   `options.wait`  {Number}
           wait is time in MS for eventListener wait time (optional, default `20`)

Returns **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** the function to remove all eventListener on element

## Running the tests

TODO

## Contributing

There's no other contributor

## Authors

teeeemoji <mailto:teeeemoji@163.com>

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details 

### Task

## important

-   write test
-   publish this package

## others

-   friendly way to write demo
