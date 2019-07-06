import compute from "./compute";
import debounce from "lodash/debounce";

//Returns true if it is a DOM element, This code is tested in FF3, IE7, Chrome 1 and Opera 9
function isElement(o) {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement
    : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";
}

function getElement(ele) {
  if (!ele) {
    return window;
  }
  let element = typeof ele === "function" ? ele() : ele;
  if (isElement(element)) {
    return element;
  }
  throw new Error("[compute anchor]: input element is not valid DOM element");
}

const EMPTY_OPTIONS = {
  element: null,
  handler: null,
  defaultAnchor: "",
  anchors: [],
  callback: anchor => {},
  offset: [0, 0], // [top, bottom]
  wait: 20 // ms
};

export function initOptions(options) {
  return {
    ...EMPTY_OPTIONS,
    ...options,
    element: getElement(options.element),
    offset: {
      top: (options.offset && options.offset.top) || 0,
      bottom: (options.offset && options.offset.bottom) || 0
    }
  };
}

export function makeHandler(options) {
  let lastAnchor = options.defaultAnchor;
  return debounce(function() {
    let anchor = compute(options);
    if (anchor !== lastAnchor) {
      lastAnchor = anchor;
      options.callback(anchor);
    }
  }, options.wait);
}

export function listen(options, handler) {
  let eventName = options.element === window ? "scroll" : "wheel";
  options.element.addEventListener(eventName, handler);
}

export function dispose(options, handler) {
  let eventName = options.element === window ? "scroll" : "wheel";
  options.element.removeEventListener(eventName, handler);
}
