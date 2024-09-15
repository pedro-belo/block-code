const geometry = {
  rotate(vector, angle) {
    const radians = this.degToRad(angle);
    const sin0 = Math.sin(radians);
    const cos0 = Math.cos(radians);

    return {
      x: cos0 * vector.x + -sin0 * vector.y,
      y: sin0 * vector.x + cos0 * vector.y,
    };
  },

  degToRad(deg) {
    return (deg * Math.PI) / 180;
  },

  drawLine(context, x, y, x1, y1) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x1, y1);
    context.stroke();
  },

  drawCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, this.degToRad(0), this.degToRad(360), true);
    context.stroke();
  },
};

const file = {
  async toJson(file) {
    const textContent = await file.text();
    const data = JSON.parse(textContent);
    return data;
  },
};

const util = {
  file: file,
  geometry: geometry,
};

export default util;
