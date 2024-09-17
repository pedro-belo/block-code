import BlockBuilder from "./blockBuilder";
import util from "./util";

export default class Script {
  constructor(scripts) {
    this.scripts = scripts;
  }

  createScriptItem(block) {
    return BlockBuilder.toJson(block);
  }

  generate() {
    return [...this.scripts.children].map((block) =>
      this.createScriptItem(block)
    );
  }

  run(cpu, cursor, space) {
    this.generate().forEach((script) => {
      cpu.execute(script, cursor, space);
    });
  }

  download() {
    const sourceCode = this.generate();
    const sourceCodeAsText = JSON.stringify(sourceCode);
    util.file.download(sourceCodeAsText, "script.json");
  }

  addScript(block) {
    this.scripts.appendChild(block);
  }

  clean() {
    [...this.scripts.children].forEach((script) => script.remove());
  }
}
