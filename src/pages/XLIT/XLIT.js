import React, { useState } from "react";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Button, Tooltip, Select, MenuItem } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import Documentation from "../../components/A4BDocumentation/Documentation";
import { xlitDocumentation } from "./xlitDocumentation";

const languages = {
  hi: "Hindi - हिंदी",
  mr: "Marathi - मराठी",
  as: "Assamese - অসমীয়া",
  bn: "Bangla - বাংলা",
  brx: "Boro - बड़ो",
  gu: "Gujarati - ગુજરાતી",
  kn: "	Kannada - ಕನ್ನಡ",
  ks: "Kashmiri - كٲشُر",
  gom: "Konkani Goan - कोंकणी",
  mai: "Maithili - मैथिली",
  ml: "Malayalam - മലയാളം",
  mni: "Manipuri",
  ne: "Nepali - नेपाली",
  or: "Odia - ଓଡ଼ିଆ",
  pa: "Punjabi - ਪੰਜਾਬੀ",
  sa: "Sanskrit - संस्कृतम्",
  sd: "Sindhi - سنڌي",
  si: "Sinhala - සිංහල",
  ta: "Tamil - தமிழ்",
  te: "Telugu - తెలుగు",
  ur: "Urdu - اُردُو",
};

const XLit = () => {
  const [languageChoice, setLanguageChoice] = useState(
    localStorage.getItem("tltLanguageChoice") || "hi"
  );
  const [transliteratedText, setTransliteratedText] = useState("");
  const [showDocumentation, setShowDocumentation] = useState(false);

  const sortedLanguages = Object.fromEntries(Object.entries(languages).sort());

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguageChoice(selectedLanguage);
    localStorage.setItem("tltLanguageChoice", selectedLanguage);
  };

  const handleCopyToClipboard = () => {
    if (transliteratedText) {
      navigator.clipboard.writeText(transliteratedText);
    }
  };

  const toggleDocumentation = () => {
    setShowDocumentation(!showDocumentation);
  };

  return (
    <div>
      <section className="title-section">
        <h1 className="title">
          <img
            className="a4b-logo"
            alt="a4blogo"
            width={80}
            height={80}
            src={require("../../media/ai4bharatlogo.png")}
          />
          <span className="orange-color">AI4Bharat </span>
          Indic Transliteration (XLit)
        </h1>
        <p className="subtitle">
          Transliterate in real-time across various Indian Languages!
        </p>
      </section>

      <div className="common-options">
        <label className="a4b-option">
          Language:
          <Select
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                style: {
                  maxHeight: "350px",
                  borderRadius: "8px",
                  width: "200px",
                  padding: "3px",
                  // Set the width of the dropdown
                  right: "-9px",
                  border: "1px solid #ccc",
                },
              },
            }}
            value={languageChoice}
            onChange={handleLanguageChange}
            sx={{
              borderRadius: "8px",

              width: "260px",
            }}
            className="a4b-option-select"
          >
            {Object.entries(sortedLanguages).map(([language, optionText]) => (
              <MenuItem
                key={language}
                sx={{
                  margin: 1,
                  minHeight: "auto",
                  border: "2px solid #d7d7d7",
                  borderRadius: "9px",
                }}
                value={language}
              >
                {optionText}
              </MenuItem>
            ))}
          </Select>
        </label>
      </div>

      <div className="a4b-interface">
        <div className="a4b-output">
          <Button
            sx={{
              width: 10,
              height: 50,
              color: "#4a4a4a",
              borderColor: "#4a4a4a",
              marginRight: 1,
            }}
            size="large"
            variant="outlined"
            onClick={handleCopyToClipboard}
          >
            <FaRegCopy size={"20px"} />
          </Button>

          <div className="a4b-transliterate-container">
            <Tooltip
              placement="top-start"
              title={
                "You can choose your suggestion using Arrow Keys or Scroll using the mouse and then either use Space or Click on the word suggestion to apply that word."
              }
            >
              <IndicTransliterate
                className="a4b-transliterate-text"
                renderComponent={(props) => (
                  <textarea
                    {...props}
                    style={{ height: "400px", width: "90%" }}
                  />
                )}
                value={transliteratedText}
                placeholder="Type your text here to transliterate...."
                onChangeText={(text) => {
                  setTransliteratedText(text);
                }}
                lang={languageChoice}
              />
            </Tooltip>
          </div>
        </div>

        <Documentation
          documentation={xlitDocumentation}
          toggleDocumentation={toggleDocumentation}
          showDocumentation={showDocumentation}
        />
      </div>
    </div>
  );
};

export default XLit;
