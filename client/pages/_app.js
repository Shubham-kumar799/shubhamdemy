import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

//components
import TopNav from '../components/TopNav';
import { Provider } from '../context/index';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <TopNav />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
