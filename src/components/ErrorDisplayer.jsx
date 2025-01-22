const ErrorComp = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 text-red-800 max-w-sm w-full shadow-lg">
        <p className="text-lg">{message}</p>
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorComp;
