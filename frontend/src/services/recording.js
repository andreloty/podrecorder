import api from './api';
import { getFromStorage } from './storage';

export const getActiveSession = async () => {
  try {
    const token = JSON.parse(getFromStorage('@PdR:token'))

    if (!token) {
      return {
        error: { isAuthenticated: false },
        data: null
      }
    }

    const response = await api
      .get(
        '/api/v1/recording/new',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
    return {
      error: null,
      data: response.data
    }
  } catch (error) {
    return {
      error: { isAuthenticated: true, ...error },
      data: null
    }
  }
}
