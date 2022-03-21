function init() {
  const canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    return { canvas, ctx };
  }
}

function draw(x) {
  ctx.beginPath();
  tree(x, canvas.height, treeHeight, Math.PI / 2, gDepth);
  ctx.stroke();
}

function tree(x, y, length, theta, depth) {
  if (depth < 1) {
    return;
  }

  const correctionLen = gDepth == depth ? random(2, 2.5) : random(0.2, 1.8);
  const desX = x + length * Math.cos(theta) * correctionLen;
  const desY = y - length * Math.sin(theta) * correctionLen;
  const ang = Math.PI / 180;

  ctx.moveTo(x, y);
  ctx.lineTo(desX, desY);

  tree(
    desX,
    desY,
    length - random(1, 5),
    theta + ang * random(9, 23),
    depth - 1
  );
  tree(
    desX,
    desY,
    length - random(1, 5),
    theta - ang * random(9, 23),
    depth - 1
  );
}

function click(event) {
  console.log(event);
  const { clientX } = event;
  return draw(clientX);
}
function resize() {
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function random(a, b) {
  return Math.random() * (b - a) + a;
}

const treeHeight = 45;
const gDepth = 12;
const { canvas, ctx } = init();

addEventListener("click", click);
addEventListener("resize", resize);

draw();
