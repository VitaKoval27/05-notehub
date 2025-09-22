import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  useEffect(() => {
    toast.error(message, {
      position: 'top-right',
    });
  }, [message]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default ErrorMessage;
