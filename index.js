import { isWeiXin, isQYWeiXin } from "dmc-utils/lib/modules/browser/wx";
import storageAvailable from "dmc-utils/lib/modules/common/storageAvailable";
import { isArray, isFunction, merge } from "lodash";
// export modules
export * as auth from "./modules/auth";
export * as JS_SDK from "./modules/jssdk";
export * as openTag from "./modules/jssdk/openTag";
class DMCWechatWrappers {
  #options = {
    appId: null,
    corpId: null,
    agentId: null,
    redirectUri: null,
    state: null,
    scope: "snsapi_base",
    oauth2: "https://open.weixin.qq.com/connect/oauth2/authorize",
    responseType: "code",
    urlSearch: location.search,
    urlHash: location.hash,
    forcePopup: false,
    // JS-SDK
    JS_SDK_URL: "https://res.wx.qq.com/open/js/jweixin-1.6.0.js",
    // storage key
    storageKey: "dmc-wechat-wrappers",
    storageType: "sessionStorage",
  };
  #requiredOptions = {
    appId: ["isWechat"],
    corpId: ["isQYWechat"],
    agentId: ["isQYWechat"],
    redirectUri: ["isWechat", "isQYWechat"],
    state: [],
    scope: ["isWechat", "isQYWechat"],
    oauth2: ["isWechat", "isQYWechat"],
    responseType: ["isWechat", "isQYWechat"],
    urlSearch: [],
  };
  get isWechat() {
    return isWeiXin();
  }
  get isQYWechat() {
    return this.isWeiXin && isQYWeiXin();
  }
  get targetStorage() {
    return window[this.options.storageType];
  }
  get userToken() {
    return this.targetStorage.getItem(`${this.options.storageKey}-user-token`);
  }
  get checkUserToken() {
    return Boolean(this.userToken);
  }
  set userToken(token) {
    this.targetStorage.setItem(`${this.options.storageKey}-user-token`, token);
  }
  constructor(options, modules) {
    this.options = merge(this.#options, options);
    this.urlSearchParams = new URLSearchParams(this.options.urlSearch);
    this.urlHashParams = new URLSearchParams(this.options.urlHash);
    this.checkENV();
    this.installModules(modules);
  }
  checkENV() {
    if (!storageAvailable(this.options.storageType)) {
      console.error(`No ${this.options.storageType} for us`);
    }
  }
  installModules(modules) {
    if (!modules) return;
    if (isArray(modules)) {
      modules.forEach(async (item) => {
        let initFun;
        for (let key in item) {
          const value = item[key];
          if (isFunction(value)) {
            if (key === "init") {
              initFun = value;
            } else {
              this[key] = value.bind(this);
            }
          } else {
            this[key] = value;
          }
        }
        initFun && (await initFun.call(this));
      });
    } else {
      console.error("Modules is not an array.");
    }
  }
  checkRequiredParameter(target) {
    let array = [];
    for (let key in this.#requiredOptions) {
      const value = this.#requiredOptions[key] || [];
      if (
        value.includes(target) &&
        (this.options[key] === undefined ||
          this.options[key] === null ||
          this.options[key] === "")
      ) {
        array.push(key);
      }
    }
    if (array.length) {
      console.error(`A required parameter is missing:${array.join()}.`);
      return false;
    }
    return true;
  }
}

export default DMCWechatWrappers;
