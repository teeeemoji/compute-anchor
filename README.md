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

## Running the tests
TODO

## Contributing
There's no other contributor

## Authors
teeeemoji <teeeemoji@163.com>

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details 

### Task
## important
- write test
- publish this package

## others
- friendly way to write demo
