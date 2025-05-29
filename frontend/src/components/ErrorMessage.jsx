function ErrorMessage({ message }) {
    return (
      <div className="w-full max-w-md bg-red-100 text-red-700 p-4 rounded-lg mb-6">
        {message}
      </div>
    );
  }
  
  export default ErrorMessage;