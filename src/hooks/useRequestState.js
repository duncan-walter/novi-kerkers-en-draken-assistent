// Framework dependencies
import {useEffect, useState} from 'react';

// Custom hooks
import useAbortableRequest from '@hooks/useAbortableRequest.js';

function useRequestState(request, options = {executeOnMount: false, isAbortable: false}) {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortableRequest = useAbortableRequest(request);
  request = options.isAbortable ? abortableRequest : request;

  const executeRequest = async (payload) => {
    setStatusCode(null);
    setLoading(true);
    setError(null);

    // The following statement is definitely a HACK.
    // At the moment this is here because aborting the request and setting the loading state was not working properly.
    // Either the request could be aborted and the loading = true state was never received in the component that uses this hook OR
    // the loading state = true could be received by the component that uses this hook but the request could not be aborted.
    // TODO: Find a proper way to fix this.
    await Promise.resolve();

    try {
      const response = await request(payload);
      setStatusCode(response.status);
      setData(response.data);

      return response.data;
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