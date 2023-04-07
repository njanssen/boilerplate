let size;

let heights = Array.from(new Array(3), () => 0.5);
const ys = {};

function setup() {
    socket = io.connect('http://localhost:3000');

    socket.on('connect', function () {
        console.log('Connected to socket server');
    });

    socket.on('data', (path, ...data) => {
        console.log('Orca data', path, data);
        heights = data;
    });

    size = min(windowWidth, windowHeight);
    createCanvas(size, size);
}

function draw() {
    background(220, 220, 220,10);

    noFill();
    strokeWeight((10 * size) / 150);

    ys.y1_prev = ys.y1 ? ys.y1 : 0.5;
    ys.y2_prev = ys.y2 ? ys.y2 : 0.5;
    ys.y3_prev = ys.y3 ? ys.y3 : 0.5;
    ys.y1 = lerp(ys.y1_prev, heights.length >= 1 ? heights[0] : 0.5, 0.3);
    ys.y2 = lerp(ys.y2_prev, heights.length >= 2 ? heights[1] : 0.5, 0.3);
    ys.y3 = lerp(ys.y3_prev, heights.length >= 3 ? heights[2] : 0.5, 0.3);

    stroke(255, 0, 125, 90);
    circle(0.5 * size, ys.y1 * size, 0.45 * size);

    stroke(125, 0, 255, 90);
    circle(0.5 * size, ys.y2 * size, 0.5 * size);

    stroke(0, 125, 255, 90);
    circle(0.5 * size, ys.y3 * size, 0.55 * size);
}
