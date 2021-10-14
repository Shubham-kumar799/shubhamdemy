import Image from "next/image";

import FooterTop from "./FooterTop";
import AppLink from "./ui/AppLink";
import logo_blue_cropped from "../public/images/logo_blue_cropped.png";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 mt-10 pb-0">
      <FooterTop />
      <div className="flex flex-col  sm:flex-row mt-6">
        <div className="grid sm:grid-cols-3 md:grid-cols-5 flex-1">
          <div className="flex flex-col ">
            <AppLink title={"About us"} />
            <AppLink title={"Contact us"} />
            <AppLink title={"Send Nudes"} />
            <AppLink title={"Email"} />
            <AppLink title={"Get the app"} />
          </div>
          <div className="flex flex-col ">
            <AppLink title={"Blog"} />
            <AppLink title={"Careers"} />
            <AppLink title={"Work with Us"} />
            <AppLink title={"Affiliate"} />
          </div>
          <div className="flex flex-col">
            <AppLink title={"Terms"} />
            <AppLink title={"Privacy Policy"} />
            <AppLink title={"Customer Care"} />
            <AppLink title={"Money-Back Policy"} />
            <AppLink title={"Become Our Sponsor"} />
          </div>
        </div>
        <div className="flex rounded-full p-4 m-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <Image
            className=""
            src={logo_blue_cropped}
            height={150}
            width={150}
          />
        </div>
      </div>
      <div className="border-t-2 border-white text-lg font-medium flex items-center p-2 justify-center text-white m-2 mb-0">
        All rights reserved (Shubham And Sons , Inc.)
      </div>
    </footer>
  );
};

export default Footer;
