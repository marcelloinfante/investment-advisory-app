import {FC, createContext, useContext, useState, useEffect} from 'react'
import {WithChildren} from '../../_metronic/helpers'

import {FirebaseApp, initializeApp} from 'firebase/app'
import {Analytics, getAnalytics} from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyC-ORA7WiPrnzeH2mkn8mZqCM1djhyu17M',
  authDomain: 'investiment-ba4f2.firebaseapp.com',
  projectId: 'investiment-ba4f2',
  storageBucket: 'investiment-ba4f2.appspot.com',
  messagingSenderId: '485056097451',
  appId: '1:485056097451:web:14f0fb0fbb788584551bee',
  measurementId: 'G-QXJ1N1R3Q4',
}

const FirebaseContext = createContext({})

const useFirebase = () => {
  return useContext(FirebaseContext)
}

const FirebaseProvider: FC<WithChildren> = ({children}) => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>()
  const [analytics, setAnalytics] = useState<Analytics>()

  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    const firebaseAnalytics = getAnalytics(app)

    setFirebaseApp(app)
    setAnalytics(firebaseAnalytics)
  }, [])

  return (
    <FirebaseContext.Provider value={{firebaseApp, analytics}}>{children}</FirebaseContext.Provider>
  )
}

export {useFirebase, FirebaseProvider}
