import io from 'socket.io-client';
import { localURL } from './config';

const url = process.env.URL || localURL
let socket = io.connect(url);
console.log(url);

export default socket;