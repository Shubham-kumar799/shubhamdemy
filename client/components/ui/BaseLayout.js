import TopNav from '../TopNav';
import Footer from '../Footer';

const BaseLayout = ({ children, nostyles }) => {
  console.log('no styles', nostyles);
  return (
    <>
      <TopNav />
      {nostyles ? (
        <div>{children}</div>
      ) : (
        <div className="py-16  overflow-hidden min-h-screen">
          <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BaseLayout;
