module.exports = {
  manageSocket(io, socket) {
    socket.on('disconnect', () => {
      console.log('new user conected: ' + socket.id)
    })

    socket.emit('userConnected')

    socket.on('joinToSession', (room, guest) => {
      socket.join(room)
      io.to(room).emit('newGuestOn', guest)
    })

    socket.on('iniciarGravacao', (room) => {
      io.to(room).emit('iniciarGravacao')
    })

    socket.on('finalizarGravacao', (room) => {
      io.to(room).emit('finalizarGravacao')
    })
  }
}
