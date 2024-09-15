import "../node_modules/material-icons/iconfont/material-icons.scss";
import "./scss/main.scss";

import BlockCode from "./blockCode";
import Block from "./block";
import Script from "./script";
import CPU from "./CPU";
import PageElements from "./PageElements";
import DragAndDrop from "./dragAndDrop";
import util from "./util";

let blockCode = new BlockCode();
const script = new Script(PageElements.script);
const block = new Block();

function populateStatementsArea() {
  block.addStatement(block.createRepeat(), PageElements.statements);
  block.addStatement(block.createLeft(), PageElements.statements);
  block.addStatement(block.createRight(), PageElements.statements);
  block.addStatement(block.createForward(), PageElements.statements);
  block.addStatement(block.createBack(), PageElements.statements);
  block.addStatement(block.createCircle(), PageElements.statements);
  block.addStatement(block.createPenUp(), PageElements.statements);
  block.addStatement(block.createPenDown(), PageElements.statements);
  block.addStatement(block.createGotoCenter(), PageElements.statements);
  block.addStatement(block.createHideTurtle(), PageElements.statements);
}

function setupBtnRunScript() {
  PageElements.btnRunScript.addEventListener("click", () => {
    blockCode.cursor.reset();
    blockCode.space.clean();
    script.run(new CPU(), blockCode.cursor, blockCode.space);
  });
}

function setupBtnReset() {
  PageElements.btnResetApp.addEventListener("click", function () {
    blockCode.cursor.reset();
    blockCode.space.clean();
    script.clean();

    blockCode = new BlockCode();
    blockCode.init();
  });
}

function setupBtnDownload() {
  PageElements.btnDownloadScript.addEventListener("click", function () {
    script.download();
  });
}

function setupUploadScript() {
  PageElements.uploadScriptInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const data = util.file.toJson(file);

    data
      .then((items) => {
        items.forEach((item) => {
          script.addScript(block.reconstruct(item, Block.styleScript));
        });
      })
      .catch((error) => {
        console.error("Error processing data:", error);
      });
  });
}

function setupBtnUploadScript() {
  PageElements.btnUploadScript.addEventListener("click", function () {
    PageElements.uploadScriptInput.click();
  });
}

window.addEventListener("load", function () {
  // Setup cursor and pen
  blockCode.init();

  const dragAndDrop = new DragAndDrop(PageElements.script);
  dragAndDrop.init();

  // Populate Statements Section
  populateStatementsArea();

  // Buttons...
  setupBtnRunScript();
  setupBtnReset();
  setupBtnDownload();

  setupUploadScript();
  setupBtnUploadScript();
});
