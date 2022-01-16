import 'antd/dist/antd.css';
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
