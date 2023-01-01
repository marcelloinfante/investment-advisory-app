const CURRENT_SIMULATION_LOCAL_STORAGE_KEY = 'current-simulation'
const getSimulationFromLocalStorage = (): string | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(CURRENT_SIMULATION_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const simulation: string = JSON.parse(lsValue) as string
    if (simulation) {
      return simulation
    }
  } catch (error) {
    console.error('CURRENT SIMULATION LOCAL STORAGE PARSE ERROR', error)
  }
}

const setSimulationFromLocalStorage = (simulation: string) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(simulation)
    localStorage.setItem(CURRENT_SIMULATION_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('CURRENT SIMULATION LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeSimulationFromLocalStorage = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(CURRENT_SIMULATION_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('CURRENT SIMULATION LOCAL STORAGE REMOVE ERROR', error)
  }
}

export {
  getSimulationFromLocalStorage,
  setSimulationFromLocalStorage,
  removeSimulationFromLocalStorage,
  CURRENT_SIMULATION_LOCAL_STORAGE_KEY,
}
