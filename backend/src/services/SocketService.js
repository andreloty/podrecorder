module.exports = {
  manageSocket (socket) {
    console.log('new user conected: ' + socket.id)

    socket.on('disconnect', () => {
      console.log('new user conected: ' + socket.id)
    })

    socket.emit('userConnected')

    socket.on('newGuest', (guest) => {
      socket.emit('newGuestOn', guest)
    })
  }
}
