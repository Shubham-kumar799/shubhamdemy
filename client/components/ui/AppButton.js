const AppButton = ({ title }) => {
  return (
    <div className=" p-2 m-1 font-medium mr-0 cursor-pointer text-lg border-2 hover:scale-110 transition ease-out duration-700 hover:text-purple-900 hover:border-purple-900 w-max rounded-full">
      {title}
    </div>
  );
};

export default AppButton;
