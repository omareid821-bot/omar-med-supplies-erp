import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div dir="rtl">
      <Component {...pageProps} />
      <footer className="footer-dev">تصميم وتطوير: م. عمر عيد | Designed by Eng. Omar Eid</footer>
    </div>
  )
}
