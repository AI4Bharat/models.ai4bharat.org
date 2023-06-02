const nmtDocumentation = {
  method: "POST (API Request)",
  url: "https://hf.space/embed/ai4bharat/IndicTrans-English2Indic/+/api/predict/",
  steps: {
    1: {
      step: "Set the endpoint URL according to the mode you would like.",
      snippet: `endpoint_url = "https://hf.space/embed/ai4bharat/IndicTrans-Indic2English/+/api/predict/" //for Indic2English `,
    },
    2: {
      step: "Set the payload for the request with your input and language choice.",
      snippet: JSON.stringify(
        {
          data: ["<YOUR_INPUT_HERE", "<YOUR_LANGUAGE_CHOICE>"],
        },
        null,
        2
      ),
    },
    3: {
      step: "Call the fetch request to the API with your payload. (Example below).",
      snippet: `fetch('https://hf.space/embed/ai4bharat/IndicTrans-English2Indic/+/api/predict/', 
{ method: "POST",body: JSON.stringify({"data":[ "Hello World", "Hindi"]}),
headers: { "Content-Type": "application/json" } }).then(function(response) {
return response.json(); }).then(function(json_response){
console.log(json_response) })`,
    },
    4: {
      step: "The response will be in the below format.",
      snippet: JSON.stringify(
        {
          data: ["हैलो वर्ल्ड"],
          durations: [0.36989378929138184],
          avg_durations: [7.190823856665164],
        },
        null,
        2
      ),
    },
  },
};

export { nmtDocumentation };
