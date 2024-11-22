import ErrorPage from '@src/Containers/ErrorPage';
import React, { FC } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import useErrorBoundary from './useErrorBoundary';

interface IErrorProviderTypes {
  children: React.ReactElement;
}

const ErrorProvider: FC<IErrorProviderTypes> = ({ children }) => {
  const { errorHandler } = useErrorBoundary();

  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorPage}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorProvider;
