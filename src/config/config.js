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
};

// ASR Endpoints
const ASR_STREAMING_URL = "https://asr-api.ai4bharat.org/";
const ASR_REST_URL = "https://asr-api.ai4bharat.org/asr/v1/recognize/";

//ASR Language Configs
const ASR_LANGUAGE_CONFIGS = {
  streaming: ["en", "gu", "ml", "kn", "pa", "sa", "ur", "or", "bn", "hi", "mr"],
  rest: ["hi", "mr"],
  processors: {
    hi: {
      numbers_only: [true, "Numbers Only"],
    },
  },
};

export {
  ASR_STREAMING_URL,
  ASR_REST_URL,
  ASR_LANGUAGE_CONFIGS,
  LANGUAGE_KEY_TEXT,
};
