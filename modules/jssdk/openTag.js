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
            <button class="btn">打开小程序</button>
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
