var __async = (__this, __arguments, generator) => new Promise((resolve, reject) => {
  var fulfilled = (value) => {
    try {
      step(generator.next(value));
    } catch (e) {
      reject(e);
    }
  }, rejected = (value) => {
    try {
      step(generator.throw(value));
    } catch (e) {
      reject(e);
    }
  }, step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
  step((generator = generator.apply(__this, __arguments)).next());
});
import { isString, merge } from "lodash";
export function init() {
  this.addSDKScript(), this.JS_SDK_CONFIG = {
    debug: !1,
    appId: this.options.appId,
    jsApiList: []
  };
}
export function signature(options) {
  return __async(this, null, function* () {
    return this.JS_SDK_CONFIG = merge(this.JS_SDK_CONFIG, options), yield new Promise((res) => {
      const interval = setInterval(() => {
        this.JS_SDK_SCRIPT_LOAD_DONE && (clearInterval(interval), res());
      }, 300);
    }), new Promise((res, rej) => {
      wx.config({
        debug: this.JS_SDK_CONFIG.debug,
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.JS_SDK_CONFIG.appId,
        // 必填，公众号的唯一标识
        timestamp: this.JS_SDK_CONFIG.timestamp,
        // 必填，生成签名的时间戳
        nonceStr: this.JS_SDK_CONFIG.nonceStr,
        // 必填，生成签名的随机串
        signature: this.JS_SDK_CONFIG.signature,
        // 必填，签名
        jsApiList: this.JS_SDK_CONFIG.jsApiList
        // 必填，需要使用的JS接口列表
      }), wx.ready(res), wx.error(rej);
    }).then(() => {
      console.log("wx.ready"), this.wxReady = !0, this.checkJsApiList();
    }).catch((err) => (console.error("wx.error: ", err), this.wxReady = !1, this.checkJsApiList(), Promise.reject(err)));
  });
}
export function checkJsApiList() {
  return new Promise((res, rej) => {
    wx.checkJsApi({
      jsApiList: this.JS_SDK_CONFIG.jsApiList,
      // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: (result) => {
        this.checkJsApiListResult = result.checkResult, res(result.checkResult);
      }
    });
  });
}
export function addSDKScript() {
  if (!isString(this.options.JS_SDK_URL) || !this.options.JS_SDK_URL) {
    console.error("JS_SDK_URL error: ", this.options.JS_SDK_URL);
    return;
  }
  const scripts = document.head.getElementsByTagName("script"), script = Array.prototype.find.call(scripts, (item) => item.src === this.options.JS_SDK_URL);
  script && document.head.removeChild(script), this.JS_SDK_SCRIPT_LOAD_DONE = !1, this.JS_SDK_SCRIPT = document.createElement("script"), this.JS_SDK_SCRIPT.onload = () => {
    this.JS_SDK_SCRIPT_LOAD_DONE = !0;
  }, this.JS_SDK_SCRIPT.src = this.options.JS_SDK_URL, document.head.appendChild(this.JS_SDK_SCRIPT);
}
