import { useState } from "react";
import { Button } from "@heroui/button";
import TestCaseDrawer from "./features/test-case-hub/TestCaseDrawer";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div className="w-full h-screen flex items-center justify-center">
        <Button
          color="primary"
          variant="bordered"
          onPress={() => setIsDrawerOpen(true)}
        >
          Open drawer
        </Button>
      </div>
      <TestCaseDrawer
        isOpen={isDrawerOpen}
        onCloseDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default App;
