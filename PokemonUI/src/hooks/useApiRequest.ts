import { useState, useCallback } from "react";
import UseEcpApi from "../config/api";

export default function useApiRequest() {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiRequest = useCallback(async (method, url, values?, token?, type?) => {
    try {
      setError(false);
      setIsProcessing(true);
      const result = await UseEcpApi(method, url, values, token, type);
      setResponse(result);
      setIsProcessing(false);
      return result;
    } catch (err) {
      setError(true);
      setIsProcessing(false);
      throw err;
    }
  }, []);

  return { apiRequest, response, error, setError, isProcessing, errorMessage, setErrorMessage };
}
