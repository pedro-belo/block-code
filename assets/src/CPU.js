import util from "./util";

export default class CPU {
  _left(command, cursor, space) {
    cursor.direction = (cursor.direction + command.value) % 360;
    cursor.updateIcon();
  }

  _right(command, cursor, space) {
    cursor.direction = (cursor.direction - command.value) % 360;
    cursor.updateIcon();
  }

  _back(command, cursor, space) {
        // adjust cursor in relation to canvas
    const reverseDirection = cursor.direction * -1;

    // Calculating vector for next position
    const vector = { x: command.value, y: 0 };
    const point = util.geometry.rotate(vector, reverseDirection);

    // Limiting cursor moviments to (canvas.width, canvas.height)
    const endingPointX = Math.min(
      Math.max(cursor.position.x - point.x, cursor.getWidth() / 2),
      space.width - cursor.getWidth() / 2
    );

    const endingPointY = Math.min(
      Math.max(cursor.position.y - point.y, cursor.getHeight() / 2),
      space.height - cursor.getHeight() / 2
    );

    if (cursor.getPenEnabled()) {
      util.geometry.drawLine(
        space.context,
        cursor.position.x,
        cursor.position.y,
        endingPointX,
        endingPointY
      );
    }

    cursor.position.x = endingPointX;
    cursor.position.y = endingPointY;

    cursor.updateIcon();
  }

  _forward(command, cursor, space) {

    // adjust cursor in relation to canvas
    const reverseDirection = cursor.direction * -1;

    // Calculating vector for next position
    const vector = { x: command.value, y: 0 };
    const point = util.geometry.rotate(vector, reverseDirection);

    // Limiting cursor moviments to (canvas.width, canvas.height)
    const endingPointX = Math.max(
      Math.min(
        cursor.position.x + point.x,
        space.width - cursor.getWidth() / 2
      ),
      cursor.getWidth() / 2
    );

    const endingPointY = Math.max(
      Math.min(
        cursor.position.y + point.y,
        space.height - cursor.getHeight() / 2
      ),
      cursor.getHeight() / 2
    );

    if (cursor.getPenEnabled()) {
      util.geometry.drawLine(
        space.context,
        cursor.position.x,
        cursor.position.y,
        endingPointX,
        endingPointY
      );
    }

    cursor.position.x = endingPointX;
    cursor.position.y = endingPointY;

    cursor.updateIcon();
  }

  _circle(command, cursor, space) {
    if (cursor.getPenEnabled()) {
      util.geometry.drawCircle(
        space.context,
        cursor.position.x,
        cursor.position.y,
        command.value
      );
    }
  }

  _penUp(command, cursor, space) {
    cursor.setPenEnabled(false);
  }

  _penDown(command, cursor, space) {
    cursor.setPenEnabled(true);
  }

  _gotoCenter(command, cursor, space) {
    cursor.position.x = space.width / 2;
    cursor.position.y = space.height / 2;
    cursor.updateIcon();
  }

  _HideTurtle(command, cursor, space) {
    cursor.visibilityToggle();
    cursor.updateIcon();
  }

  _repeat(command, cursor, space) {
    const thisObj = this;
    for (let i = 0; i < command.value; i++) {
      command.children.forEach((c) => {
        thisObj.execute(c, cursor, space);
      });
    }
  }

  execute(command, cursor, space) {
    const instructions = {
      repeat: "_repeat",
      left: "_left",
      right: "_right",
      back: "_back",
      forward: "_forward",
      circle: "_circle",
      penUp: "_penUp",
      penDown: "_penDown",
      gotoCenter: "_gotoCenter",
      HideTurtle: "_HideTurtle",
    };
    const instructionName = instructions[command.name];

    if (instructionName === undefined) {
      throw new Error("Instruction unknown");
    }

    return this[instructionName](command, cursor, space);
  }
}
