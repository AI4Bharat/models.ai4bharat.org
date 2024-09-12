const models = {
  asrconf: {
    path: "asr/conformer",
    title: "Indic Speech-to-Text Conformer",
    about: `IndicConformer is a conformer based ASR model containing only 30M parameters, to support real-time ASR systems for Indian languages. The model is trained on ULCA, KathBath, Shrutilipi and MUCS datasets. The model can be deployed on an android device and can be accessed via websockets.`,
    link: "",
  },
  asrwhisp: {
    path: "asr/whisper",
    title: "Indic Speech-to-Text Whisper",
    about: `ASR model trained using Whisper architecture`,
    link: "",
  },
  xlit: {
    path: "xlit",
    title: "Indic Transliterate",
    about: `IndicXlit is a transformer-based multilingual transliteration model (~11M) for Roman to native script conversion and vice-versa that supports 21 Indic languages. It is trained on the Aksharantar dataset which is the largest publicly available parallel corpus containing 26 million word pairs spanning 20 Indic languages.`,
    link: "https://ai4bharat.org/transliteration",
  },
  // nmt: {
  //   path: "nmt",
  //   title: "Indic Translation v1",
  //   about: `Translation model trained using Transformers v1`,
  //   link: "https://ai4bharat.org/indic-trans",
  // },
  nmtv2: {
    path: "nmt/v2",
    title: "Indic Translation v2",
    about: `IndicTrans2 is the first open-source transformer-based multilingual NMT model that supports high-quality translations across all the 22 scheduled Indic languages — including multiple scripts for low-resouce languages like Kashmiri, Manipuri and Sindhi. It adopts script unification wherever feasible to leverage transfer learning by lexical sharing between languages. Overall, the model supports five scripts Perso-Arabic (Kashmiri, Sindhi, Urdu), Ol Chiki (Santali), Meitei (Manipuri), Latin (English), and Devanagari (used for all the remaining languages).`,
    link: "https://ai4bharat.org/indic-trans",
  },
  // nlg: {
  //   path: "nlg",
  //   title: "Indic Natural Language Generation",
  //   about:
  //     "IndicBART is a multilingual, sequence-to-sequence pre-trained model focusing on Indic languages and English. It currently supports 11 Indian languages and is based on the mBART architecture. You can use IndicBART model to build natural language generation applications for Indian languages by finetuning the model with supervised training data for tasks like machine translation, summarization, question generation, etc.",
  //   link: "https://ai4bharat.org/language-generation",
  // },
  tts: {
    path: "tts",
    title: "Indic Text-to-Speech",
    about:
      "Indic-TTS is an on-going research focusing on building multispeaker text-to-speech models for Indic languages. TTS involves two different models - an acoustic model, which is responsible for generating waveform for a given text; and a vocoder model, which is responsible for synthesizing voice from the generated waveform. Currently, we use FastPitch and HiFi-GAN models.",
    link: "",
  },
  bert: {
    path: "",
    title: "Indic BERT",
    about:
      "IndicBERT is a multilingual ALBERT model trained on large-scale corpora, covering 12 major Indian languages: Assamese, Bengali, English, Gujarati, Hindi, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu. IndicBERT has much less parameters than other public models like mBERT and XLM-R while it still manages to give state of the art performance on several tasks.",
    link: "https://ai4bharat.iitm.ac.in/indicbert/",
  },
  ner: {
    path: "ner",
    title: "Indic Named Entity Recognition",
    about:
      "IndicNER is a model trained to complete the task of identifying named entities from sentences in Indian languages. Our model is specifically fine-tuned to the 11 Indian languages mentioned above over millions of sentences. The model is then benchmarked over a human annotated testset and multiple other publicly available Indian NER datasets. The 11 languages covered by IndicNER are: Assamese, Bengali, Gujarati, Hindi, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu.",
    link: "https://huggingface.co/ai4bharat/IndicNER",
  },
  sts: {
    path: "sts",
    title: "Indic Speech2Speech (Experimental)",
    about:
      "Indic Speech2Speech interface combines the power of ASR, NMT and TTS to convert speech from one language to speech in another language.",
    link: "",
  },
};

export { models };
