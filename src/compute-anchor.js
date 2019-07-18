import {
  initOptions,
  makeHandler,
  makeDebounceHandler,
  listen,
  dispose
} from "./utils";

/**
 * @public
 * @description This function accept an element and some other options, to start listening element's event for compute anchor
 * @param options {Object}
 * @param [options.element=window] {DOMNode}
 *    which dom element contains all anchors and its scrollable
 * @param [options.events=['scroll', 'resize']] {String[]}
 *    which events will add on `options.elements`
 * @param [options.anchors] {String[]}
 *    all anchors you care about, and it just anchor name, don't start with `#`
 * @param [options.callback] {Function}
 *    callback will invoke when compute handler returns a new anchor
 *    if compute handler returns the same result, callback will not be invoked
 *    `callback(anchor){}`
 * @param [options.defaultAnchor=''] {String}
 *    if can't find any fit anchor, callback will receive defaultAnchor
 * @param [options.offset=[0, 0]] {Number[]}
 *    offset[0] is top offset, offset[1] is bottom offset
 *    when your input element has some fixed top or fixed bottom children, options.offset if useful
 * @param [options.wait=20] {Number}
 *    wait is time in MS for eventListener wait time
 * @returns computeObj {Function}
 *  - [computeObj.compute] {Function} - compute handler, you can invoke this funcion and get the compute result
 *  - [computeObj.dispose] {Function} - the function to remove all eventListener on element
 */
function computeAnchor(options) {
  let opt = initOptions(options);
  let scrollHandler = makeHandler(opt);
  let debounceHandler = makeDebounceHandler(opt, scrollHandler);
  listen(opt, debounceHandler);
  return {
    compute: scrollHandler,
    dispose: function() {
      dispose(opt, debounceHandler);
    }
  };
}

export default computeAnchor;
