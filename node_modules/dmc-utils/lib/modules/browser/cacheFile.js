var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
};
function isImage(filename) {
  return /\.(?:png|jpe?g|webp|avif|gif)$/i.test(filename);
}
function callback(url) {
  return isImage(url) ? new Promise((res, rej) => {
    const img = new Image();
    img.onload = function() {
      this.aspectRatio = this.naturalWidth / this.naturalHeight, res(this);
    }, img.onerror = function(e) {
      rej(e);
    }, img.src = url;
  }) : Promise.reject(`${url} not a image.`);
}
export default function cacheFile(fileUrls) {
  if (fileUrls instanceof Array)
    return Promise.all(fileUrls.map(callback));
  if (fileUrls instanceof Object) {
    const keys = Object.keys(fileUrls);
    return Promise.all(
      keys.map((key) => callback(fileUrls[key]).then((res) => ({
        [key]: res
      })))
    ).then((result) => {
      let obj = {};
      return result.forEach((item) => {
        obj = __spreadValues(__spreadValues({}, obj), item);
      }), obj;
    });
  }
}
