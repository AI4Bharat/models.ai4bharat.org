const nlgDocumentation = {
  method: "POST (API Request)",
  url: "https://hf.space/embed/ai4bharat/IndicNLG/+/api/predict",
  steps: {
    1: {
      step: "Set the endpoint URL.",
      snippet: `endpoint_url = "https://hf.space/embed/ai4bharat/IndicNLG/+/api/predict"`,
    },
    2: {
      step: "Set the payload for the request with your input, task and language choice.",
      snippet: JSON.stringify(
        {
          data: [
            "7 फरवरी, 2016 [SEP] खेल 7 फरवरी, 2016 को कैलिफोर्निया के सांता क्लारा में सैन फ्रांसिस्को खाड़ी क्षेत्र में लेवी स्टेडियम में खेला गया था।",
            "IndicQuestionGeneration",
            "Hindi",
          ],
        },
        null,
        2
      ),
    },
    3: {
      step: "Call the fetch request to the API with your payload. (Example below).",
      snippet: `fetch('https://hf.space/embed/ai4bharat/IndicNLG/+/api/predict', 
  { method: "POST",body: JSON.stringify(<PAYLOAD_HERE>),
  headers: { "Content-Type": "application/json" } }).then(function(response) {
  return response.json(); }).then(function(json_response){
  console.log(json_response) })`,
    },
    4: {
      step: "The response will be in the below format.",
      snippet: JSON.stringify(
        {
          data: ["खेल कब खेला गया?"],
          durations: [0.36989378929138184],
        },
        null,
        2
      ),
    },
  },
};

export { nlgDocumentation };
