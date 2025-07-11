/* This file was the start of implementing get requests with a build in state for data, loading and error.
 * It never saw the light of day as to me, it felt like this should be implemented in a generic way for all types of requests.
 * This was a nice starting point however and that's why I think it still deserves to be archived for later reference.
 * The useAbortableRequest hook that is used in this hook, provides the request with a signal from the AbortController.
 */
import {useEffect, useState} from "react";
import useAbortableRequest from "../src/hooks/useAbortableRequest.js";

function useGetRequest(client, endpoint, params = {}, isAbortable = false) {
  const [data, setData] = useState(null);
  const [loading, toggleLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestWithAbort = (abortSignal) => {
    return client.get(endpoint, {...params, ...(abortSignal && {signal: abortSignal})});
  }

  const requestWithoutAbort = () => client.get(endpoint, {params});

  const request = useAbortableRequest(isAbortable ? requestWithAbort : requestWithoutAbort);

  useEffect(() => {
    toggleLoading(true);
    setError(null);

    const runRequest = async () => {
      try {
        const result = await request();
        setData(result.data);
      } catch (e) {
        if (e.code !== 'ERR_CANCELED') {
          setError('Er ging iets mis tijdens het ophalen van de gegevens.');
        }
      } finally {
        toggleLoading(false);
      }
    };

    runRequest();
  }, []);

  return {data, loading, error};
}

export default useGetRequest;