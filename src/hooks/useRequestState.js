// Framework dependencies
import {useEffect, useState} from 'react';

// Custom hooks
import useAbortableRequest from './useAbortableRequest.js';

function useRequestState(request, options = {executeOnMount: false, isAbortable: false}) {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortableRequest = useAbortableRequest(request);
  request = options.isAbortable ? abortableRequest : request;

  const executeRequest = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await request(payload);
      setStatusCode(response.status);
      setData(response.data);
    } catch (e) {
      if (e.code !== 'ERR_CANCELED') {
        setStatusCode(e.response.status);
        setError('Er is iets misgegaan bij het verwerken van je verzoek. Probeer het later opnieuw.');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (options.executeOnMount) {
      executeRequest();
    }
  }, []);

  return {data, statusCode, loading, error, executeRequest};
}

export default useRequestState;