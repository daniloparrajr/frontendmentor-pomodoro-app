export function setThemeClass(type, prevClass, classes) {
  const domBody = document.body;

  if (domBody.className.match(prevClass)) {
    domBody.className = domBody.className.replace(
      prevClass,
      `theme-${type}-${classes}`
    );
  } else {
    domBody.classList.add(`theme-${type}-${classes}`);
  }
}
