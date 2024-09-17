import { v4 as uuidv4 } from "uuid";

const mapNameToAttr = {
  className: "class",
};

function applyStyle(element, baseClass, toAdd, toRemove) {
  element.classList.add(`${baseClass}--${toAdd}`);
  element.classList.remove(`${baseClass}--${toRemove}`);
}

function createElement(tagName, attrs) {
  const element = document.createElement(tagName);

  Object.keys(attrs).forEach((attr) => {
    element.setAttribute(mapNameToAttr[attr] || attr, attrs[attr]);
  });

  return element;
}

function hasClass(element, className) {
  return element.classList.contains(className);
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
  addBlockGroup(block) {
    const blockGroup = createElement("div", {
      className: BlockBuilder.CLASS_BLOCK_GROUP,
    });

    blockGroup.appendChild(
      createElement("span", {
        className: BlockBuilder.CLASS_BLOCK_GROUP_CONTAINER,
      })
    );

    block.appendChild(blockGroup);
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

  createBlock(data) {
    const block = this.#createBaseBlock(data.name);

    if (data.value) {
      const input = this.#createNumberInput(data.value);
      block.blockDesc.innerHTML = this.#embedInputInTemplate(input, data.text);
    } else {
      block.blockDesc.textContent = data.text;
    }

    return block.root;
  }

  static style(block, toAdd, toRemove) {
    // Block
    applyStyle(block, BlockBuilder.CLASS_BLOCK, toAdd, toRemove);

    // Block desc
    const blockDesc = block.querySelector(`.${BlockBuilder.CLASS_BLOCK_DESC}`);
    applyStyle(blockDesc, BlockBuilder.CLASS_BLOCK_DESC, toAdd, toRemove);

    // Block group
    const blockGroup = block.querySelector(
      `.${BlockBuilder.CLASS_BLOCK_GROUP}`
    );
    if (blockGroup) {
      applyStyle(blockGroup, BlockBuilder.CLASS_BLOCK_GROUP, toAdd, toRemove);
    }

    return block;
  }

  static appendInGroup(block, element) {
    block.children[1].children[0].appendChild(element);
  }

  static toJson(block) {
    const blockData = { name: block.dataset.name };

    const input = block.querySelector("input");
    if (input) {
      blockData.value = parseInt(input.value);
    }

    const container = block.querySelector(
      `.${BlockBuilder.CLASS_BLOCK_GROUP_CONTAINER}`
    );
    if (container) {
      blockData.children = [...container.children].map((c) =>
        BlockBuilder.toJson(c)
      );
    }

    return blockData;
  }

  static isBlock(element) {
    return hasClass(element, BlockBuilder.CLASS_BLOCK);
  }

  static isGroupArea(element) {
    return hasClass(element, BlockBuilder.CLASS_BLOCK_GROUP_CONTAINER);
  }

  static isBlockDescArea(element) {
    return hasClass(element, BlockBuilder.CLASS_BLOCK_DESC);
  }

  static generateRandomBlockId() {
    return `block_${uuidv4()}`;
  }
}
