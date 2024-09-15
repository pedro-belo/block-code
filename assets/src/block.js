import BlockBuilder from "./blockBuilder";

export default class Block {
  constructor() {
    this.builder = new BlockBuilder();
  }

  reconstruct(blockData, styleAs) {
    const fnCreate = {
      HideTurtle: () => this.createHideTurtle(),
      gotoCenter: () => this.createGotoCenter(),
      penUp: () => this.createPenUp(),
      penDown: () => this.createPenDown(),
      left: () => this.createLeft(),
      right: () => this.createRight(),
      back: () => this.createBack(),
      forward: () => this.createForward(),
      circle: () => this.createCircle(),
      repeat: () => this.createRepeat(),
    };

    const block = styleAs(fnCreate[blockData.name]());

    const input = block.querySelector("input");
    if (input !== null) {
      input.value = blockData.value;
    }

    if (Object.prototype.hasOwnProperty.call(blockData, "children")) {
      const children = blockData.children.map((children) =>
        this.reconstruct(children, styleAs)
      );

      children.forEach((children) => {
        block.children[1].children[0].appendChild(children);
      });
    }

    return block;
  }

  static #style(block, toAdd, toRemove) {
    // Block
    block.classList.add(`block--${toAdd}`);
    block.classList.remove(`block--${toRemove}`);

    // Block desc
    const blockDesc = block.querySelector(".block__desc");
    blockDesc.classList.add(`block__desc--${toAdd}`);
    blockDesc.classList.remove(`block__desc--${toRemove}`);

    // Block group
    const blockGroup = block.querySelector(".block__group");
    if (blockGroup !== null) {
      blockGroup.classList.add(`block__group--${toAdd}`);
      blockGroup.classList.remove(`block__group--${toRemove}`);
    }
    return block;
  }

  static styleStatement(block) {
    return Block.#style(block, "statement", "script");
  }
  static styleScript(block) {
    return Block.#style(block, "script", "statement");
  }

  createHideTurtle() {
    return this.builder.createSimpleBlock("HideTurtle", "Hide Turtle");
  }

  createGotoCenter() {
    return this.builder.createSimpleBlock("gotoCenter", "Back to Center");
  }

  createPenUp() {
    return this.builder.createSimpleBlock("penUp", "Pen Up");
  }

  createPenDown() {
    return this.builder.createSimpleBlock("penDown", "Pen Down");
  }

  createLeft() {
    return this.builder.createNumericBlock("left", "Left __REPL__ degress", 90);
  }

  createRight() {
    return this.builder.createNumericBlock(
      "right",
      "Right __REPL__ degress",
      90
    );
  }

  createBack() {
    return this.builder.createNumericBlock("back", "Back __REPL__ steps", 100);
  }

  createForward() {
    return this.builder.createNumericBlock(
      "forward",
      "Forward __REPL__ steps",
      100
    );
  }

  createCircle() {
    return this.builder.createNumericBlock("circle", "Circle __REPL__", 20);
  }

  createRepeat() {
    return this.builder.createNumericGroup("repeat", "Repeat __REPL__", 10);
  }

  static clone(block) {
    const clone = block.cloneNode(true);
    clone.setAttribute("id", BlockBuilder.generateRandomBlockId());

    clone.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", this.id);
      event.stopPropagation();
    });

    return clone;
  }

  addStatement(block, statements) {
    Block.styleStatement(block);

    block.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", this.id);
    });

    statements.appendChild(block);
  }
}
