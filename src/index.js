import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import ASR from "./pages/ASR/ASR";
import XLIT from "./pages/XLIT/XLIT";

const rootElement = document.getElementById("root");
rootElement.style.minHeight = "100%";
rootElement.style.height = "auto";
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="asr" element={<ASR />} />
        <Route path="xlit" element={<XLIT />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
