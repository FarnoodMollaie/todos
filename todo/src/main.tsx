import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Wrapper from "./components/wrapper/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </StrictMode>,
);
