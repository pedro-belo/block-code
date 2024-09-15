import PageElements from "./PageElements";

class Cursor {
  static WIDTH = 35;
  static HEIGHT = 35;

  constructor(outputCursor) {
    this.outputCursor = outputCursor;

    this.reset();
    this.updateIcon();
  }

  getWidth() {
    return Cursor.WIDTH;
  }

  getHeight() {
    return Cursor.HEIGHT;
  }

  visibilityToggle() {
    this.hide = !this.hide;
  }

  setPenEnabled(value) {
    this.pen.enabled = value;
  }

  getPenEnabled() {
    return this.pen.enabled;
  }

  reset() {
    this.direction = 0;
    this.hide = false;
    this.position = { x: 0, y: 0 };

    this.pen = {
      enabled: true,
    };
  }

  updateIcon() {
    this.outputCursor.style.display = this.hide ? "none" : "block";
    this.outputCursor.style.left = `${this.position.x - Cursor.WIDTH / 2}px`;
    this.outputCursor.style.top = `${this.position.y - Cursor.HEIGHT / 2}px`;
    this.outputCursor.style.transform = `rotate(${this.direction * -1}deg)`;
  }
}

class Space {
  constructor(context, contextWidth, contextHeight) {
    this.context = context;
    this.width = contextWidth;
    this.height = contextHeight;
  }

  clean() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.height);
  }
}

export default class BlockCode {
  #setupCanvasSize() {
    PageElements.outputCanvas.setAttribute(
      "width",
      `${PageElements.output.clientWidth}px`
    );

    PageElements.outputCanvas.setAttribute(
      "height",
      `${PageElements.output.clientHeight}px`
    );
  }

  init() {
    this.#setupCanvasSize();
    this.cursor = new Cursor(PageElements.outputCursor);
    this.space = new Space(
      PageElements.context2D,
      PageElements.output.clientWidth,
      PageElements.output.clientHeight
    );
    this.cursor.updateIcon();
  }
}
