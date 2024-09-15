export default class Script {
  constructor(scripts) {
    this.scripts = scripts;
  }

  #extractValue(block) {
    const input = block.querySelector("input");
    return parseInt(input.value);
  }

  #extractChildren(block) {
    const items = block.querySelector(".block__group span");
    return [...items.children].map((el) => this.createScriptItem(el));
  }

  createScriptItem(block) {
    const scriptItem = { name: block.dataset.name };

    if (block.querySelector("input") !== null)
      scriptItem.value = this.#extractValue(block);

    if (block.querySelector(".block__group") !== null)
      scriptItem.children = this.#extractChildren(block);

    return scriptItem;
  }

  generate() {
    return [...this.scripts.children].map((block) =>
      this.createScriptItem(block)
    );
  }

  run(cpu, cursor, space) {
    const result = this.generate();
    result.forEach((script) => {
      cpu.execute(script, cursor, space);
    });
  }

  download() {
    const sourceCode = this.generate();
    const sourceCodeAsText = JSON.stringify(sourceCode);

    const file = new File([sourceCodeAsText], "script.json", {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  addScript(block) {
    this.scripts.appendChild(block);
  }

  clean() {
    [...this.scripts.children].forEach((script) => script.remove());
  }
}
