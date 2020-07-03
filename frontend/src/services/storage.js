export const addToStorage = (key, value, isSession) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  if (isSession) {
    sessionStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, value)
  }
}

export const getFromStorage = (key, isJson = false) => {
  const fromLocalStorage = isJson ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)

  const fromSessionStorage = isJson ? JSON.parse(sessionStorage.getItem(key)) : sessionStorage.getItem(key)

  return fromLocalStorage ? fromLocalStorage : fromSessionStorage
}

export const removeFromStorage = (key) => {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}
