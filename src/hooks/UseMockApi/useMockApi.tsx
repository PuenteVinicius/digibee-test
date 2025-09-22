import { useState, useCallback, useEffect } from "react";

import { MOCK_OPTIONS, SERVER_OPTIONS } from "@/constants";
import { MockOption } from "@/types";

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useMockApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mockOptions, setMockOptions] = useState<MockOption[]>([]);

  // Simula um GET para buscar opções do select
  const fetchMockOptions = useCallback(async (): Promise<MockOption[]> => {
    setLoading(true);
    setError(null);

    try {
      // Mock correct answer 90% of times
      setMockOptions(MOCK_OPTIONS);

      return MOCK_OPTIONS;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknow error";

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = useCallback(
    async (data: MockOption): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Mock correct answer 90% of times
        return {
          success: true,
          message: "success on sending data",
          data: {
            ...data,
            serverOptions: SERVER_OPTIONS,
            createdAt: new Date().toISOString(),
          },
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknow error";

        setError(errorMessage);

        return {
          success: false,
          message: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchMockOptions();
  }, [fetchMockOptions]);

  return {
    loading,
    error,
    mockOptions,
    fetchMockOptions,
    postData,
    refetchOptions: fetchMockOptions,
  };
};
