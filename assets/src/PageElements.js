export default class PageElements {
  static get output() {
    return document.querySelector(".output");
  }

  static get outputCursor() {
    return document.querySelector(".output .cursor");
  }

  static get outputCanvas() {
    return document.querySelector(".output canvas");
  }

  static get context2D() {
    return PageElements.outputCanvas.getContext("2d");
  }

  static get script() {
    return document.querySelector(".blocks--script");
  }

  static get statements() {
    return document.querySelector(".blocks--statement");
  }

  static get btnRunScript() {
    return document.querySelector("#btnRunScript");
  }

  static get btnResetApp() {
    return document.querySelector("#btnResetApp");
  }

  static get btnDownloadScript() {
    return document.querySelector("#btnDownloadScript");
  }

  static get btnUploadScript() {
    return document.querySelector("#btnUploadScript");
  }

  static get uploadScriptInput() {
    return document.querySelector("#uploadScriptInput");
  }
}
