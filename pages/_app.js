import { Provider } from 'react-redux';
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify';

import { wrapper } from '../store/store'
import { Navbar } from '../components'
import { ProviderContext } from '../constants/context/context'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ProviderContext>
        <main className={`${poppins.variable}`}>
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-left"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </main>
      </ProviderContext>
    </Provider>
  )
}
