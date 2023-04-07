let size;
let heights = Array.from(new Array(3),() => 0.5);

function setup() {
    socket = io.connect('http://localhost:3000');

    socket.on('connect', function () {
        console.log('Connected to socket server');
    });

    socket.on('data', (path,...data) => {
        console.log('Orca data',path, data);
        heights = data;
    });

    size = min(windowWidth, windowHeight);
    createCanvas(size, size);
}
function draw() {
    background(255, 125, 0);

    noFill();
    strokeWeight((10 * size) / 200);

    let y1 = heights.length >= 1 ? heights[0] : 0.5;
    let y2 = heights.length >= 2 ? heights[1] : 0.5;
    let y3 = heights.length >= 3 ? heights[2] : 0.5;

    stroke(255, 0, 125);
    circle(0.25 * size, y1 * size, 0.15 * size);

    stroke(125, 0, 255);
    circle(0.5 * size, y2 * size, 0.15 * size);

    stroke(0, 125, 255);
    circle(0.75 * size, y3 * size, 0.15 * size);
}
