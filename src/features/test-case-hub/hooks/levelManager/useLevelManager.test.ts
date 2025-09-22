import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLevelManager from './useLevelManager';
import { CreateLevels } from './types';

describe('useLevelManager Hook', () => {
  const initialLevel = CreateLevels.MAIN;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct initial level', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    expect(result.current.currentLevel).toBe(initialLevel);
    expect(result.current.history).toEqual([initialLevel]);
    expect(result.current.canGoBack).toBe(false);
  });

  it('should navigate to a new level and update history', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    expect(result.current.currentLevel).toBe(CreateLevels.MOCK_CONFIGURATION);
    expect(result.current.history).toEqual([
      initialLevel,
      CreateLevels.MOCK_CONFIGURATION
    ]);
    expect(result.current.canGoBack).toBe(true);
  });

  it('should navigate to multiple levels and maintain history', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    act(() => {

    expect(result.current.history).toEqual([
      initialLevel,
      CreateLevels.MOCK_CONFIGURATION,
    ]);
    expect(result.current.canGoBack).toBe(true);
  });

  it('should go back to previous level', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(initialLevel);
    expect(result.current.history).toEqual([initialLevel]);
    expect(result.current.canGoBack).toBe(false);
  });

  it('should go back multiple levels correctly', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(CreateLevels.MOCK_CONFIGURATION);
    expect(result.current.history).toEqual([
      initialLevel,
      CreateLevels.MOCK_CONFIGURATION
    ]);

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(initialLevel);
    expect(result.current.history).toEqual([initialLevel]);
    expect(result.current.canGoBack).toBe(false);
  });

  it('should not go back when history has only one level', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    const initialHistory = [...result.current.history];

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(initialLevel);
    expect(result.current.history).toEqual(initialHistory);
    expect(result.current.canGoBack).toBe(false);
  });

  it('should handle multiple navigate and goBack operations', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    // Navigate to level 2
    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });
    // Go back to level 2
    act(() => {
      result.current.goBack();
    });
    expect(result.current.currentLevel).toBe(CreateLevels.MOCK_CONFIGURATION);


    // Go back to level 2 (history should be truncated)
    act(() => {
      result.current.goBack();
    });
    expect(result.current.currentLevel).toBe(CreateLevels.MOCK_CONFIGURATION);

    expect(result.current.history).toEqual([
      initialLevel,
      CreateLevels.MOCK_CONFIGURATION
    ]);
  });

  it('should use different initial level when provided', () => {
    const differentInitialLevel = CreateLevels.MOCK_CONFIGURATION;
    const { result } = renderHook(() => 
      useLevelManager({ initialLevel: differentInitialLevel })
    );

    expect(result.current.currentLevel).toBe(differentInitialLevel);
    expect(result.current.history).toEqual([differentInitialLevel]);
  });

  it('should maintain canGoBack state correctly', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    expect(result.current.canGoBack).toBe(false);

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    expect(result.current.canGoBack).toBe(true);

    act(() => {
      result.current.goBack();
    });

    expect(result.current.canGoBack).toBe(false);
  });

  it('should handle rapid consecutive navigations', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    expect(result.current.history).toEqual([
      initialLevel,
      CreateLevels.MOCK_CONFIGURATION,
    ]);
    expect(result.current.canGoBack).toBe(true);
  });

  it('should handle rapid consecutive goBack operations', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    act(() => {
      result.current.goBack();
      result.current.goBack();
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(initialLevel);
    expect(result.current.history).toEqual([initialLevel]);
    expect(result.current.canGoBack).toBe(false);
  });

  it('should not mutate history array directly', () => {
    const { result } = renderHook(() => useLevelManager({ initialLevel }));

    const initialHistory = result.current.history;

    act(() => {
      result.current.navigateTo(CreateLevels.MOCK_CONFIGURATION);
    });

    expect(result.current.history).not.toBe(initialHistory);
    expect(initialHistory).toEqual([initialLevel]);
  });

  it('should handle undefined initial level by using default', () => {
    // @ts-ignore - Testing undefined case
    const { result } = renderHook(() => useLevelManager({}));

    expect(result.current.currentLevel).toBe(CreateLevels.MAIN);
    expect(result.current.history).toEqual([CreateLevels.MAIN]);
  });
})});