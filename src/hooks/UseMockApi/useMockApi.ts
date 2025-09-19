import { useState, useCallback, useEffect } from "react";
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
export interface MockOption {
  id: string;
  label: string;
  svgPath?: string;
}

export interface ServerOption {
  id: string;
  label: string;
  createdAt?: Date;
}

// Dados fictícios para o select
export const MOCK_OPTIONS: MockOption[] = [
  { id: "1", label: "Session Management", svgPath: "HTTP" },
  { id: "2", label: "Rest V2 (HTTP / APIs)", svgPath: "DB" },
  { id: "3", label: "Session Management", svgPath: "FS" },
  { id: "4", label: "Transformer (JOLT)", svgPath: "FS" },
];

export const SERVER_OPTIONS: ServerOption[] = [
  { id: "1", label: "Mocked response name #1", createdAt: new Date() },
  { id: "2", label: "Mocked response name #2", createdAt: new Date() },
];

export const useMockApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mockOptions, setMockOptions] = useState<MockOption[]>([]);

  // Simula um GET para buscar opções do select
  const fetchMockOptions = useCallback(async (): Promise<MockOption[]> => {
    setLoading(true);
    setError(null);

    try {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simula resposta bem-sucedida 90% das vezes
      if (Math.random() > 0.1) {
        setMockOptions(MOCK_OPTIONS);
        return MOCK_OPTIONS;
      } else {
        throw new Error("Falha ao carregar opções");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Simula um POST para enviar dados
  const postData = useCallback(async (data: MockOption): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);

    try {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simula resposta bem-sucedida 80% das vezes
      if (Math.random() > 0.2) {
        return {
          success: true,
          message: "Dados enviados com sucesso!",
          data: {
            ...data,
            serverOptions: SERVER_OPTIONS,
            createdAt: new Date().toISOString(),
          },
        };
      } else {
        throw new Error("Falha no envio dos dados");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro no envio";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega as opções automaticamente quando o hook é inicializado
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
