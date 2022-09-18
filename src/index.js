import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import ASR from "./pages/ASR/ASR";
import XLit from "./pages/XLit/XLit";
import Home from "./pages/Home/Home";
import NLG from "./pages/NLG/NLG";
import NMT from "./pages/NMT/NMT";

const rootElement = document.getElementById("root");
rootElement.style.minHeight = "100%";
rootElement.style.height = "auto";
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="asr" element={<ASR />} />
        <Route path="xlit" element={<XLit />} />
        <Route path="nlg" element={<NLG />} />
        <Route path="nmt" element={<NMT />} />
      </Route>
    </Routes>
  </HashRouter>
);
