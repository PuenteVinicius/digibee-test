import { useState, useCallback, useEffect } from 'react';

// Tipos para os dados
export interface SelectOption {
  id: string;
  label: string;
  value: string;
}

export interface PostData {
  name: string;
  email: string;
  category: string;
  enabled: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Dados fictícios para o select
const mockSelectOptions: SelectOption[] = [
  { id: '1', label: 'Opção 1', value: 'option1' },
  { id: '2', label: 'Opção 2', value: 'option2' },
  { id: '3', label: 'Opção 3', value: 'option3' },
  { id: '4', label: 'Opção 4', value: 'option4' },
  { id: '5', label: 'Opção 5', value: 'option5' },
];

export const useMockApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

  // Simula um GET para buscar opções do select
  const fetchSelectOptions = useCallback(async (): Promise<SelectOption[]> => {
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
  const postData = useCallback(async (data: PostData): Promise<ApiResponse> => {
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
            id: Math.random().toString(36).substr(2, 9),
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