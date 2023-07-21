import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import ASRConformer from "./pages/ASRCONF/ASR";
import ASRWhipserer from "./pages/ASRWHISP/ASR";
import XLit from "./pages/XLIT/XLIT";
import Home from "./pages/Home/Home";
import NLG from "./pages/NLG/NLG";
import NMT from "./pages/NMTv1/NMT";
import NMTV2 from "./pages/NMTv2/NMT";
import TTS from "./pages/TTS/TTS";
import NER from "./pages/NER/NER";
import STS from "./pages/STS/STS";
import TTSSamples from "./pages/TTS/TTSSamples";
import ASRWV from "./pages/ASRWV/ASR";

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
        <Route path="asr" element={<ASRWV />} />
        <Route path="asr/conformer" element={<ASRConformer />} />
        <Route path="asr/" element={<ASRConformer />} />
        <Route path="sts" element={<STS />} />
        <Route path="xlit" element={<XLit />} />
        <Route path="nlg" element={<NLG />} />
        <Route path="nmt" element={<Navigate to="/nmt/v2" />} />
        <Route path="nmt/v2" element={<NMTV2 />} />
        <Route path="ner" element={<NER />} />
        <Route path="tts">
          <Route path="" element={<TTS />} />
          <Route path="samples" element={<TTSSamples />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
