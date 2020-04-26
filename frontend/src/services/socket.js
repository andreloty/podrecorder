import io from 'socket.io-client'
const SOCKET_IO_URL = 'http://localhost:3333'
const socket = io(SOCKET_IO_URL)

export default socket
