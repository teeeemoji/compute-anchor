import {
  initOptions,
  makeHandler,
  makeHandlerDebounced,
  listen,
  dispose
} from "./utils";

function computeAnchor(options) {
  let opt = initOptions(options);
  let scrollHandler = makeHandler(opt);
  let debounceHandler = makeHandlerDebounced(scrollHandler, options);
  listen(opt, debounceHandler);
  return {
    compute: scrollHandler,
    dispose: function() {
      dispose(opt, debounceHandler);
    }
  };
}

export default computeAnchor;
