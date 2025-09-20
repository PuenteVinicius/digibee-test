import { useState } from "react";
import { Button } from "@heroui/button";
import TestCaseDrawer from "./features/test-case-hub/TestCaseDrawer";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div className="w-full h-screen flex items-center justify-center">
        <Button
          className="max-w-[137px] text-color-primary-500 text-sm font-semibold tracking-[0.1px]"
          radius="lg"
          color="primary"
          variant="bordered"
          size="lg"
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
