const models = {
  asr: {
    title: "Indic Speech-to-Text",
    about: `IndicWav2Vec is a multilingual speech model pretrained on 40 Indian langauges. This model represents the largest diversity of Indian languages in the pool of multilingual speech models. We fine-tune this model for downstream ASR for 9 languages and obtain state-of-the-art results on 3 public benchmarks, namely MUCS, MSR and OpenSLR. 
    As part of IndicWav2Vec we create largest publicly available corpora for 40 languages from 4 different language families. We also trained state-of-the-art ASR models for 9 Indian languages.`,
    link: "https://ai4bharat.iitm.ac.in/indicwav2vec",
  },
  xlit: {
    title: "Indic Transliterate",
    about: `IndicXlit is a transformer-based multilingual transliteration model (~11M) for Roman to native script conversion and vice-versa that supports 21 Indic languages. It is trained on the Aksharantar dataset which is the largest publicly available parallel corpus containing 26 million word pairs spanning 20 Indic languages.`,
    link: "https://ai4bharat.org/transliteration",
  },
};

export { models };
