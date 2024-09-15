import { v4 as uuidv4 } from "uuid";

export default class BlockBuilder {
  createBaseBlock() {
    const block = document.createElement("div");
    block.classList.add("block");
    block.draggable = "true";
    return block;
  }

  createBaseBlockDesc() {
    const blockDesc = document.createElement("p");
    blockDesc.classList.add("block__desc");
    return blockDesc;
  }

  addBlockGroup(block) {
    const blockGroup = document.createElement("div");
    blockGroup.classList.add("block__group");

    const span = document.createElement("span");
    span.classList.add("block__group__container");

    blockGroup.appendChild(span);

    block.appendChild(blockGroup);
  }

  #createNumberInput(value) {
    const input = document.createElement("input");
    input.setAttribute("value", value);
    input.setAttribute("type", "number");

    return input;
  }

  createBlock(name, isGroup) {
    const block = this.createBaseBlock();
    block.setAttribute("id", BlockBuilder.generateRandomBlockId());

    block.dataset.name = name;

    const text = this.createBaseBlockDesc();
    block.appendChild(text);

    if (isGroup) {
      this.addBlockGroup(block);
    }

    return block;
  }

  #inputAsText(input, textTemplate) {
    const inputText = input.outerHTML;
    return textTemplate.replace("__REPL__", inputText);
  }

  createSimpleBlock(name, text) {
    const block = this.createBlock(name, false);

    block.children[0].textContent = text;

    return block;
  }

  createNumericBlock(name, text, defaultValue) {
    const block = this.createBlock(name, false);
    const input = this.#createNumberInput(defaultValue);
    block.children[0].innerHTML = this.#inputAsText(input, text);
    return block;
  }

  createNumericGroup(name, text, defaultValue) {
    const block = this.createBlock(name, true);
    const input = this.#createNumberInput(defaultValue);

    block.children[0].innerHTML = this.#inputAsText(input, text);

    return block;
  }

  static isBlock(element) {
    return element.classList.contains("block");
  }

  static isGroupArea(element) {
    return element.classList.contains("block__group__container");
  }

  static isBlockDescArea(element) {
    return element.classList.contains("block__desc");
  }

  static generateRandomBlockId() {
    return `block_${uuidv4()}`;
  }
}
