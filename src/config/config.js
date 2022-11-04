// Language Key-Text Mapping

const LANGUAGE_KEY_TEXT = {
  as: "Assamese - অসমীয়া",
  bn: "Bangla - বাংলা",
  brx: "Boro - बड़ो",
  gu: "Gujarati - ગુજરાતી",
  hi: "Hindi - हिंदी",
  kn: "Kannada - ಕನ್ನಡ",
  ml: "Malayalam - മലയാളം",
  mni: "Manipuri - মিতৈলোন",
  mr: "Marathi - मराठी",
  or: "Oriya - ଓଡ଼ିଆ",
  raj: "Rajasthani - राजस्थानी",
  ta: "Tamil - தமிழ்",
  te: "Telugu - తెలుగు",
  pa: "Panjabi - ਪੰਜਾਬੀ",
  sa: "Sanskrit - संस्कृतम्",
  ur: "Urdu - اُردُو",
  en: "English - English",
  ne: "Nepali - नेपाली",
  si: "Sinhala - සිංහල",
};

// ASR Endpoints
const ASR_STREAMING_URLS =
  "wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://ai4b-dev-asr.ulcacontrib.org,wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://ai4b-dev-asr.ulcacontrib.org,wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://asr-api.ai4bharat.org,wss://ai4b-dev-asr.ulcacontrib.org,wss://ai4b-dev-asr.ulcacontrib.org,wss://asr-api.ai4bharat.org".split(
    ","
  );

//ASR Language Configs
const ASR_LANGUAGE_CONFIGS = {
  streaming: "bn,en,gu,hi,kn,ml,mr,ne,or,pa,sa,si,ta,te,ur".split(","),
  rest: "bn,en,gu,hi,kn,ml,mr,ne,or,pa,sa,si,ta,te,ur".split(","),
  processors: {
    hi: {
      numbers_only: [true, "Numbers Only"],
    },
    mr: {
      numbers_only: [true, "Numbers Only"],
    },
  },
};

export { ASR_STREAMING_URLS, ASR_LANGUAGE_CONFIGS, LANGUAGE_KEY_TEXT };
