const models = {
  asr: {
    title: "Indic Speech-to-Text",
    about: `IndicTinyASR is a conformer based ASR model containing only 30M parameters, to support real-time ASR systems for Indian languages. The model is trained on KathBath, Shrutilipi and MUCS datasets. The model can be deployed on an android device and can be accessed via websockets. It supports both streaming and non-streaming mode.`,
    link: "",
  },
  xlit: {
    title: "Indic Transliterate",
    about: `IndicXlit is a transformer-based multilingual transliteration model (~11M) for Roman to native script conversion and vice-versa that supports 21 Indic languages. It is trained on the Aksharantar dataset which is the largest publicly available parallel corpus containing 26 million word pairs spanning 20 Indic languages.`,
    link: "https://ai4bharat.org/transliteration",
  },
};

export { models };
