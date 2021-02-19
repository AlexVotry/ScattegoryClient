import io from 'socket.io-client';
import { URL } from './config';

let socket = io.connect(URL);

export default socket;