export function throttle(fn, interval, context) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    const _this = this;
    canRun = false;
    setTimeout(() => {
      fn.apply(context || _this, arguments);
      canRun = true;
    }, interval || 200);
  }
}

export function debounce(fn, interval, context) {
  let timer = null;
  return function() {
    const _this = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context || _this, arguments);
    }, interval || 200);
  }
}