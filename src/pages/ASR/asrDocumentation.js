import { streamingURL, asrAPIURL } from "../../config/config.js";

const asrStreamingDocumentation = {
  method: "GET (WebSocket)",
  url: streamingURL,
  steps: {
    1: {
      step: "Install the Open Speech Streaming Client Library.",
      snippet:
        "npm install https://github.com/AI4Bharat/speech-recognition-open-api-client.git#ai4bharat",
    },
    2: {
      step: "Import the Streaming Client and SocketStatus components.",
      snippet: `import {
        StreamingClient,
        SocketStatus,
      } from "@project-sunbird/open-speech-streaming-client";`,
    },
    3: {
      step: "Set the streaming url to point to the streaming server.",
      snippet: `streaming_url = "${streamingURL}"`,
    },
    4: {
      step: "Set the language code, sampling rate and the post processors parameters.",
    },
    5: {
      step: `The language_code will be the ISO-639 codes of the respective languages supported by the server, for instance ‘hi’ for Hindi. For models supporting code-mixed input, such as Hindi and English, the lang-code will be written as ‘hi-en’.`,
      snippet: `language_code = "hi"`,
    },
    6: {
      step: "The sampling_rate can be set to 48000, 16000 and 8000.",
      snippet: "sampling_rate = 48000",
    },
    7: {
      step: `For the post_processors the default value can be left as
      “null” if no post-processing of the ASR transcript is
      required. If the inference is to be run in number mode when it
      is guaranteed that the user always speaks only numbers, set
      the post_processors as [ 'numbers_only' ]. If punctuation is
      to be run after ASR, set the post_processors as [
      'punctuations' ]. Also, multiple post_processors can be set in
      the array. For example, to perform inverse text normalization
      (ITN) followed by adding punctuations: [ 'itn', 'punctuations'
      ]. The usage of these post-processors is subject to the
      respective model for the language supporting them.`,
      snippet: `post_processors = ["numbers_only"] # Can be set to [] for no processors`,
    },
    8: {
      step: `Using these parameters, we can connect to the streaming
      client as shown below:`,
      snippet: `client.connect(streaming_url, language_code, sampling_rate, post_processors, function (action, id) {
        if (action === SocketStatus.CONNECTED) {
            // Once connection is successful, start streaming
            client.startStreaming(function (transcript) {
                // transcript will give you the text which can be used further
                console.log('transcript:', transcript);
            }, (e) => {
                console.log("Encountered error", e);
            })
        } else if (action === SocketStatus.TERMINATED) {
            // Socket is closed and text post-processing can be done after it.
        } else {
            //unexpected failures action on connect.
            console.log("Action", action, id);
        }
    })`,
    },
    9: {
      step: "The client.startStreaming callback returns the inferred transcript.",
    },
  },
};

const asrAPIDocumentation = {
  method: "POST (API Request)",
  url: asrAPIURL,
  steps: {
    1: {
      step: "Set the API Endpoint.",
      snippet: `api_url = "${asrAPIURL}"`,
    },
    2: {
      step: "Set the headers to accept JSON payload.",
      snippet: `var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");`,
    },
    3: {
      step: "Set the language code, sampling rate and the post processors parameters.",
    },
    4: {
      step: `The language_code will be the ISO-639 codes of the respective languages supported by the server, for instance ‘hi’ for Hindi. For models supporting code-mixed input, such as Hindi and English, the lang-code will be written as ‘hi-en’.`,
      snippet: `language_code = "hi"`,
    },
    5: {
      step: "The sampling_rate can be set to 48000, 16000 and 8000.",
      snippet: "sampling_rate = 48000",
    },
    6: {
      step: `For the post_processors the default value can be left as
      “null” if no post-processing of the ASR transcript is
      required. If the inference is to be run in number mode when it
      is guaranteed that the user always speaks only numbers, set
      the post_processors as [ 'numbers_only' ]. If punctuation is
      to be run after ASR, set the post_processors as [
      'punctuations' ]. Also, multiple post_processors can be set in
      the array. For example, to perform inverse text normalization
      (ITN) followed by adding punctuations: [ 'itn', 'punctuations'
      ]. The usage of these post-processors is subject to the
      respective model for the language supporting them.`,
      snippet: `post_processors = ["numbers_only"] # Can be set to [] for no processors`,
    },
    7: {
      step: `Set the payload config with the above parameters and
      audioFormat to accept wav type.`,
      snippet: {
        config: {
          language: {
            sourceLanguage: "#language_code",
          },
          transcriptionFormat: {
            value: "transcript",
          },
          audioFormat: "wav",
          samplingRate: "#sampling_rate",
          postProcessors: "#post_processors",
        },
        audio: [
          {
            audioContent: "#BASE64 String",
          },
        ],
      },
    },
    8: {
      step: "Set the request options for the API call using the above payload,headers and set method to POST.",
      snippet: `var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: payload,
        redirect: 'follow'
      };`,
    },
    9: {
      step: `Make the API call using the above API url and
      requestOptions.`,
      snippet: `fetch("https://asr-api.ai4bharat.org/asr/v1/recognize/hi", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));`,
    },
    10: {
      step: `If the API call was successful, then we will get the below
      output. If the post_processors had the numbers_only option,
      then we would get a numeric output.`,
      snippet: {
        status: "SUCCESS",
        output: [
          {
            source:
              "एक दो तीन चार पांच   // 12345 for numbers_only processor mode.",
          },
        ],
      },
    },
  },
};

export { asrStreamingDocumentation, asrAPIDocumentation };
