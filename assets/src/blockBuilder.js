import { v4 as uuidv4 } from "uuid";

const mapNameToAttr = {
  className: "class",
};

function createElement(tagName, attrs) {
  const element = document.createElement(tagName);

  Object.keys(attrs).forEach((attr) => {
    element.setAttribute(mapNameToAttr[attr] || attr, attrs[attr]);
  });

  return element;
}

export default class BlockBuilder {
  static CLASS_BLOCK = "block";
  static CLASS_BLOCK_DESC = "block__desc";
  static CLASS_BLOCK_GROUP = "block__group";
  static CLASS_BLOCK_GROUP_CONTAINER = "block__group__container";

  #createBaseBlock(name) {
    const block = createElement("div", {
      id: BlockBuilder.generateRandomBlockId(),
      className: BlockBuilder.CLASS_BLOCK,
      draggable: true,
    });

    const blockDesc = this.#createBaseBlockDesc();
    block.appendChild(blockDesc);

    block.dataset.name = name;

    return { root: block, blockDesc: blockDesc };
  }

  #createBaseBlockDesc() {
    return createElement("p", { className: BlockBuilder.CLASS_BLOCK_DESC });
  }

  #addBlockGroup(block) {
    block.blockGroup = createElement("div", {
      className: BlockBuilder.CLASS_BLOCK_GROUP,
    });

    block.blockGroup.appendChild(
      createElement("span", {
        className: BlockBuilder.CLASS_BLOCK_GROUP_CONTAINER,
      })
    );

    block.root.appendChild(block.blockGroup);
  }

  #createNumberInput(value) {
    return createElement("input", {
      value: value,
      type: "number",
    });
  }

  #embedInputInTemplate(input, template) {
    const inputText = input.outerHTML;
    return template.replace("__REPL__", inputText);
  }

  createSimpleBlock(name, text) {
    const block = this.#createBaseBlock(name);
    block.blockDesc.textContent = text;
    return block.root;
  }

  createNumericBlock(name, text, value) {
    const block = this.#createBaseBlock(name);

    const input = this.#createNumberInput(value);
    block.blockDesc.innerHTML = this.#embedInputInTemplate(input, text);

    return block.root;
  }

  createNumericGroup(name, text, value) {
    const block = this.#createBaseBlock(name);

    const input = this.#createNumberInput(value);
    block.blockDesc.innerHTML = this.#embedInputInTemplate(input, text);

    this.#addBlockGroup(block);

    return block.root;
  }

  static isBlock(element) {
    return element.classList.contains(BlockBuilder.CLASS_BLOCK);
  }

  static isGroupArea(element) {
    return element.classList.contains(BlockBuilder.CLASS_BLOCK_GROUP_CONTAINER);
  }

  static isBlockDescArea(element) {
    return element.classList.contains(BlockBuilder.CLASS_BLOCK_DESC);
  }

  static generateRandomBlockId() {
    return `block_${uuidv4()}`;
  }
}
