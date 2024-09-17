import BlockBuilder from "./blockBuilder";

export default class Block {
  constructor() {
    this.builder = new BlockBuilder();
  }

  reconstruct(blockData, styleAs) {
    const fnCreate =
      "create" +
      blockData.name.charAt(0).toUpperCase() +
      blockData.name.slice(1);

    const block = this[fnCreate](blockData);

    if (blockData.children) {
      const children = blockData.children.map((children) =>
        this.reconstruct(children, styleAs)
      );

      children.forEach((c) => {
        BlockBuilder.appendInGroup(block, c);
      });
    }

    return styleAs(block);
  }

  static styleStatement(block) {
    return BlockBuilder.style(block, "statement", "script");
  }

  static styleScript(block) {
    return BlockBuilder.style(block, "script", "statement");
  }

  createHideTurtle(data) {
    return this.builder.createBlock({
      name: "HideTurtle",
      text: "Hide Turtle",
      ...(data ?? {}),
    });
  }

  createGotoCenter(data) {
    return this.builder.createBlock({
      name: "gotoCenter",
      text: "Back to Center",
      ...(data ?? {}),
    });
  }

  createPenUp(data) {
    return this.builder.createBlock({
      name: "penUp",
      text: "Pen Up",
      ...(data ?? {}),
    });
  }

  createPenDown(data) {
    return this.builder.createBlock({
      name: "penDown",
      text: "Pen Down",
      ...(data ?? {}),
    });
  }

  createLeft(data) {
    return this.builder.createBlock({
      name: "left",
      text: "Left __REPL__ degress",
      value: 90,
      ...(data ?? {}),
    });
  }

  createRight(data) {
    return this.builder.createBlock({
      name: "right",
      text: "Right __REPL__ degress",
      value: 90,
      ...(data ?? {}),
    });
  }

  createBack(data) {
    return this.builder.createBlock({
      name: "back",
      text: "Back __REPL__ steps",
      value: 100,
      ...(data ?? {}),
    });
  }

  createForward(data) {
    return this.builder.createBlock({
      name: "forward",
      text: "Forward __REPL__ steps",
      value: 100,
      ...(data ?? {}),
    });
  }

  createCircle(data) {
    return this.builder.createBlock({
      name: "circle",
      text: "Circle __REPL__",
      value: 20,
      ...(data ?? {}),
    });
  }

  createRepeat(data) {
    const block = this.builder.createBlock({
      name: "repeat",
      text: "Repeat __REPL__",
      value: 10,
      ...(data ?? {}),
    });

    this.builder.addBlockGroup(block);

    return block;
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
