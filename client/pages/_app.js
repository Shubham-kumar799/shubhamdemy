import 'antd/dist/antd.css';
import '../styles/global.css';

//components
import { Provider } from '../context/index';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
