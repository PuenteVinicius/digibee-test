import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <ToastProvider />
    <App />
  </HeroUIProvider>
);
