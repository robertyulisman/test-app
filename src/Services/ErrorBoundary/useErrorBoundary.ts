const useErrorBoundary = () => {
  const errorHandler = async (error: Error) => {
    const message = error.message;

    console.log('message', message);
  };
  return { errorHandler };
};

export default useErrorBoundary;
