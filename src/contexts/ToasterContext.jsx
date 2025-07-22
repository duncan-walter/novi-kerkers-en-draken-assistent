// Framework dependencies
import {createContext, useContext, useState} from 'react';

// Components
import Toaster from '@components/ui/Toaster/Toaster.jsx';

const ToasterContext = createContext(null);

function ToasterContextProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type) => {
    const toast = {
      id: Math.random(),
      message: message,
      type: type
    };

    setToasts((current) => [...current, toast]);
  };

  const removeToast = (toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const context = {
    showToast: showToast
  }

  return (
    <ToasterContext value={context}>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast}/>
    </ToasterContext>
  );
}

function useToaster() {
  const context = useContext(ToasterContext);

  if (!context) {
    console.error('useToaster must be used within a ToastContextProvider!');
  }

  return context;
}

export default ToasterContextProvider;
// TODO: WebStorm complains about fast refresh not working because of this export, fix it.
export {useToaster};