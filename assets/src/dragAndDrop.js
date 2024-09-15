import Block from "./block";
import BlockBuilder from "./blockBuilder";
import PageElements from "./PageElements";

function blockInScriptArea(origin) {
  return PageElements.script.querySelector(`#${origin.id}`) === null;
}

function isScriptArea(element) {
  return element.classList.contains("blocks--script");
}

export default class DragAndDrop {
  #handleDragenter() {
    this.scripts.addEventListener("dragenter", function (event) {
      event.preventDefault();
    });
  }

  #handleDragOver() {
    this.scripts.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
  }

  #dropBlockInScriptArea(origin, destination) {
    if (isScriptArea(destination)) {
      if (blockInScriptArea(origin)) {
        const block = Block.clone(origin);
        destination.appendChild(Block.styleScript(block));
      } else {
        origin.remove();
      }
    }
  }

  #dropBlockInGroupArea(origin, destination) {
    if (BlockBuilder.isGroupArea(destination)) {
      const block = blockInScriptArea(origin) ? Block.clone(origin) : origin;
      destination.appendChild(Block.styleScript(block));
    }
  }

  #dropBlockInBlockDesc(origin, destination) {
    if (BlockBuilder.isBlockDescArea(destination)) {
      const block = blockInScriptArea(origin) ? Block.clone(origin) : origin;
      const container = destination.parentElement.parentElement;
      const destinationParent = destination.parentElement;
      container.insertBefore(Block.styleScript(block), destinationParent);
    }
  }

  #handleDrop() {
    const thisObj = this;

    thisObj.scripts.addEventListener("drop", function (event) {
      event.stopPropagation();

      let origin = document.getElementById(event.dataTransfer.getData("text"));
      let destination = event.target;

      if (BlockBuilder.isBlock(origin)) {
        thisObj.#dropBlockInScriptArea(origin, destination);
        thisObj.#dropBlockInGroupArea(origin, destination);
        thisObj.#dropBlockInBlockDesc(origin, destination);
      }
    });
  }

  constructor(scripts) {
    this.scripts = scripts;
  }

  init() {
    this.#handleDrop();
    this.#handleDragenter();
    this.#handleDragOver();
  }
}
