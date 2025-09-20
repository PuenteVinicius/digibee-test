import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMockApi, MOCK_OPTIONS, SERVER_OPTIONS, MockOption } from './useMockApi'; // ajuste o caminho

// Mock do setTimeout e Math.random para controle dos testes
vi.useFakeTimers();
const mockMathRandom = vi.spyOn(Math, 'random');

describe('useMockApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMathRandom.mockReturnValue(0.5); // Valor padrão para sucesso
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useMockApi());
    
    expect(result.current.loading).toBe(true); // Por causa do useEffect
    expect(result.current.error).toBeNull();
    expect(result.current.mockOptions).toEqual([]);
    expect(typeof result.current.fetchMockOptions).toBe('function');
    expect(typeof result.current.postData).toBe('function');
    expect(typeof result.current.refetchOptions).toBe('function');
  });

  describe('fetchMockOptions', () => {
    it('should fetch options successfully', async () => {
      mockMathRandom.mockReturnValue(0.9); // 90% de chance de sucesso
      
      const { result } = renderHook(() => useMockApi());
      
      // Aguardar o useEffect inicial
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
    });

    it('should handle fetch error', async () => {
      mockMathRandom.mockReturnValue(0.05); // 10% de chance de erro
      
      const { result } = renderHook(() => useMockApi());
      
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Falha ao carregar opções');
      expect(result.current.mockOptions).toEqual([]);
    });

    it('should set loading state during fetch', async () => {
      const { result } = renderHook(() => useMockApi());
      
      // Estado inicial após useEffect
      expect(result.current.loading).toBe(true);
      
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.loading).toBe(false);
    });

    it('should be callable manually and return options', async () => {
      mockMathRandom.mockReturnValue(0.9);
      
      const { result } = renderHook(() => useMockApi());
      
      let fetchResult: MockOption[] = [];
      await act(async () => {
        fetchResult = await result.current.fetchMockOptions();
        vi.advanceTimersByTime(1000);
      });
      
      expect(fetchResult).toEqual(MOCK_OPTIONS);
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
    });
  });

  describe('postData', () => {
    const testData: MockOption = {
      id: '5',
      label: 'Test Option',
      svgPath: 'TEST'
    };

    it('should post data successfully', async () => {
      mockMathRandom.mockReturnValue(0.9); // 80% de chance de sucesso
      
      const { result } = renderHook(() => useMockApi());
      
      let postResult;
      await act(async () => {
        postResult = await result.current.postData(testData);
        vi.advanceTimersByTime(1500);
      });
      
      expect(postResult).toEqual({
        success: true,
        message: 'Dados enviados com sucesso!',
        data: {
          ...testData,
          serverOptions: SERVER_OPTIONS,
          createdAt: expect.any(String)
        }
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle post error', async () => {
      mockMathRandom.mockReturnValue(0.15); // 20% de chance de erro
      
      const { result } = renderHook(() => useMockApi());
      
      let postResult;
      await act(async () => {
        postResult = await result.current.postData(testData);
        vi.advanceTimersByTime(1500);
      });
      
      expect(postResult).toEqual({
        success: false,
        message: 'Falha no envio dos dados'
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Falha no envio dos dados');
    });

    it('should set loading state during post', async () => {
      const { result } = renderHook(() => useMockApi());
      
      // Primeiro completa o fetch inicial
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.loading).toBe(false);
      
      await act(async () => {
        const postPromise = result.current.postData(testData);
        expect(result.current.loading).toBe(true);
        vi.advanceTimersByTime(1500);
        await postPromise;
      });
      
      expect(result.current.loading).toBe(false);
    });
  });

  describe('refetchOptions', () => {
    it('should refetch options when called', async () => {
      mockMathRandom.mockReturnValue(0.9);
      
      const { result } = renderHook(() => useMockApi());
      
      // Primeiro fetch pelo useEffect
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      // Mock para retornar dados diferentes no refetch
      const newOptions = [...MOCK_OPTIONS, { id: '5', label: 'New Option' }];
      vi.spyOn(Math, 'random').mockReturnValue(0.9);
      
      await act(async () => {
        await result.current.refetchOptions();
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
    });

    it('should handle errors during refetch', async () => {
      mockMathRandom.mockReturnValue(0.05); // Erro no refetch
      
      const { result } = renderHook(() => useMockApi());
      
      // Primeiro fetch com sucesso
      mockMathRandom.mockReturnValue(0.9);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.error).toBeNull();
      
      // Refetch com erro
      mockMathRandom.mockReturnValue(0.05);
      await act(async () => {
        await result.current.refetchOptions();
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.error).toBe('Falha ao carregar opções');
    });
  });

  describe('error handling', () => {
    it('should handle unknown errors', async () => {
      // Mock para simular um erro desconhecido
      mockMathRandom.mockImplementation(() => {
        throw 'Unknown error';
      });
      
      const { result } = renderHook(() => useMockApi());
      
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.error).toBe('Erro desconhecido');
    });

    it('should reset error on successful subsequent call', async () => {
      // Primeiro com erro
      mockMathRandom.mockReturnValue(0.05);
      const { result } = renderHook(() => useMockApi());
      
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.error).toBe('Falha ao carregar opções');
      
      // Depois com sucesso
      mockMathRandom.mockReturnValue(0.9);
      await act(async () => {
        await result.current.refetchOptions();
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current.error).toBeNull();
    });
  });
});