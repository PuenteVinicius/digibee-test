import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useLevelManager from "./useLevelManager";

// Enum de exemplo (caso não esteja definido no seu arquivo)
enum CreateLevels {
  MAIN = "MAIN",
  STEP_1 = "STEP_1",
  STEP_2 = "STEP_2",
  STEP_3 = "STEP_3",
  CONFIRMATION = "CONFIRMATION",
}

describe("useLevelManager", () => {
  const defaultProps = {
    initialLevel: CreateLevels.MAIN,
  };

  const renderHookWithProps = (
    props: Partial<{ initialLevel: CreateLevels }> = {},
  ) => {
    return renderHook(() => useLevelManager({ ...defaultProps, ...props }));
  };

  it("should initialize with correct default values", () => {
    const { result } = renderHookWithProps();

    expect(result.current.currentLevel).toBe(CreateLevels.MAIN);
    expect(result.current.history).toEqual([CreateLevels.MAIN]);
    expect(result.current.canGoBack).toBe(false);
    expect(typeof result.current.navigateTo).toBe("function");
    expect(typeof result.current.goBack).toBe("function");
  });

  it("should accept custom initial level", () => {
    const { result } = renderHookWithProps({
      initialLevel: CreateLevels.STEP_1,
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_1);
    expect(result.current.history).toEqual([CreateLevels.STEP_1]);
    expect(result.current.canGoBack).toBe(false);
  });

  it("should navigate to a new level and update history", () => {
    const { result } = renderHookWithProps();

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_1);
    expect(result.current.history).toEqual([
      CreateLevels.MAIN,
      CreateLevels.STEP_1,
    ]);
    expect(result.current.canGoBack).toBe(true);
  });

  it("should handle multiple navigations correctly", () => {
    const { result } = renderHookWithProps();

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_2);
    });

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_3);
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_3);
    expect(result.current.history).toEqual([
      CreateLevels.MAIN,
      CreateLevels.STEP_1,
      CreateLevels.STEP_2,
      CreateLevels.STEP_3,
    ]);
    expect(result.current.canGoBack).toBe(true);
  });

  it("should go back to previous level", () => {
    const { result } = renderHookWithProps();

    // Navegar para alguns níveis
    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_2);
    });

    // Voltar um nível
    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_1);
    expect(result.current.history).toEqual([
      CreateLevels.MAIN,
      CreateLevels.STEP_1,
    ]);
    expect(result.current.canGoBack).toBe(true);
  });

  it("should handle multiple goBack calls", () => {
    const { result } = renderHookWithProps();

    // Navegar para vários níveis
    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_2);
    });

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_3);
    });

    // Voltar múltiplas vezes
    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_2);

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_1);

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(CreateLevels.MAIN);
    expect(result.current.history).toEqual([CreateLevels.MAIN]);
    expect(result.current.canGoBack).toBe(false);
  });

  it("should not go back when history has only one level", () => {
    const { result } = renderHookWithProps();

    // Tentar voltar do nível inicial
    act(() => {
      result.current.goBack();
    });

    // Nada deve mudar
    expect(result.current.currentLevel).toBe(CreateLevels.MAIN);
    expect(result.current.history).toEqual([CreateLevels.MAIN]);
    expect(result.current.canGoBack).toBe(false);
  });

  it("should not allow going back beyond initial level", () => {
    const { result } = renderHookWithProps();

    // Navegar e voltar
    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    act(() => {
      result.current.goBack();
    });

    // Tentar voltar novamente (não deve fazer nada)
    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentLevel).toBe(CreateLevels.MAIN);
    expect(result.current.history).toEqual([CreateLevels.MAIN]);
    expect(result.current.canGoBack).toBe(false);
  });

  it("should update canGoBack correctly", () => {
    const { result } = renderHookWithProps();

    // Inicialmente não pode voltar
    expect(result.current.canGoBack).toBe(false);

    // Navegar - agora pode voltar
    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    expect(result.current.canGoBack).toBe(true);

    // Voltar - não pode mais voltar
    act(() => {
      result.current.goBack();
    });

    expect(result.current.canGoBack).toBe(false);
  });

  it("should handle navigation to the same level multiple times", () => {
    const { result } = renderHookWithProps();

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1); // Mesmo nível
    });

    expect(result.current.currentLevel).toBe(CreateLevels.STEP_1);
    expect(result.current.history).toEqual([
      CreateLevels.MAIN,
      CreateLevels.STEP_1,
      CreateLevels.STEP_1, // Duplicado no histórico
    ]);
  });

  it("should be memoized correctly (functions should not change)", () => {
    const { result, rerender } = renderHookWithProps();

    const initialNavigateTo = result.current.navigateTo;
    const initialGoBack = result.current.goBack;

    // Rerender com as mesmas props
    rerender();

    expect(result.current.navigateTo).toBe(initialNavigateTo);
    expect(result.current.goBack).toBe(initialGoBack);

    // Navegar para outro nível
    act(() => {
      result.current.navigateTo(CreateLevels.STEP_1);
    });

    // As funções ainda devem ser as mesmas (memoizadas)
    expect(result.current.navigateTo).toBe(initialNavigateTo);
    expect(result.current.goBack).toBe(initialGoBack);
  });

  describe("edge cases", () => {
    it("should handle empty history edge case", () => {
      // Teste para garantir que não quebra com histórico vazio
      // Isso não deveria acontecer, mas é bom testar
      const { result } = renderHookWithProps();

      // Simular histórico vazio (situação anômala)
      act(() => {
        // @ts-ignore - forçando situação anômala para teste
        result.current.history = [];
        result.current.goBack();
      });

      // O hook deve ser resiliente e não quebrar
      expect(result.current.currentLevel).toBe(CreateLevels.MAIN);
    });

    it("should handle navigation with undefined or invalid levels", () => {
      const { result } = renderHookWithProps();

      // @ts-ignore - testando com nível inválido
      act(() => {
        result.current.navigateTo("INVALID_LEVEL");
      });

      // Deve aceitar qualquer string como nível
      expect(result.current.currentLevel).toBe("INVALID_LEVEL");
      expect(result.current.history).toContain("INVALID_LEVEL");
    });
  });
});
