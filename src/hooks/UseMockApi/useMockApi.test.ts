import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMockApi } from './useMockApi';

// Mock do setTimeout
vi.useFakeTimers();

describe('useMockApi', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMockApi());
    
    expect(result.current.loading).toBe(true); // Carrega automaticamente
    expect(result.current.error).toBeNull();
    expect(result.current.selectOptions).toEqual([]);
  });

  it('should fetch select options successfully', async () => {
    const { result } = renderHook(() => useMockApi());
    
    // Avança os timers para completar a requisição
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.selectOptions).toHaveLength(5);
    expect(result.current.selectOptions[0]).toEqual({
      id: '1',
      label: 'Opção 1',
      value: 'option1'
    });
  });

  it('should handle post data successfully', async () => {
    const { result } = renderHook(() => useMockApi());
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      category: 'option1',
      enabled: true
    };

    let response;
    await act(async () => {
      response = await result.current.postData(testData);
      vi.advanceTimersByTime(1500);
    });

    expect(response).toEqual({
      success: true,
      message: 'Dados enviados com sucesso!',
      data: expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com'
      })
    });
    expect(result.current.loading).toBe(false);
  });

  it('should handle post data failure', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1); // Força falha
    
    const { result } = renderHook(() => useMockApi());
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      category: 'option1',
      enabled: true
    };

    let response;
    await act(async () => {
      response = await result.current.postData(testData);
      vi.advanceTimersByTime(1500);
    });

    expect(response).toEqual({
      success: false,
      message: 'Falha no envio dos dados'
    });
    expect(result.current.loading).toBe(false);
  });
});