import Document, { Html, Head, Main, NextScript } from 'next/document'
import i18nextConfig from '../../next-i18next.config.js'

export default class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap"
            rel="stylesheet"
          />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
