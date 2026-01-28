import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ar" dir="rtl">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#F59E0B" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
