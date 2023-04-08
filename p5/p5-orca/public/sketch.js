const LERP_AMOUNT = 0.1;

let size;
let heights = Array.from(new Array(3), () => 0.5);

const ys = {
    y1_prev: heights[0],
    y2_prev: heights[1],
    y3_prev: heights[2]
};

function setup() {
    socket = io.connect('http://localhost:3000');

    socket.on('connect', function () {
        console.log('Connected to socket server');
    });

    socket.on('data', (path, ...data) => {
        console.log('Orca data', path, data);
        data = data.slice(0,height.length);
        heights.splice(0,data.length,...data);
    });

    size = min(windowWidth, windowHeight);
    createCanvas(size, size);
}

function draw() {
    background(220, 220, 220, 8);

    noFill();
    strokeWeight((10 * size) / 150);    

    ys.y1 = lerp(ys.y1_prev, heights[0], LERP_AMOUNT);
    ys.y2 = lerp(ys.y2_prev, heights[1], LERP_AMOUNT);
    ys.y3 = lerp(ys.y3_prev, heights[2], LERP_AMOUNT);

    stroke(255, 0, 125, 90);
    circle(0.5 * size, ys.y1 * size, 0.45 * size);

    stroke(125, 0, 255, 90);
    circle(0.5 * size, ys.y2 * size, 0.5 * size);

    stroke(0, 125, 255, 90);
    circle(0.5 * size, ys.y3 * size, 0.55 * size);

    ys.y1_prev = ys.y1;
    ys.y2_prev = ys.y2;
    ys.y3_prev = ys.y3;
}
