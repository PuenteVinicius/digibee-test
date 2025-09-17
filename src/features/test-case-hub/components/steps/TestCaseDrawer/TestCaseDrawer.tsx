import React from "react";

interface TestCaseHubProps {
  onNavigateToMockConfig: () => void;
}

const mockOptions = [
  {
    id: "1",
    name: "Configuração de Mocks",
    description: "Configure os mocks para o teste",
  },
  {
    id: "2",
    name: "Configuração de Assertions",
    description: "Defina as assertions do teste",
  },
  {
    id: "3",
    name: "Configuração de Dados",
    description: "Prepare os dados de teste",
  },
];

export const TestCaseHub: React.FC<TestCaseHubProps> = ({
  onNavigateToMockConfig,
}) => {
  return (
    <div className="test-case-hub">
      <h1>Configuração do Test Case</h1>
      <div className="hub-options">
        {mockOptions.map((option) => (
          <div
            key={option.id}
            className="hub-option"
            onClick={option.id === "1" ? onNavigateToMockConfig : undefined}
          >
            <h3>{option.name}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
