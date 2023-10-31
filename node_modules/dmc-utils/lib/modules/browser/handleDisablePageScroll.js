export default function handleDisablePageScroll(flag) {
  flag ? (sessionStorage.setItem("__scrollTop", document.scrollingElement.scrollTop), document.body.style.top = `${-document.scrollingElement.scrollTop}px`, document.body.style.position = "fixed") : (document.body.style.position = "static", document.body.style.top = "auto", document.scrollingElement.scrollTop = Number(
    sessionStorage.getItem("__scrollTop")
  ));
}
