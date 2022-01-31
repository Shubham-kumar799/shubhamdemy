import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = ({ url, method, headers = null }) => {
  const [res, setRes] = useState({ data: null, error: null, loading: false });
  // You POST method here
  const API = useCallback(
    ({ body = null }) => {
      setRes(prevState => ({ ...prevState, loading: true }));
      axios[method](url, body)
        .then(response => {
          setRes({ data: response.data, loading: false, error: null });
        })
        .catch(error => {
          setRes({ data: null, loading: false, error });
        });
    },
    [url, JSON.stringify(headers)]
  );
  return [res, API];
};

export default useApi;
