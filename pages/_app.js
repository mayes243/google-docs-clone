import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import Head from 'next/head'
import Router from 'next/router'
import { Provider } from 'next-auth/client'
import '../style.css'
import '../nprogress.css'
import NProgress from 'nprogress';

function MyApp({ Component, pageProps }) {

  NProgress.configure({ showSpinner: false });
  Router.events.on('routeChangeStart', NProgress.start)
  Router.events.on('routeChangeError', NProgress.done)
  Router.events.on('routeChangeComplete', NProgress.done)

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
