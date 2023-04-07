# p5.js x Orca

Send OSC messages from Orca to p5.js using a simple Express server w/ Socket.IO.

## Sending OSC from Orca

Send OSC messages from [Orca](https://github.com/hundredrabbits/Orca) using the default port (49162) using the `=` operator.

Example Orca sketch sending three random values to path `/a`

```
..4Rv.4Rv.4Rv
.2Z6.2Z8.2Zg.
0Vb.1Vg.2Vb..
.............
.D1..........
.*...........
.J..3K012....
.*Y*=abgb....

```

## Running the Express server (Node.js)

First, install all dependencies for the Node.js script by running

```
yarn install
```
or
```
npm install
```

Then, start the Express server by running

```
node server.js
```
The Express server runs on HTTP port 3000 and listens for OSC messages from Orca on OSC port 49162.

Whenever an OSC message is received by the Node.js script, it ignores the path (e.g. `/a`) and sends the received array of values to the p5.js sketch using Socket.IO.

To simplify processing of the received data in p5.js, Orca's values (Base36) are normalized to values between 0 and 1 before sending them to the p5.js sketch.

## Load the p5.js sketch

Open your browser and navigate to `http://localhost:3000`. 

Enjoy! 🚀
