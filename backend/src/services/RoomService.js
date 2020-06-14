const { v4: uuidv4 } = require('uuid');
const knex = require('../database/connection')

const recordingTable = 'recording'

module.exports = {
  newSessionId () {
    return uuidv4()
  },

  newSessionCode () {
    return `${Math.floor(100 + Math.random() * 999999)}`.padStart(6, '0')
  },

  async createNewRecordingSession (email) {
    const data = {
      'email': email,
      'session': this.newSessionId(),
      'code': this.newSessionCode(),
      'is_active': true,
      'is_recording': false
    }

    const [id] = await knex(recordingTable).returning('id').insert(data)
    const newRecordingSession = { id, ...data }

    return newRecordingSession
  },

  async getActiveSessionRecording (email) {
    const filter = { 'email': email, 'is_active': true }

    const activeSessionRecording = await knex(recordingTable).where(filter).select('*').first()

    return activeSessionRecording
  },

  async finishActiveSessionRecording (email) {
    const activeSessionRecording = await this.getActiveSessionRecording(email)

    if (activeSessionRecording) {
      await knex(recordingTable).where({ 'id': activeSessionRecording.id }).update({ 'is_active': false, 'is_recording': false })
    }
  }
}
