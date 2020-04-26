export const addToStorage = (key, value, isSession) => {
  if (isSession) {
    sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getFromStorage = (key) => {
  const fromLocalStorage = localStorage.getItem(key)
  const fromSessionStorage = sessionStorage.getItem(key)

  return fromLocalStorage ? fromLocalStorage : fromSessionStorage
}

export const removeFromStorage = (key) => {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}
