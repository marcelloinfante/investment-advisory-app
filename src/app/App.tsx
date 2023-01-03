import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'

import {InvestimentProvider} from '../app/context/Investiment'
import {FirebaseProvider} from '../app/context/Firebase'

import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <FirebaseProvider>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <InvestimentProvider>
                <Outlet />
                <MasterInit />
              </InvestimentProvider>
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </FirebaseProvider>
    </Suspense>
  )
}

export {App}
