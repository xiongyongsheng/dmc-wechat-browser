function hideOptionMenuCallback() {
  WeixinJSBridge.call("hideOptionMenu");
}
export function hideMenu() {
  typeof WeixinJSBridge == "undefined" ? document.addEventListener ? document.addEventListener(
    "WeixinJSBridgeReady",
    hideOptionMenuCallback,
    !1
  ) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", hideOptionMenuCallback), document.attachEvent("onWeixinJSBridgeReady", hideOptionMenuCallback)) : hideOptionMenuCallback();
}
