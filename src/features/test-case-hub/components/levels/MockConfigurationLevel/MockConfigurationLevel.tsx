import React, { useState } from "react";

interface MockConfigurationLevelProps {
  onClose: () => void;
}

const initialMocks: any[] = [
  { id: "1", name: "Mock API Login", type: "HTTP", enabled: true },
  { id: "2", name: "Mock Database", type: "DB", enabled: false },
  { id: "3", name: "Mock File System", type: "FS", enabled: true },
];

export const MockConfigurationLevel: React.FC<MockConfigurationLevelProps> = ({
  onClose,
}) => {
  const [mocks, setMocks] = useState<any[]>(initialMocks);

  const toggleMock = (id: string) => {
    setMocks((prev) =>
      prev.map((mock) =>
        mock.id === id ? { ...mock, enabled: !mock.enabled } : mock
      )
    );
  };

  return (
    <div className="mock-configuration">
      <h2>Configuração de Mocks</h2>
      <div className="mocks-list">
        {mocks.map((mock) => (
          <div key={mock.id} className="mock-item">
            <label>
              <input
                type="checkbox"
                checked={mock.enabled}
                onChange={() => toggleMock(mock.id)}
              />
              {mock.name} ({mock.type})
            </label>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="save-button">
        Salvar e Voltar
      </button>
    </div>
  );
};
