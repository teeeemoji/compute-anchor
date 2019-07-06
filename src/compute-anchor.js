import { initOptions, makeHandler, listen, dispose } from "./utils";

function computeAnchor(options) {
  let opt = initOptions(options);
  let scrollHandler = makeHandler(opt);
  listen(opt, scrollHandler);
  return function() {
    dispose(opt, scrollHandler);
  };
}

export default computeAnchor;
