import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url : any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return {
    isLoading,
    data,
    error
  };
};

export default useFetch;