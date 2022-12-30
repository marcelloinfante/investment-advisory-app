const CURRENT_ASSET_LOCAL_STORAGE_KEY = 'current-asset'
const getAssetFromLocalStorage = (): string | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(CURRENT_ASSET_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const asset: string = JSON.parse(lsValue) as string
    if (asset) {
      return asset
    }
  } catch (error) {
    console.error('CURRENT ASSET LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAssetFromLocalStorage = (asset: string) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(asset)
    localStorage.setItem(CURRENT_ASSET_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('CURRENT ASSET LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAssetFromLocalStorage = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(CURRENT_ASSET_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('CURRENT ASSET LOCAL STORAGE REMOVE ERROR', error)
  }
}

export {
  getAssetFromLocalStorage,
  setAssetFromLocalStorage,
  removeAssetFromLocalStorage,
  CURRENT_ASSET_LOCAL_STORAGE_KEY,
}
