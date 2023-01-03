import {FC, createContext, useContext, useRef} from 'react'
import {WithChildren} from '../../_metronic/helpers'

import {FirebaseApp, initializeApp} from 'firebase/app'
import {Analytics, getAnalytics, logEvent} from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyC-ORA7WiPrnzeH2mkn8mZqCM1djhyu17M',
  authDomain: 'investiment-ba4f2.firebaseapp.com',
  projectId: 'investiment-ba4f2',
  storageBucket: 'investiment-ba4f2.appspot.com',
  messagingSenderId: '485056097451',
  appId: '1:485056097451:web:14f0fb0fbb788584551bee',
  measurementId: 'G-QXJ1N1R3Q4',
}

const initFirebaseContextPropsState = {
  registerEvent: () => {},
}

const FirebaseContext = createContext<any>(initFirebaseContextPropsState)

const useFirebase = () => {
  return useContext(FirebaseContext)
}

const FirebaseProvider: FC<WithChildren> = ({children}) => {
  const app = useRef<FirebaseApp>(initializeApp(firebaseConfig))
  const analytics = useRef<Analytics>(getAnalytics(app.current))

  const registerEvent = (event: string, params: {} | undefined): void => {
    logEvent(analytics.current, event, params)
  }

  return <FirebaseContext.Provider value={{registerEvent}}>{children}</FirebaseContext.Provider>
}

export {useFirebase, FirebaseProvider}
