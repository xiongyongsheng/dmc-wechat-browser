function hideOptionMenuCallback() {
  WeixinJSBridge.call("hideOptionMenu");
}
// 隐藏浏览器菜单栏
export function hideMenu() {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener(
        "WeixinJSBridgeReady",
        hideOptionMenuCallback,
        false
      );
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", hideOptionMenuCallback);
      document.attachEvent("onWeixinJSBridgeReady", hideOptionMenuCallback);
    }
  } else {
    hideOptionMenuCallback();
  }
}
