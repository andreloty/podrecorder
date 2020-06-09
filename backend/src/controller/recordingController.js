const roomService = require('../services/RoomService')
const userService = require('../services/UserService')

module.exports = {
  async newRecording (req, res) {
    const { email } = userService.getUserInfo(req.headers.authorization)

    try {
      const activeRecordingSession = await roomService.getActiveSessionRecording(email)

      if (activeRecordingSession) {
        return res.status(200).json(activeRecordingSession)
      }

      const newRecordingSession = await roomService.createNewRecordingSession(email)

      return res.status(200).json(newRecordingSession)
    } catch (error) {
      if (error.message.indexOf('recording_email') > 0) {
        return res
          .status(400)
          .json({ msg: 'Já existe uma sessão ativa para este usuário!' })
      }

      return res.status(500).json({ msg: 'Erro desconhecido!' })
    }
  }
}
