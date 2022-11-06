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
const ASR_STREAMING_URLS = {
  bn: "wss://asr-api.ai4bharat.org",
  en: "wss://asr-api.ai4bharat.org",
  gu: "wss://asr-api.ai4bharat.org",
  hi: "wss://ai4b-dev-asr.ulcacontrib.org",
  kn: "wss://asr-api.ai4bharat.org",
  ml: "wss://asr-api.ai4bharat.org",
  mr: "wss://ai4b-dev-asr.ulcacontrib.org",
  ne: "wss://asr-api.ai4bharat.org",
  or: "wss://asr-api.ai4bharat.org",
  pa: "wss://asr-api.ai4bharat.org",
  sa: "wss://asr-api.ai4bharat.org",
  si: "wss://asr-api.ai4bharat.org",
  ta: "wss://ai4b-dev-asr.ulcacontrib.org",
  te: "wss://ai4b-dev-asr.ulcacontrib.org",
  ur: "wss://asr-api.ai4bharat.org",
};

const ASR_REST_URLS = {
  bn: "https://asr-api.ai4bharat.org",
  en: "https://asr-api.ai4bharat.org",
  gu: "https://asr-api.ai4bharat.org",
  hi: "https://asr-api.ai4bharat.org",
  kn: "https://asr-api.ai4bharat.org",
  ml: "https://asr-api.ai4bharat.org",
  mr: "https://asr-api.ai4bharat.org",
  ne: "https://asr-api.ai4bharat.org",
  or: "https://asr-api.ai4bharat.org",
  pa: "https://asr-api.ai4bharat.org",
  sa: "https://asr-api.ai4bharat.org",
  si: "https://asr-api.ai4bharat.org",
  ta: "https://ai4b-dev-asr.ulcacontrib.org",
  te: "https://ai4b-dev-asr.ulcacontrib.org",
  ur: "https://asr-api.ai4bharat.org",
};

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

export {
  ASR_STREAMING_URLS,
  ASR_REST_URLS,
  ASR_LANGUAGE_CONFIGS,
  LANGUAGE_KEY_TEXT,
};
