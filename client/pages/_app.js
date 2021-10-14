import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "../components/TopNav";
import { Provider } from "../context/index";
import NewNav from "../components/NewNav";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <TopNav />
      {/* <NewNav /> */}
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
