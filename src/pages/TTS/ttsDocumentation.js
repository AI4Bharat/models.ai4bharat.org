const ttsDocumentation = {
  method: "POST (API Request)",
  url: "https://tts-api.ai4bharat.org/",
  steps: {
    1: {
      step: "Set the endpoint URL to point to the TTS URL.",
      snippet: `endpoint_url = "https://tts-api.ai4bharat.org/"`,
    },
    2: {
      step: "Set the payload for the request with your input, language choice and voice gender choice.",
      snippet: JSON.stringify(
        {
          input: [
            {
              source: "एक गाव मे एक किसान रहता ता ",
            },
          ],
          config: {
            gender: "male",
            language: {
              sourceLanguage: "hi",
            },
          },
        },
        null,
        2
      ),
    },
    3: {
      step: "Set the headers to accept JSON payload.",
      snippet: `var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");`,
    },
    4: {
      step: "Set the headers to accept JSON payload.",
      snippet: `var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");`,
    },
    5: {
      step: "Set the request options for the API call using the above payload,headers and set method to POST.",
      snippet: `var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
        };`,
    },
    6: {
      step: `Make the API call using the above endpoint_url and
        requestOptions.`,
      snippet: `fetch(endpoint_url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));`,
    },
    7: {
      step: `If the API call was successful, then we will get the below
        output. If the post_processors had the numbers_only option,
        then we would get a numeric output.`,
      snippet: {
        audio: [
          {
            audioContent: "BASE64_AUDIO_CONTENT",
          },
        ],
        config: {
          language: { sourceLanguage: "hi" },
          audioFormat: "wav",
          encoding: "base64",
          samplingRate: 22050,
        },
      },
    },
  },
};

export { ttsDocumentation };
