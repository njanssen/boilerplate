const MIDI_DEVICE = 'IAC Driver Bus 1';
const MIDI_CHANNELS = [1];
const LERP_AMOUNT = 0.1;

let size;
let heights = Array.from(new Array(3), () => 0.5);

const ys = {
    y1_prev: heights[0],
    y2_prev: heights[1],
    y3_prev: heights[2],
};

function setup() {
    WebMidi.enable()
        .then(() => {
            if (WebMidi.inputs.length < 1) {
                console.log('No MIDI device detected');
            } else {
                WebMidi.inputs.forEach((device, index) => {
                    console.log(`Available MIDI device: ${index}: ${device.name}`);
                });

                const orca = WebMidi.getInputByName(MIDI_DEVICE);

                orca.addListener(
                    'controlchange',
                    (e) => {
                        const channel = e.controller.number;
                        const value = e.value;

                        console.log('Orca MIDI ControlChange data', channel, value);
                        heights[channel - 1] = value;
                    },
                    { channels: MIDI_CHANNELS }
                );
            }
        })
        .catch((err) => alert(err));

    size = min(windowWidth, windowHeight);
    createCanvas(size, size);
}

function draw() {
    background(220, 220, 220, 20);

    noFill();
    strokeWeight((10 * size) / 100);

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
