const LoadingButton = ({ loading }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {loading && (
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin my-2"></div>
      )}
    </div>
  );
};

export default LoadingButton;
