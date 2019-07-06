function getElementHeight(element) {
  if (element === window) {
    return window.document.documentElement.getBoundingClientRect().height;
  } else {
    return element.getBoundingClientRect().height;
  }
}

function getOffsetTopAndHeight(container, element, offsetTop = 0) {
  if (!element) {
    return -Infinity;
  }
  if (!element.getClientRects().length) {
    return -Infinity;
  }
  const rect = element.getBoundingClientRect();
  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return {
        top: rect.top - container.clientTop - offsetTop,
        height: rect.height
      };
    }
    return {
      top: rect.top - container.getBoundingClientRect().top - offsetTop,
      height: rect.height
    };
  }
  return {
    top: rect.top - offsetTop,
    height: rect.height
  };
}

function getDetermineLine(options, anchorsInfo) {
  if (!anchorsInfo.length) {
    return 0;
  }
  const { offset, element } = options;
  const lastItem = anchorsInfo[anchorsInfo.length - 1];
  const containerHeight = getElementHeight(element);
  const containerVisibleHeight = containerHeight - offset.top - offset.bottom;

  if (lastItem.top >= containerVisibleHeight) {
    return 0;
  } else {
    const lastItemVisibleHeight = containerVisibleHeight - lastItem.top;
    const lastItemVisiblePercent = lastItemVisibleHeight / lastItem.height;
    return Math.round(containerVisibleHeight * lastItemVisiblePercent);
  }
}

function compute(options) {
  const { element, anchors, defaultAnchor, offset } = options;
  const anchorsInfo = anchors
    .map(anchor => {
      const anchorDOM = document.getElementById(anchor);
      if (anchorDOM) {
        const info = getOffsetTopAndHeight(element, anchorDOM, offset.top);
        return {
          anchor,
          ...info
        };
      }
    })
    .filter(i => !!i)
    .sort((a, b) => a.top - b.top);
  const determineLine = getDetermineLine(options, anchorsInfo);
  if (anchorsInfo.some(i => i.top < determineLine)) {
    const maxSection = anchorsInfo
      .filter(i => i.top < determineLine)
      .reduce(
        (prev, curr) => (curr.top > prev.top ? curr : prev),
        anchorsInfo[0]
      );
    return (maxSection && maxSection.anchor) || defaultAnchor;
  } else {
    return defaultAnchor;
  }
}

export default compute;
