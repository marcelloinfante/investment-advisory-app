const CURRENT_CLIENT_LOCAL_STORAGE_KEY = 'current-client'
const getClient = (): string | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(CURRENT_CLIENT_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const client: string = JSON.parse(lsValue) as string
    if (client) {
      return client
    }
  } catch (error) {
    console.error('CURRENT CLIENT LOCAL STORAGE PARSE ERROR', error)
  }
}

const setClient = (client: string) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(client)
    localStorage.setItem(CURRENT_CLIENT_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('CURRENT CLIENT LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeClient = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(CURRENT_CLIENT_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('CURRENT CLIENT LOCAL STORAGE REMOVE ERROR', error)
  }
}

export {getClient, setClient, removeClient, CURRENT_CLIENT_LOCAL_STORAGE_KEY}
