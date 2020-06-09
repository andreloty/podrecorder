/* eslint-disable no-undef */
const roomService = require('../../src/services/RoomService')

const email = 'email@teste.com'

describe('Room services', () => {
  it('should create new recording session in database', async () => {
    const newRecordingSession = await roomService.createNewRecordingSession(email)

    expect(newRecordingSession.email).toBe(email)
  })

  it('should return active session recording from database', async () => {
    const activeSessionRecording = await roomService.getActiveSessionRecording(email)

    expect(activeSessionRecording.id).toBeGreaterThan(0)
    expect(activeSessionRecording.email).toBe(email)
    expect(activeSessionRecording.is_active).toBeTruthy()
  })

  it('should return finish active session recording on database', async () => {
    await roomService.finishActiveSessionRecording(email)

    const activeSessionRecording = await roomService.getActiveSessionRecording(email)

    expect(activeSessionRecording).toBeUndefined()
  })
})
