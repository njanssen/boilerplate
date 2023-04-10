import osc from 'osc';
import { EventEmitter } from 'events';

class Orca extends EventEmitter {
    constructor() {
        super();

        const udpPort = new osc.UDPPort({
            localAddress: '127.0.0.1',
            localPort: 49162,
        });

        udpPort.open();

        udpPort.on('ready', () => {
            console.log('OSC ready');
        });

        udpPort.on('message', (packet) => {
            this.handleMessage(packet);
        });

        udpPort.on('bundle', (bundle) => {
            for (let packet of bundle.packets) {
                this.handleMessage(packet);
            }
        });

        udpPort.on('error', (err) => {
            console.log('OSC error', err);
        });
    }

    handleMessage = (packet) => {
        const normalize = (min, max) => {
            var delta = max - min;
            return (val) => {
                return (val - min) / delta;
            };
        };

        const { address, args } = packet;
        console.log('OSC message', address, args);        

        const path = address.replace('/','')
        const data = args.map(normalize(0, 35));
        console.log('Emitting Orca data', path, args);        

        this.emit('data', path,...data)
    };
}

export default new Orca();
