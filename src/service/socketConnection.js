import io from 'socket.io-client';

const url = window.location.href;
console.log('url:', url);
const serverURL = url.includes('localhost') ? 'http://localhost:3000' : 'https://scattegory-server.herokuapp.com';
let socket = io.connect(serverURL);
export default socket;