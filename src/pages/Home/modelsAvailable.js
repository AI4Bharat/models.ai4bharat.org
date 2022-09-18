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
  nmt: {
    title: "Indic Translation",
    about: `A multilingual single-script transformer based model for translating between English and Indian languages. This model is trained using the Samanantar corpus and at the time of its release was the state of the art open source model as evaluated on Facebook's FLORES benchmark.`,
    link: "https://ai4bharat.org/indic-trans",
  },
  nlg: {
    title: "Indic Natural Language Generation",
    about:
      "IndicBART is a multilingual, sequence-to-sequence pre-trained model focusing on Indic languages and English. It currently supports 11 Indian languages and is based on the mBART architecture. You can use IndicBART model to build natural language generation applications for Indian languages by finetuning the model with supervised training data for tasks like machine translation, summarization, question generation, etc.",
    link: "https://ai4bharat.org/language-generation",
  },
};

export { models };
