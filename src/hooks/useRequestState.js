// Framework dependencies
import {useEffect, useState} from 'react';

// Custom hooks
import useAbortableRequest from './useAbortableRequest.js';

function useRequestState(request, options = {executeOnMount: false, isAbortable: false}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortableRequest = useAbortableRequest(request);
  request = options.isAbortable ? abortableRequest : request;

  const executeRequest = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      console.log(payload);
      const response = await request(payload);
      setData(response.data);
    } catch (e) {
      if (e.code !== 'ERR_CANCELED') {
        setError({
          message: 'Er is iets misgegaan bij het verwerken van je verzoek. Probeer het later opnieuw.',
          statusCode: e.response.status
        });
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

  return {data, loading, error, executeRequest};
}

export default useRequestState;