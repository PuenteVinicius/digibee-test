import { MOCK_OPTIONS, SERVER_OPTIONS } from "@/constants";
import { MockOption } from "@/types";
import { useState, useCallback, useEffect } from "react";

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
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock correct answer 90% of times
      if (Math.random() > 0.1) {
        setMockOptions(MOCK_OPTIONS);
        return MOCK_OPTIONS;
      } else {
        throw new Error("Error on retrieve data");
      }
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
        // Mock network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock correct answer 90% of times
        if (Math.random() > 0.2) {
          return {
            success: true,
            message: "success on sending data",
            data: {
              ...data,
              serverOptions: SERVER_OPTIONS,
              createdAt: new Date().toISOString(),
            },
          };
        } else {
          throw new Error("Error on send data");
        }
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
