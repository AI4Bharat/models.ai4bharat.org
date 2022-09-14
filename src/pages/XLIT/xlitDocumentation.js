const xlitDocumentation = {
  1: {
    step: "Install Indic-Transliterate library",
    snippet: "npm install --save @ai4bharat/indic-transliterate",
  },
  2: {
    step: "Import the IndicTransliterate component from the library.",
    snippet: `import { IndicTransliterate } from "@ai4bharat/indic-transliterate";`,
  },
  3: {
    step: "Before rendering the component, initialize the state for the transliterated text.",
    snippet: `const [text, setText] = useState("");`,
  },
  4: {
    step: `Set the language_code. The language_code will be the ISO-639 codes of the respective languages supported by the server, for instance ‘hi’ for Hindi.`,
    snippet: `const language_code = "hi"`,
  },
  5: {
    step: "Use the IndicTransliterate component in your react application as shown below.",
    snippet: ` <IndicTransliterate
    value={text}
    onChangeText={(text) => {
      setText(text);
    }}
    lang=language_code
  />`,
  },
};

export { xlitDocumentation };
