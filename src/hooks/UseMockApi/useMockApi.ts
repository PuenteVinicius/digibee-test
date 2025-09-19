import Mock from '@/features/test-case-hub/components/levels/MockConfigurationLevel/contants';
import { useState, useCallback, useEffect } from 'react'
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Dados fictícios para o select
const mockSelectOptions: Mock[] = [
  { id: "1", name: "Session Management", svgPath: "HTTP" },
  { id: "2", name: "Rest V2 (HTTP / APIs)", svgPath: "DB" },
  { id: "3", name: "Session Management", svgPath: "FS" },
  { id: "4", name: "Transformer (JOLT)", svgPath: "FS" },
];

export const useMockApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectOptions, setSelectOptions] = useState<Mock[]>([]);

  // Simula um GET para buscar opções do select
  const fetchSelectOptions = useCallback(async (): Promise<Mock[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula resposta bem-sucedida 90% das vezes
      if (Math.random() > 0.1) {
        setSelectOptions(mockSelectOptions);
        return mockSelectOptions;
      } else {
        throw new Error('Falha ao carregar opções');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Simula um POST para enviar dados
  const postData = useCallback(async (data: Mock): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simula resposta bem-sucedida 80% das vezes
      if (Math.random() > 0.2) {
        return {
          success: true,
          message: 'Dados enviados com sucesso!',
          data: {
            ...data,
            createdAt: new Date().toISOString()
          }
        };
      } else {
        throw new Error('Falha no envio dos dados');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no envio';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega as opções automaticamente quando o hook é inicializado
  useEffect(() => {
    fetchSelectOptions();
  }, [fetchSelectOptions]);

  return {
    loading,
    error,
    selectOptions,
    fetchSelectOptions,
    postData,
    refetchOptions: fetchSelectOptions
  };
};