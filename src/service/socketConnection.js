import io from 'socket.io-client';
import { url } from './config';

let socket = io.connect(url);

export default socket;