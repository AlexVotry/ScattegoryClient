import io from 'socket.io-client';
import { localURL } from './config';

const url = process.env.SERVER_URL || localURL
console.log('url:', url, 'SERVER_URL:', process.env.SERVER_URL);
const serverURL = process.env.NODE_ENV === 'production' ? 'https://scattegory-server.herokuapp.com' : 'http://localhost:3000';
let socket = io.connect(serverURL);
export default socket;