import io from 'socket.io-client'
const SOCKET_IO_URL = process.env.REACT_APP_BASE_URL
const socket = io(SOCKET_IO_URL)

export default socket
