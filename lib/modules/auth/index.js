function toAuth(STATE) {
  let state = STATE || this.options.state;
  state || (state = this.urlSearchParams.get("state") || "STATE");
  const url = `${this.options.oauth2}?appid=${this.isQYWechat ? this.options.corpId : this.options.appId}&redirect_uri=${encodeURIComponent(
    this.options.redirectUri
  )}&response_type=${this.options.responseType}&scope=${this.options.scope}&agentid=${this.options.agentId}&state=${state}&forcePopup=${this.options.forcePopup}#wechat_redirect`;
  location.replace(url);
}
export function auth(STATE) {
  this.isQYWechat ? this.checkRequiredParameter("isQYWechat") && toAuth.call(this, STATE) : this.isWechat ? this.checkRequiredParameter("isWechat") && toAuth.call(this, STATE) : (console.error("The current non-WeChat environment cannot be authorized."), console.log("navigator.userAgent: ", JSON.stringify(navigator.userAgent)));
}
