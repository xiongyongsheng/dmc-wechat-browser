function getLaunchWeAppTemplate({ appid, path }) {
  return `
  <div>
    <wx-open-launch-weapp
        id="launch-btn"
        appid="${appid}"
        path="${path}"
    >
        <script type="text/wxtag-template">
            <style>.btn { padding: 12px }</style>
            <button class="btn">\u6253\u5F00\u5C0F\u7A0B\u5E8F</button>
        </script>
    </wx-open-launch-weapp>/
    <script>
        var btn = document.getElementById('launch-btn');
        btn.addEventListener('launch', function (e) {
          console.log('success');
        });
        btn.addEventListener('error', function (e) {
          console.log('fail', e.detail);
        });
    </script>
</div>
    `;
}
export function isCustomElement(tag) {
  return tag.startsWith("wx-open");
}
export function WeixinOpenTagsError(callBack) {
  document.addEventListener("WeixinOpenTagsError", callBack);
}
