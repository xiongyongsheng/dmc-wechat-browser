import { isString, merge } from "lodash";

export function init() {
  this.addSDKScript();
  this.JS_SDK_CONFIG = {
    debug: false,
    appId: this.options.appId,
    jsApiList: [],
    openTagList: [],
  };
}
export async function signature(options) {
  this.JS_SDK_CONFIG = merge(this.JS_SDK_CONFIG, options);

  await new Promise((res) => {
    const interval = setInterval(() => {
      if (this.JS_SDK_SCRIPT_LOAD_DONE) {
        clearInterval(interval);
        res();
      }
    }, 300);
  });
  return new Promise((res, rej) => {
    wx.config({
      debug: this.JS_SDK_CONFIG.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: this.JS_SDK_CONFIG.appId, // 必填，公众号的唯一标识
      timestamp: this.JS_SDK_CONFIG.timestamp, // 必填，生成签名的时间戳
      nonceStr: this.JS_SDK_CONFIG.nonceStr, // 必填，生成签名的随机串
      signature: this.JS_SDK_CONFIG.signature, // 必填，签名
      jsApiList: this.JS_SDK_CONFIG.jsApiList, // 必填，需要使用的JS接口列表
      openTagList: this.JS_SDK_CONFIG.openTagList, // 选填，需要使用的开放标签列表
    });
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.ready(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    wx.error(rej);
  })
    .then(() => {
      console.log("wx.ready");
      this.wxReady = true;
      this.checkJsApiList();
    })
    .catch((err) => {
      console.error("wx.error: ", err);
      this.wxReady = false;
      this.checkJsApiList();
      return Promise.reject(err);
    });
}

export function checkJsApiList() {
  return new Promise((res, rej) => {
    wx.checkJsApi({
      jsApiList: this.JS_SDK_CONFIG.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: (result) => {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        this.checkJsApiListResult = result.checkResult;
        res(result.checkResult);
      },
    });
  });
}

export function addSDKScript() {
  if (!isString(this.options.JS_SDK_URL) || !this.options.JS_SDK_URL) {
    console.error(`JS_SDK_URL error: `, this.options.JS_SDK_URL);
    return;
  }
  const scripts = document.head.getElementsByTagName("script");
  const script = Array.prototype.find.call(scripts, (item) => {
    return item.src === this.options.JS_SDK_URL;
  });
  if (script) {
    document.head.removeChild(script);
  }
  this.JS_SDK_SCRIPT_LOAD_DONE = false;
  this.JS_SDK_SCRIPT = document.createElement("script");
  this.JS_SDK_SCRIPT.onload = () => {
    this.JS_SDK_SCRIPT_LOAD_DONE = true;
  };
  this.JS_SDK_SCRIPT.src = this.options.JS_SDK_URL;
  document.head.appendChild(this.JS_SDK_SCRIPT);
}
