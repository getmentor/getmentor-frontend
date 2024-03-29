import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import React, { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { reactPlugin } from '../lib/appinsights'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { NextUIProvider } from '@nextui-org/react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NBGRPCZ' })
  }, [])

  const TEST = process.env.NEXT_PUBLIC_TESTING_MODE

  if (TEST === 'on') {
    return (
      <>
        <Component {...pageProps} />
        <ToastContainer />
      </>
    )
  }

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <NextUIProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </NextUIProvider>
    </AppInsightsContext.Provider>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
