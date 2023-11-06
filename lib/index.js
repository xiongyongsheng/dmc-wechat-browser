var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
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
var _options, _requiredOptions;
import { isWeiXin, isQYWeiXin } from "dmc-utils/lib/modules/browser/wx";
import storageAvailable from "dmc-utils/lib/modules/common/storageAvailable";
import { isArray, isFunction, merge } from "lodash";
import * as auth from "./modules/auth";
export { auth };
import * as JS_SDK from "./modules/jssdk";
export { JS_SDK };
import * as openTag from "./modules/jssdk/openTag";
export { openTag };
class DMCWechatWrappers {
  constructor(options, modules) {
    __privateAdd(this, _options, {
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
      forcePopup: !1,
      // JS-SDK
      JS_SDK_URL: "https://res.wx.qq.com/open/js/jweixin-1.6.0.js",
      // storage key
      storageKey: "dmc-wechat-wrappers",
      storageType: "sessionStorage"
    });
    __privateAdd(this, _requiredOptions, {
      appId: ["isWechat"],
      corpId: ["isQYWechat"],
      agentId: ["isQYWechat"],
      redirectUri: ["isWechat", "isQYWechat"],
      state: [],
      scope: ["isWechat", "isQYWechat"],
      oauth2: ["isWechat", "isQYWechat"],
      responseType: ["isWechat", "isQYWechat"],
      urlSearch: []
    });
    this.options = merge(__privateGet(this, _options), options), this.urlSearchParams = new URLSearchParams(this.options.urlSearch), this.urlHashParams = new URLSearchParams(this.options.urlHash), this.checkENV(), this.installModules(modules);
  }
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
    return !!this.userToken;
  }
  set userToken(token) {
    this.targetStorage.setItem(`${this.options.storageKey}-user-token`, token);
  }
  checkENV() {
    storageAvailable(this.options.storageType) || console.error(`No ${this.options.storageType} for us`);
  }
  installModules(modules) {
    modules && (isArray(modules) ? modules.forEach((item) => __async(this, null, function* () {
      let initFun;
      for (let key in item) {
        const value = item[key];
        isFunction(value) ? key === "init" ? initFun = value : this[key] = value.bind(this) : this[key] = value;
      }
      initFun && (yield initFun.call(this));
    })) : console.error("Modules is not an array."));
  }
  checkRequiredParameter(target) {
    let array = [];
    for (let key in __privateGet(this, _requiredOptions))
      (__privateGet(this, _requiredOptions)[key] || []).includes(target) && (this.options[key] === void 0 || this.options[key] === null || this.options[key] === "") && array.push(key);
    return array.length ? (console.error(`A required parameter is missing:${array.join()}.`), !1) : !0;
  }
}
_options = new WeakMap(), _requiredOptions = new WeakMap();
export default DMCWechatWrappers;
