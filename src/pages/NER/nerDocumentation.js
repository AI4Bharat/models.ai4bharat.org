const nerDocumentation = {
  method: "POST (API Request)",
  url: "https://ai4bharat-indicner.hf.space/run/predict",
  steps: {
    1: {
      step: "Set the endpoint URL.",
      snippet: `endpoint_url = "https://ai4bharat-indicner.hf.space/run/predict"`,
    },
    2: {
      step: "Set the payload for the request with your input, task and language choice.",
      snippet: JSON.stringify(
        {
          data: [
            "लगातार हमलावर हो रहे शिवपाल और राजभर को सपा की दो टूक, चिट्ठी जारी कर कहा- जहां जाना चाहें जा सकते हैं",
          ],
        },
        null,
        2
      ),
    },
    3: {
      step: "Call the fetch request to the API with your payload. (Example below).",
      snippet: `fetch(endpoint_url, 
    { method: "POST",body: JSON.stringify(<PAYLOAD_HERE>),
    headers: { "Content-Type": "application/json" } }).then(function(response) {
    return response.json(); }).then(function(json_response){
    console.log(json_response) })`,
    },
    4: {
      step: "The response will be in the below format.",
      snippet: JSON.stringify(
        {
          data: [
            [
              ["लगातार", "O"],
              ["हमलावर", "O"],
              ["हो", "O"],
              ["रहे", "O"],
              ["शिवपाल", "B-PER"],
              ["और", "O"],
              ["राजभर", "B-PER"],
              ["को", "O"],
              ["सपा", "B-ORG"],
              ["की", "O"],
              ["दो", "O"],
              ["टूक,", "O"],
              ["चिट्ठी", "O"],
              ["जारी", "O"],
              ["कर", "O"],
              ["कहा-", "O"],
              ["जहां", "O"],
              ["जाना", "O"],
              ["चाहें", "O"],
              ["जा", "O"],
              ["सकते", "O"],
              ["हैं", "O"],
            ],
          ],
          durations: [0.36989378929138184],
        },
        null,
        2
      ),
    },
  },
};

export { nerDocumentation };
