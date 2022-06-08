//components
import Image from 'next/image';
import FooterTop from './FooterTop';
import AppLink from './ui/AppLink';

//utils
import { useContext } from 'react';
import logo_blue_cropped from '../public/images/logo_blue_cropped.png';
import { Context } from '../context';

const Footer = () => {
  const {
    state: { user },
  } = useContext(Context);
  if (user) return null;
  return (
    <footer className="flex  flex-col bg-gradient-to-r from-purple-400 via-pink-500 items-center to-red-500 p-4 mt-10 pb-0">
      <div className="sm:min-w-full 3xl:min-w-min  max-w-screen-2xl">
        <FooterTop />
        <div className="flex flex-col  sm:flex-row mt-6">
          <div className="flex flex-col sm:grid sm:grid-cols-3 md:grid-cols-5 ">
            <div className="flex sm:items-baseline  items-center  flex-col ">
              <AppLink title={'About us'} />
              <AppLink title={'Contact us'} />
              <AppLink title={'Email'} />
              <AppLink title={'Get the app'} />
            </div>
            <div className="sm:items-baseline flex items-center flex-col ">
              <AppLink title={'Blog'} />
              <AppLink title={'Careers'} />
              <AppLink title={'Work with Us'} />
              <AppLink title={'Affiliate'} />
            </div>
            <div className="flex sm:items-baseline items-center flex-col">
              <AppLink title={'Terms'} />
              <AppLink title={'Privacy Policy'} />
              <AppLink title={'Customer Care'} />
              <AppLink title={'Money-Back Policy'} />
              <AppLink title={'Become Our Sponsor'} />
            </div>
          </div>
          <div className="flex sm:justify-end flex-1  justify-center p-4 m-1 ">
            <Image src={logo_blue_cropped} height={150} width={150} />
          </div>
        </div>
        <div className="border-t-2 border-white text-lg font-medium  p-2 text-center text-white m-2 mb-0">
          All rights reserved (Shubham And Sons , Inc.)
        </div>
      </div>
    </footer>
  );
};

export default Footer;
