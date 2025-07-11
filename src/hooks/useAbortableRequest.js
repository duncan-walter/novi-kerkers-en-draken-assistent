import {useEffect, useRef} from 'react';

// This hook exists to make requests easier to cancel.
// return () => { abortController.signal } and the initialization of the abortController do not have to be called in every useEffect as it is contained in here.
function useAbortableRequest(request) {
  const abortController = useRef(null);

  useEffect(() => {
    abortController.current = new AbortController();

    return () => {
      abortController.current.abort();
    }
  }, []);

  return async (...args) => {
    return request(...args, abortController.current.signal);
  }
}

export default useAbortableRequest;