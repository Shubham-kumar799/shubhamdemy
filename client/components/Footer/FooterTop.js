//components
import AppButton from '../ui/AppButton';

const FooterTop = () => {
  return (
    <div className="text-white">
      <div className="flex flex-col justify-between border-b-2 border-white md:flex-row md:items-center ">
        <div>
          <h1 className="text-white text-3xl">
            Teach the world online and earn money
          </h1>
          <h2 className="text-white text-lg">
            Learn from the best instructor from across the globe
          </h2>
        </div>
        <AppButton title={'Get Started'} />
      </div>
    </div>
  );
};

export default FooterTop;
